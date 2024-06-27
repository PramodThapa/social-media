import { JwtService } from '@nestjs/jwt';
import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { LoginDto } from '@/dto/login.dto';
import { SignupDto } from '@/dto/signup.dto';

import { UsersService } from '../users/users.service';
import { Users } from 'src/users/schemas/users.schema';
import { ConfigService } from '@nestjs/config';
import { Token } from 'src/types';
import { Response, UserResponse } from 'src/types/response';
import { RefreshTokenDto } from '@/dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Function to validate user.
   *
   * @param loginDto - Login DTO.
   */
  async validateUser(loginDto: LoginDto): Promise<Response<UserResponse>> {
    const { username, password } = loginDto;

    const user = await this.usersService.findOne(username);

    if (!user) {
      throw new UnauthorizedException('Invalid username or password.');
    }

    if (!(await this.isValidPassword(password, user.password))) {
      throw new UnauthorizedException('Invalid password.');
    }

    const token: Token = await this.getTokens(user);

    return {
      data: { token, user: { id: user._id, username: user.username } },
      status: HttpStatus.OK,
    };
  }

  /**
   * Function to create user.
   *
   * @param signupDto - Signup Dto.
   */
  async createUser(signupDto: SignupDto): Promise<Response<UserResponse>> {
    const { username, password: userInputPassword } = signupDto;

    const user = await this.usersService.create({
      username,
      password: await this.hashedPassword(userInputPassword),
    });

    const token: Token = await this.getTokens(user);

    return {
      data: { token, user: { id: user._id, username: user.username } },
      status: HttpStatus.CREATED,
    };
  }

  /**
   * Function to assign new user token to user.
   *
   * @param refreshTokenDto
   * @returns {Promise<Response<UserResponse>>}
   */
  async assignNewToken(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<Response<UserResponse>> {
    const { id } = refreshTokenDto;

    const user = await this.usersService.findById(id);

    if (!user) {
      throw new UnauthorizedException("User doesn't exist");
    }

    const token: Token = await this.getTokens(user);

    return {
      data: { token, user: { id: user._id, username: user.username } },
      status: HttpStatus.OK,
    };
  }

  /**
   * Function to check the password validity.
   *
   * @param userInputPassword - Password entered by user.
   * @param userPassword - Saved password in database.
   *
   * @returns {Promise<boolean>}
   */
  private async isValidPassword(
    userInputPassword: string,
    userPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(userInputPassword, userPassword);
  }

  /**
   * Function to hash password.
   *
   * @param {string} password Password.
   * @returns { Promise<string> }
   */
  private async hashedPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  /**
   * Gets the JWT tokens.
   *
   * @param {Users} user
   * @returns {Promise<Token>}
   */
  async getTokens(user: Users): Promise<Token> {
    const payload = { sub: user._id, username: user.username };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('ACCESS_JWT_SECRET'),
        expiresIn: this.configService.get<string | number>('ACCESS_EXPIRES_IN'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('REFRESH_JWT_SECRET'),
        expiresIn: this.configService.get<string | number>(
          'REFRESH_EXPIRES_IN',
        ),
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}

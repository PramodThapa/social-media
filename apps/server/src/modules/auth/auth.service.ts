import { JwtService } from '@nestjs/jwt';
import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { CreateUserDto } from '@/dto/user/createUser.dto';
import { LoginDto } from '@/dto';
import { ConfigService } from '@nestjs/config';
import User from '../users/entity/user.entity';
import { Token } from '@/interfaces/token';

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
  async validateUser(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;

    const user = await this.usersService.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid username or password.');
    }

    if (!(await this.isValidPassword(password, user.password))) {
      throw new UnauthorizedException('Invalid password.');
    }

    const token = await this.signTokens(user);

    return {
      data: {
        token: token,
        user: { id: user.id, email: user.email },
      },
      status: HttpStatus.OK,
    };
  }

  /**
   * Function to create user.
   *
   * @param signupDto - Signup Dto.
   */
  async createUser(userDto: CreateUserDto): Promise<any> {
    const { email, password, username } = userDto;

    const user = await this.usersService.create({
      email,
      password: await this.hashedPassword(password),
      username,
    });

    const token = await this.signTokens(user);

    return {
      data: {
        token: token,
        user: { id: user.id, userName: user.username, email: user.email },
      },
      status: HttpStatus.CREATED,
    };
  }

  async getUser(id: number | undefined): Promise<any> {
    if (!id) {
      throw new UnauthorizedException("User doesn't exist");
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = await this.usersService.findUserById(
      id.toString(),
    );

    return {
      data: { user: { ...rest } },
      status: HttpStatus.OK,
    };
  }

  /**
   * Function to assign new user token to user.
   *
   * @param refreshTokenDto
   * @returns {Promise<>}
   */
  async validateToken(refreshTokenDto: any): Promise<any> {
    const { id } = refreshTokenDto;

    const user = await this.usersService.findUserById(id);

    if (!user) {
      throw new UnauthorizedException("User doesn't exist");
    }

    const token = await this.signTokens(user);

    return {
      data: { token, user: { id: user.id, username: user.username } },
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
  private async signTokens(user: User): Promise<Token> {
    const payload = { sub: user.id, email: user.email };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get<string | number>(
          'ACCESS_TOKEN_EXPIRE_IN',
        ),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get<string | number>(
          'REFRESH_TOKEN_EXPIRE_IN',
        ),
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}

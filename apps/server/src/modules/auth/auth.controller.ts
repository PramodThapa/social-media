import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto } from '@/dto/login.dto';
import { SignupDto } from '@/dto/signup.dto';
import { Response, UserResponse } from 'src/types/response';
import { AuthGuard } from '@nestjs/passport';
import { RefreshTokenDto } from '@/dto';

@Controller('/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Endpoint to create user.
   *
   * @returns {Users}
   */
  @Post('/signup')
  async create(@Body() user: SignupDto): Promise<Response<UserResponse>> {
    return this.authService.createUser(user);
  }

  /**
   * Endpoint to create user.
   *
   * @returns {Users}
   */
  @Post('/login')
  async validate(@Body() user: LoginDto): Promise<Response<UserResponse>> {
    return this.authService.validateUser(user);
  }

  /**
   * Endpoint to for validating refresh token.
   *
   * @returns {Users}
   */
  @Post('/access-token')
  @UseGuards(AuthGuard('refresh-jwt'))
  async validateRefreshToken(
    @Body() user: RefreshTokenDto,
  ): Promise<Response<UserResponse>> {
    return this.authService.assignNewToken(user);
  }
}

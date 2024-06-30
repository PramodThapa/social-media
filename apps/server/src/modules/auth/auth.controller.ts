import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';

import { AuthService } from './auth.service';
import { JwtAuthGuard, LocalAuthGuard } from '@/guards';
import { CreateUserDto } from '@/dto/user/createUser.dto';
import { LoginDto } from '@/dto';
import { Request } from 'express';
import User from '../users/entity/user.entity';

@Controller('/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Endpoint to create user.
   *
   * @returns {Users}
   */
  @Post('/signup')
  async create(@Body() user: CreateUserDto): Promise<any> {
    return this.authService.createUser(user);
  }

  /**
   * Endpoint to create user.
   *
   * @returns {Users}
   */
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async validate(@Body() user: LoginDto): Promise<any> {
    return this.authService.validateUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async validateRefreshToken(@Req() req: Request): Promise<any> {
    const user = req?.user as User;

    return this.authService.getUser(user?.id);
  }
}

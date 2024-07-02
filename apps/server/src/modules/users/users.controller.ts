import { JwtAuthGuard } from '@/guards';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { FollowDto } from '@/dto/user/addFollow.dto';
import User from './entity/user.entity';
import { FollowStatus } from '@/interfaces/enum';
import { Blog } from '../blog/entity/blogs.entity';

@Controller('/v1/users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  /**
   * Endpoint to create user.
   *
   * @returns {Users}
   */
  @UseGuards(JwtAuthGuard)
  @Post('/follow')
  async followUser(@Body() follow: FollowDto): Promise<User> {
    return this.userService.handleFollowAction(follow);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id/follow')
  async getFriends(
    @Param('id') id: string,
    @Query('status') status: FollowStatus,
  ) {
    return this.userService.getFriends(id, status);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getProfile(@Param('id') id: string): Promise<User> {
    return this.userService.findUserById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id/blogs')
  async getUserBlogs(@Param('id') id: string): Promise<Blog[]> {
    return this.userService.getBlogsByUserId(id);
  }
}

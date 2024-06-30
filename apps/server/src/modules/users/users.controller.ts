import { JwtAuthGuard } from '@/guards';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { FollowDto } from '@/dto/user/addFollow.dto';
import { FollowStatus } from '@/interfaces/users/relation';
import User from './entity/user.entity';

@Controller('/v1/users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  /**
   * Endpoint to create user.
   *
   * @returns {Users}
   */
  // @UseGuards(JwtAuthGuard)
  @Post('/follow')
  async followUser(@Body() follow: FollowDto): Promise<User> {
    return this.userService.handleFollowAction(follow);
  }

  @Get('/:id/follow/pending')
  async getPendingFollowRequest(@Param('id') id: string): Promise<User[]> {
    return this.userService.getFollowRequests(id, FollowStatus.PENDING);
  }

  @Get('/:id/follow/accepted')
  async getAcceptedFollowRequest(@Param('id') id: string): Promise<User[]> {
    return this.userService.getFollowRequests(id, FollowStatus.ACCEPTED);
  }

  @Get('/:id/following')
  async getUserFollowings(@Param('id') id: string): Promise<User[]> {
    return this.userService.getAllFollowings(id);
  }

  @Get('/:id/all')
  async getUnFollowedUsers(@Param('id') id: string): Promise<User[]> {
    return this.userService.getAllUnFollowedUsers(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile/:id')
  async getProfile(@Param('id') id: string): Promise<User> {
    return this.userService.findUserById(id);
  }
}

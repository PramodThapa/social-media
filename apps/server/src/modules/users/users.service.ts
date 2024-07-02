import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from '@/dto/user/createUser.dto';
import User from './entity/user.entity';
import { FollowDto } from '@/dto/user/addFollow.dto';
import { FollowAction, FollowStatus, UserRelation } from '@/interfaces/enum';
import { BlogsRepository } from '../blog/blogs.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly blogRepository: BlogsRepository,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    return await this.userRepository.createUser(user);
  }

  async validateUniqueEmail(email: string): Promise<boolean> {
    const user = await this.userRepository.findByProperty('email', email);

    if (user) return false;

    return true;
  }

  async findUserById(id: string): Promise<User> {
    return await this.userRepository.findById(id);
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findByProperty('email', email);
  }

  async handleFollowAction(follow: FollowDto): Promise<any> {
    const { followerId, followeeId, action } = follow;
    switch (action) {
      case FollowAction.UPDATE:
        this.userRepository.updateRelation(
          followerId,
          followeeId,
          UserRelation.FOLLOW,
          { status: FollowStatus.ACCEPTED },
        );
        break;
      case FollowAction.CANCEL:
        this.userRepository.cancelRelation(
          followeeId,
          followerId,
          UserRelation.FOLLOW,
        );
        break;
      case FollowAction.REJECT:
        this.userRepository.rejectRelation(
          followeeId,
          followerId,
          UserRelation.FOLLOW,
        );

        break;
      default:
        await this.userRepository.addRelation(
          followeeId,
          followerId,
          UserRelation.FOLLOW,
          { status: FollowStatus.PENDING },
        );
    }
    return;
  }

  async getFollowRequests(id: string, status: FollowStatus): Promise<User[]> {
    return this.userRepository.findAllFollowRequests(id, status);
  }

  async getAllFollowings(id: string, status: FollowStatus): Promise<User[]> {
    return this.userRepository.findAllFollowings(id, status);
  }

  async getAllUnFollowedUsers(id: string): Promise<User[]> {
    return await this.userRepository.findUnfollowedUsers(id);
  }

  async getFriends(userId: string, status: FollowStatus) {
    switch (status) {
      case FollowStatus.ALL:
        return this.getAllUnFollowedUsers(userId);
      case FollowStatus.FOLLOWINGS:
        return this.userRepository.findAllFollowings(
          userId,
          FollowStatus.ACCEPTED,
        );
      case FollowStatus.FOLLOWER:
        return this.userRepository.findAllFollowRequests(
          userId,
          FollowStatus.ACCEPTED,
        );
      case FollowStatus.PENDING:
        return this.userRepository.findAllFollowRequests(
          userId,
          FollowStatus.PENDING,
        );
      case FollowStatus.REQUESTED:
        return this.userRepository.findAllFollowings(
          userId,
          FollowStatus.PENDING,
        );
      case FollowStatus.SUGGESTIONS:
        return this.userRepository.findAllSuggestions(userId);
      default:
        return this.getAllUnFollowedUsers(userId);
    }
  }

  async getBlogsByUserId(userId: string) {
    return this.blogRepository.findBlogsByUserId(userId);
  }
}

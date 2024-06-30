import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from '@/dto/user/createUser.dto';
import User from './entity/user.entity';
import { FollowDto } from '@/dto/user/addFollow.dto';
import {
  FollowAction,
  FollowStatus,
  UserRelation,
} from '@/interfaces/users/relation';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

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
      case FollowAction.DROP:
        this.userRepository.dropRelation(
          followerId,
          followeeId,
          UserRelation.FOLLOW,
        );
        break;
      default:
        await this.userRepository.addRelation(
          followerId,
          followeeId,
          UserRelation.FOLLOW,
          { status: FollowStatus.PENDING },
        );
    }
    return;
  }

  async getFollowRequests(id: string, status: FollowStatus): Promise<User[]> {
    return this.userRepository.findAllFollowRequests(id, status);
  }

  async getAllFollowings(id: string): Promise<User[]> {
    return this.userRepository.findAllFollowings(id);
  }

  async getAllUnFollowedUsers(id: string): Promise<User[]> {
    return await this.userRepository.findUnfollowedUsers(id);
  }
}

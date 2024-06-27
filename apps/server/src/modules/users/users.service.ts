import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Users } from './schemas/users.schema';
import { SignupDto } from '../../dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name)
    private usersModel: Model<Users>,
  ) {}

  /**
   * Get all the user.
   *
   * @returns {User[]}
   */
  async create(createUser: SignupDto): Promise<Users> {
    return await this.usersModel.create(createUser);
  }

  /**
   * Find the use by name.
   *
   * @param username - Username.
   * @returns {Users | undefined}
   */
  async findOne(username: string): Promise<Users | undefined> {
    return await this.usersModel.findOne({ username });
  }

  /**
   * Function to get user by id.
   *
   * @param id -User Id.
   *
   * @returns { Promise<Users | undefined> }
   */
  async findById(id: string): Promise<Users | undefined> {
    return await this.usersModel.findById(id);
  }
}

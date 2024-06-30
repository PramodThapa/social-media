import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../gremlin/base.repository';
import { GremlinService } from '../gremlin/gremlin.service';
import { CreateUserDto } from '@/dto/user/createUser.dto';
import User from './entity/user.entity';
import { FollowStatus, UserRelation } from '@/interfaces/users/relation';

import { process } from 'gremlin';

const { both } = process.statics;
const { P } = process;

@Injectable()
export class UserRepository extends BaseRepository {
  constructor(gremlinService: GremlinService) {
    super(gremlinService, 'user');
  }

  async createUser(userDto: CreateUserDto): Promise<User> {
    const g = this.gremlinService.getClient();
    const traversal = g.addV(this.vertexLabel);
    this.gremlinService.assignProperties(traversal, userDto);
    const [user] = await this.execute<User>(traversal);

    return user;
  }

  async addRelation(
    from: string,
    to: string,
    type: string,
    properties: object,
  ): Promise<any> {
    const g = this.gremlinService.getClient();

    const traversal = g.V(from).as('a').V(to).as('b').addE(type).from_('a');

    this.gremlinService.assignProperties(traversal, properties);
    await this.execute(traversal);
  }

  async updateRelation(
    from: string,
    to: string,
    type: string,
    properties: object,
  ): Promise<any> {
    const g = this.gremlinService.getClient();
    const traversal = g
      .V(from)
      .outE(type)
      .has('status', 'PENDING')
      .as('e')
      .inV()
      .hasId(to)
      .select('e');

    this.gremlinService.assignProperties(traversal, properties);

    const [relation] = await this.execute(traversal);

    return relation;
  }

  async dropRelation(from: string, to: string, relation: UserRelation) {
    const g = this.gremlinService.getClient();
    const traversal = g
      .V(from)
      .outE(relation)
      .as('e')
      .inV()
      .hasId(to)
      .select('e')
      .drop();

    await this.execute(traversal);
  }

  async findAllFollowRequests(
    userId: string,
    status: FollowStatus,
  ): Promise<User[]> {
    const g = this.gremlinService.getClient();

    const traversal = g
      .V(userId)
      .inE(UserRelation.FOLLOW)
      .has('status', status)
      .outV()
      .valueMap(true);

    return this.execute(traversal);
  }

  async findAllFollowings(userId: string): Promise<User[]> {
    const g = this.gremlinService.getClient();

    const traversal = g
      .V(userId)
      .outE(UserRelation.FOLLOW)
      .has('status', FollowStatus.ACCEPTED)
      .inV()
      .valueMap(true);

    return this.execute(traversal);
  }

  async findByProperty(propertyName: string, value: string): Promise<User> {
    const g = this.gremlinService.getClient();
    const traversal = g
      .V()
      .hasLabel('user')
      .has(propertyName, value)
      .valueMap(true);
    const [user] = await this.execute<User>(traversal);

    return user;
  }

  async findById(id: string): Promise<User> {
    const g = this.gremlinService.getClient();
    const traversal = g.V(id).hasLabel('user');

    const [user] = await this.execute<User>(traversal);

    return user;
  }

  async findUnfollowedUsers(userId: string): Promise<User[]> {
    const g = this.gremlinService.getClient();
    const traversal = g
      .V(userId)
      .as('user1')
      .V()
      .hasLabel('user')
      .where(P.neq('user1'))
      .not(both(UserRelation.FOLLOW).where(P.eq('user1')))
      .valueMap(true);

    return this.execute(traversal);
  }
}

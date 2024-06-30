import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { GremlinModule } from '../gremlin/gremlin.module';
import { UserController } from './users.controller';
import { UserRepository } from './user.repository';
import { UniqueConstraint } from './validator/uniqueEmail.validator';

@Module({
  imports: [GremlinModule],
  controllers: [UserController],
  providers: [UsersService, UserRepository, UniqueConstraint],
  exports: [UsersService],
})
export class UsersModule {}

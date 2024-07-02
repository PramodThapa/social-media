import { Module, forwardRef } from '@nestjs/common';

import { UsersService } from './users.service';
import { GremlinModule } from '../gremlin/gremlin.module';
import { UserController } from './users.controller';
import { UserRepository } from './user.repository';
import { UniqueConstraint } from './validator/uniqueEmail.validator';
import { BlogsModule } from '../blog/blogs.module';

@Module({
  imports: [GremlinModule, forwardRef(() => BlogsModule)],
  controllers: [UserController],
  providers: [UsersService, UserRepository, UniqueConstraint],
  exports: [UsersService, UserRepository],
})
export class UsersModule {}

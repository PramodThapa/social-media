import { Module } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { BlogsRepository } from './blogs.repository';
import { GremlinModule } from '../gremlin/gremlin.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [GremlinModule, UsersModule],
  controllers: [BlogsController],
  providers: [BlogsRepository, BlogsService],
  exports: [BlogsService],
})
export class BlogsModule {}

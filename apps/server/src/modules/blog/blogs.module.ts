import { Module, forwardRef } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { BlogsRepository } from './blogs.repository';
import { GremlinModule } from '../gremlin/gremlin.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [GremlinModule, forwardRef(() => UsersModule)],
  controllers: [BlogsController],
  providers: [BlogsRepository, BlogsService],
  exports: [BlogsService, BlogsRepository],
})
export class BlogsModule {}

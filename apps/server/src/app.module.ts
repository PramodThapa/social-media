import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { GremlinModule } from './modules/gremlin/gremlin.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { FilesModule } from './modules/files/files.module';
import { MulterModule } from '@nestjs/platform-express';
import { BlogsModule } from './modules/blog/blogs.module';

@Module({
  imports: [
    GremlinModule,
    AuthModule,
    UsersModule,
    FilesModule,
    MulterModule,
    BlogsModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

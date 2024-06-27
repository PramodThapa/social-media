import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './schemas/users.schema';
import { UniqueConstraint } from './validator/usernameUnique.validator';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema }]),
  ],
  providers: [UsersService, UniqueConstraint],
  exports: [UsersService],
})
export class UsersModule {}

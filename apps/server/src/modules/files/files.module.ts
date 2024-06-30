import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';

@Module({
  imports: [AuthModule],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}

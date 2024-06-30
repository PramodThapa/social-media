import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
import { v4 as uuid } from 'uuid';
import { Readable } from 'stream';

@Injectable()
export class FilesService {
  private readonly minioClient: Minio.Client;

  constructor(private readonly configService: ConfigService) {
    this.minioClient = new Minio.Client({
      useSSL: false,
      port: Number(this.configService.get<string>('MINIO_PORT')) || 9000,
      accessKey: this.configService.get<string>('MINIO_ACCESS_KEY') || 'user',
      endPoint: this.configService.get<string>('MINIO_ENDPOINT') || 'localhost',
      secretKey:
        this.configService.get<string>('MINIO_SECRET_KEY') || 'password',
    });
  }

  getClient(): Minio.Client {
    return this.minioClient;
  }

  async handleUploadFile(file: Express.Multer.File): Promise<string> {
    const filename = this.generateRandomFileName();
    const bucketName = this.configService.get('MINIO_BUCKET');

    const fileStream = new Readable();
    fileStream.push(file.buffer);
    fileStream.push(null);

    await this.minioClient.putObject(
      bucketName,
      filename,
      fileStream,
      file.size,
      { 'Content-Type': file.mimetype },
    );

    return this.composeFileURI(bucketName, filename);
  }

  private composeFileURI(bucketName: string, filename: string): string {
    return `http://${this.configService.get('MINIO_ENDPOINT')}:${this.configService.get('MINIO_PORT')}/${bucketName}/${filename}`;
  }

  private generateRandomFileName(): string {
    return `${Date.now()}-${uuid()}`;
  }
}

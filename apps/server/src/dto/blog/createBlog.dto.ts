import { IsNotEmpty } from 'class-validator';

export class CreateBlogDto {
  @IsNotEmpty({ message: 'Thumbnail is required.' })
  readonly thumbnail: string;

  @IsNotEmpty({ message: 'Description is required.' })
  readonly description: string;

  @IsNotEmpty({ message: 'Content is required.' })
  readonly contentUrl: string;

  readonly imageUrl: string;

  @IsNotEmpty({ message: 'Author is required.' })
  readonly authorId: string;
}

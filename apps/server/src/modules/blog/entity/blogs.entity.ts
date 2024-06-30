export class Blog {
  id?: number;
  authorId: number;
  thumbnail: string;
  createdAt: string;
  contentUrl: string;
  description: string;

  constructor(
    title: string,
    content: string,
    authorId: number,
    description: string,
    createdAt: string,
  ) {
    this.thumbnail = title;
    this.authorId = authorId;
    this.contentUrl = content;
    this.createdAt = createdAt;
    this.description = description;
  }
}

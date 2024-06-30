import { Injectable } from '@nestjs/common';

import { BlogsRepository } from './blogs.repository';
import { CreateBlogDto } from '@/dto/blog/createBlog.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class BlogsService {
  constructor(
    private readonly blogsRepository: BlogsRepository,
    private readonly userService: UsersService,
  ) {}

  async create(blog: CreateBlogDto) {
    return this.blogsRepository.createBlog(blog);
  }

  async getAllBlogs() {
    return this.blogsRepository.findAll();
  }

  async getBlog(id: string) {
    const blog = await this.blogsRepository.findOne(id);

    const user = await this.userService.findUserById(blog.authorId.toString());
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user;

    return { blog, user: { ...rest } };
  }
}

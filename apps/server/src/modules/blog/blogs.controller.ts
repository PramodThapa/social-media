import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { BlogsService } from './blogs.service';
import { CreateBlogDto } from '@/dto/blog/createBlog.dto';

@Controller('/v1/blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post('/create')
  async createBlog(@Body() blog: CreateBlogDto) {
    return this.blogsService.create(blog);
  }

  @Get('')
  async getAllBlogs() {
    return this.blogsService.getAllBlogs();
  }

  @Get('/:id')
  async getBlog(@Param('id') id: string) {
    return this.blogsService.getBlog(id);
  }
}

import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../gremlin/base.repository';
import { GremlinService } from '../gremlin/gremlin.service';
import { CreateBlogDto } from '@/dto/blog/createBlog.dto';
import { Blog } from './entity/blogs.entity';

import gremlin from 'gremlin';
import { UserBlogRelation, VertexLabel } from '@/interfaces/enum';

const __ = gremlin.process.statics;
const Order = gremlin.process.order;

@Injectable()
export class BlogsRepository extends BaseRepository {
  constructor(gremlinService: GremlinService) {
    super(gremlinService, 'blogs');
  }

  async createBlog(blogDto: CreateBlogDto): Promise<Blog> {
    const g = this.gremlinService.getClient();

    const traversal = g.addV('blog');

    await this.gremlinService.assignProperties(traversal, {
      ...blogDto,
      createdAt: new Date(),
    });

    const resultTraversal = traversal
      .as('blog')
      .addE(UserBlogRelation.POSTED)
      .from_(__.V(blogDto.authorId))
      .select('blog');

    const [blog] = await this.execute<Blog>(resultTraversal);

    return blog;
  }

  async findAll(): Promise<Blog[]> {
    const g = this.gremlinService.getClient();

    const traversal = g
      .V()
      .hasLabel(VertexLabel.blog)
      .order()
      .by('createdAt', Order.desc);

    return await this.execute<Blog>(traversal);
  }

  async findOne(id: string) {
    const g = this.gremlinService.getClient();
    const [blog] = await this.execute<Blog>(g.V(id));

    return blog;
  }

  async findBlogsByUserId(userId: string) {
    const g = this.gremlinService.getClient();
    const traversal = g.V(userId).outE(UserBlogRelation.POSTED).inV();

    return await this.execute<Blog>(traversal);
  }
}

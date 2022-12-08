import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Post } from './entities/post.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostTypeOrmRepository implements IPostRepository {
  _repository: Repository<Post>;
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async create(newPost: Post) {
    await this.postRepository.insert(newPost);
  }
  async getAll() {
    return this.postRepository.find();
  }
  async getOneBySlug(slug: Post['slug']) {
    return this.postRepository.findOneBy({ slug });
  }
  async updateOneBySlug(slug: Post['slug'], updatePostDto: UpdatePostDto) {
    await this.postRepository.update({ slug }, updatePostDto);
  }
  async deleteOneBySlug(slug: Post['slug']) {
    await this.postRepository.delete({ slug });
  }
}

import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Post } from './entities/post.entity';
import { AppDataSource } from '../data-source';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostTypeOrmRepository implements IPostRepository {
  _repository: Repository<Post>;
  constructor() {
    this._repository = AppDataSource.getRepository(Post);
  }

  async create(newPost: Post) {
    await this._repository.insert(newPost);
  }
  async getAll() {
    return this._repository.find();
  }
  async getOne(slug: Post['slug']) {
    return this._repository.findOneBy({ slug });
  }
  async updateOne(slug: Post['slug'], updatePostDto: UpdatePostDto) {
    await this._repository.update({ slug }, updatePostDto);
  }
  async deleteOne(slug: Post['slug']) {
    await this._repository.delete({ slug });
  }
}

import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService implements IPostService {
  async create(createPostDto: CreatePostDto) {
    return;
  }

  async getAll() {
    return [];
  }

  async getOne(slug: Post['slug']) {
    const post = {
      slug: slug,
      title: 'test title',
      content: 'test-content',
      //author: User;
      //favorited: boolean;
      //favoritesCount?: number;
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return post;
  }

  async updateOne(updatePostDto) {
    return;
  }

  async deleteOne(slug: Post['slug']) {
    return;
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import slugify from 'cjk-slug';

@Injectable()
export class PostService implements IPostService {
  constructor(
    @Inject('POST_REPOSITORY')
    private readonly postRepository: IPostRepository,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const newPost = {
      slug: slugify(createPostDto.title),
      ...createPostDto,
    };
    await this.postRepository.create(newPost);
  }

  async getAll() {
    return this.postRepository.getAll();
  }

  async getOne(slug: Post['slug']) {
    return this.postRepository.getOne(slug);
  }

  async updateOne(slug: string, updatePostDto: UpdatePostDto) {
    const slugifiedTitle = slugify(updatePostDto.title);
    // updateDto.title을 slugify해서 slug를 만들어야 하는지
    // controller에서 slug를 params로 받아서 그걸 getOne(slug) 이렇게 해야하는건지
    const existedPost = await this.postRepository.getOne(slug);
    const updatedPost = {
      ...existedPost,
      slug: slugifiedTitle,
      ...updatePostDto,
    };
    await this.postRepository.updateOne(slug, updatedPost);
  }

  async deleteOne(slug: Post['slug']) {
    await this.postRepository.deleteOne(slug);
  }
}

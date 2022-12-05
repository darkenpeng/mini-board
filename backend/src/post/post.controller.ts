import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiOperation({
    summary: '글 생성 API',
    description: '게시판에 글을 생성한다.',
  })
  @ApiResponse({
    status: 201,
    description: 'The post has been successfully created.',
  })
  @ApiResponse({ status: 401, description: 'Bad Request.' })
  async create(@Body() createPostDto: CreatePostDto) {
    this.postService.create(createPostDto);
  }

  @Get()
  @ApiOperation({
    summary: '게시글 가져오는 API',
    description: '게시판에 글을 가져온다.',
  })
  @ApiResponse({
    status: 200,
    description: 'Posts are successfully gotten.',
  })
  async getAll() {
    return this.postService.getAll();
  }

  @Get(':slug')
  @ApiOperation({
    summary: '게시글 1개를 가져오는 API',
    description: '게시판에 존재하는 게시글 1개를 가져온다.',
  })
  @ApiResponse({
    status: 200,
    description: 'A post is successfully gotten.',
  })
  getOne(@Param('slug') slug: string) {
    return this.postService.getOne(slug);
  }

  @ApiOperation({
    summary: '글 수정하는 API',
    description: '게시판에 글을 수정한다.',
  })
  @ApiResponse({
    status: 204,
    description: 'The post is successfully changed.',
  })
  @Patch()
  async update(@Body() updatePostDto: UpdatePostDto) {
    return this.postService.updateOne(updatePostDto);
  }

  @ApiOperation({
    summary: '글 삭제하는 API',
    description: '게시판에 글을 삭제한다.',
  })
  @ApiResponse({
    status: 204,
    description: 'The post is successfully deleted.',
  })
  @Delete(':slug')
  @HttpCode(204)
  remove(@Param('slug') slug: string) {
    return this.postService.deleteOne(slug);
  }
}

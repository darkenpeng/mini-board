import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@ApiTags('board')
@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

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
  async create(@Body() createBoardDto: CreateBoardDto) {
    this.boardService.create(createBoardDto);
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
  findAll() {
    return this.boardService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: '게시글 1개를 가져오는 API',
    description: '게시판에 존재하는 게시글 1개를 가져온다.',
  })
  @ApiResponse({
    status: 200,
    description: 'A post is successfully gotten.',
  })
  findOne(@Param('id') id: string) {
    return this.boardService.findOne(+id);
  }

  @ApiOperation({
    summary: '글 수정하는 API',
    description: '게시판에 글을 수정한다.',
  })
  @ApiResponse({
    status: 204,
    description: 'The post is successfully changed.',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.update(+id, updateBoardDto);
  }

  @ApiOperation({
    summary: '글 삭제하는 API',
    description: '게시판에 글을 삭제한다.',
  })
  @ApiResponse({
    status: 204,
    description: 'The post is successfully deleted.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardService.remove(+id);
  }
}

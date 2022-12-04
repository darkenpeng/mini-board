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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: '회원가입', description: '유저를 생성한다.' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary:
      '모든 유저 정보를 조회하는 API (관리자가 없으면 필요없을 것 같아요)',
    description: '모든 유저를 조회한다.',
  })
  @ApiResponse({
    status: 200,
    description: 'Users are successfully gotten.',
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: '유저 조회 API',
    description: '유저정보를 조회한다.',
  })
  @ApiResponse({
    status: 200,
    description: 'The user is successfully gotten.',
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiOperation({
    summary: '유저정보 수정 API',
    description: '유저 정보를 수정한다.',
  })
  @ApiResponse({
    status: 204,
    description: 'The user information is successfully changed.',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiOperation({
    summary:
      '유저 삭제 API(과연 delete method를 써야할 지 논의해보아야 할 것 같아요)',
    description: '유저를 삭제한다.',
  })
  @ApiResponse({
    status: 204,
    description: 'The user is successfully deleted.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}

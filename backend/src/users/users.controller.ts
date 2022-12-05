import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({
    summary: '유저 리스트를 가져오는 API',
    description:
      '요청된 ID로 지정된 하나 이상의 사용자에 대한 다양한 정보를 반환합니다',
  })
  @ApiResponse({
    status: 200,
    description: 'GET: Users are successfully gotten.',
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: '요청한 ID로 유저 정보를 가져오는 API',
    description:
      '요청한 ID로 지정된 단일 사용자에 대한 다양한 정보를 반환합니다.',
  })
  @ApiResponse({
    status: 200,
    description: 'GET: User is successfully gotten.',
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '요청한 ID로 유저 정보를 수정하는 API',
    description: '요청한 ID로 지정된 단일 사용자의 정보를 수정합니다.',
  })
  @ApiResponse({
    status: 200,
    description: 'Patch: User is successfully gotten.',
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete('')
  @ApiOperation({
    summary: '현재 아이디 삭제',
    description: '요청한 ID로 지정된 단일 사용자를 삭제합니다.',
  })
  @ApiResponse({
    status: 200,
    description: 'Delete: User is successfully gotten.',
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

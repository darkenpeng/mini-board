import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
// import { DeleteUserDto } from './dto/delete-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: '유저 조회 API',
    description: '유저정보를 조회한다.',
  })
  @ApiResponse({
    status: 200,
    description: 'The user is successfully gotten.',
  })
  findOne(@Param('token') id: string) {
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
  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @ApiOperation({
    summary:
      '유저 삭제 API(과연 delete method를 써야할 지 논의해보아야 할 것 같아요)',
    description: '유저를 삭제한다.',
  })
  @ApiResponse({
    status: 204,
    description: 'The auth is successfully deleted.',
  })
  @Patch('withdraw')
  remove(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }
}

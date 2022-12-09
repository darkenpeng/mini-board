import { CurrentUser } from './../common/decorators/user.decorator';
import { UserDto } from './dtos/user.dto';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UpdateUserDto } from './dtos';

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
  async getAll(): Promise<UserDto[]> {
    return await this.usersService.getAll();
  }

  @ApiOperation({
    summary: '현재 유저의 정보를 가져오는 API',
    description: '현재 로그인된 사용자의 정보를 가져옵니다.',
  })
  @ApiResponse({
    status: 200,
    description: 'GET: Users are successfully gotten.',
  })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getCurrentUser(@CurrentUser() user: UserEntity): Promise<UserDto> {
    const userEntity = await this.usersService.getOneByEmail(user.email);
    return userEntity;
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: '검색 할 대상 user의 Id',
    example: 'user1@test.com',
  })
  @ApiOperation({
    summary: '요청한 ID로 유저 정보를 가져오는 API',
    description:
      '요청한 ID로 지정된 단일 사용자에 대한 다양한 정보를 반환합니다.',
  })
  @ApiResponse({
    status: 200,
    description: 'GET: User is successfully gotten.',
  })
  async getOneById(@Param('id') id: string) {
    return this.usersService.getOneByEmail(id);
  }

  @Patch('me')
  @ApiOperation({
    summary: '현재 유저의 정보를 수정하는 API',
    description: '현재 사용자의 정보를 수정합니다.',
  })
  @ApiResponse({
    status: 200,
    description: 'Patch: User is successfully gotten.',
    type: UpdateUserDto,
  })
  @UseGuards(JwtAuthGuard)
  async updateCurrentUser(
    @CurrentUser() user: UserEntity,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.usersService.updateByEmail(user.email, updateUserDto);
  }

  @ApiOperation({
    summary: '현재 유저의 정보를 삭제하는 API',
    description: '현재 사용자의 정보를 수정합니다.',
  })
  @ApiResponse({
    status: 200,
    description: 'Patch: User is successfully gotten.',
  })
  @UseGuards(JwtAuthGuard)
  @Delete('me')
  async deleteCurrentUser(@CurrentUser() user: UserEntity) {
    return await this.usersService.deleteByEmail(user.email);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'update 할 대상 user의 Id',
    example: 'user1@test.com',
  })
  @ApiOperation({
    summary: '요청한 ID로 유저 정보를 수정하는 API',
    description: '요청한 ID로 지정된 단일 사용자의 정보를 수정합니다.',
  })
  @ApiResponse({
    status: 200,
    description: 'Patch: User is successfully gotten.',
    type: UpdateUserDto,
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateByEmail(id, updateUserDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'delete 할 대상 user의 Id',
    example: 'user1@test.com',
  })
  @ApiOperation({
    summary: '현재 아이디 삭제',
    description: '요청한 ID로 지정된 단일 사용자를 삭제합니다.',
  })
  @ApiResponse({
    status: 200,
    description: 'Delete: User is successfully gotten.',
  })
  async remove(@Param('id') id: string) {
    return this.usersService.deleteByEmail(id);
  }
}

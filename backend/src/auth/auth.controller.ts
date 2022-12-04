import { Controller, Post, Body, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: '회원가입', description: '유저를 생성한다.' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  async create(@Body() createAuthDto: CreateAuthDto) {
    this.authService.create(createAuthDto);
  }

  @Post('login')
  @ApiOperation({ summary: '로그인', description: '유저에게 토큰을 발급한다.' })
  @ApiResponse({
    status: 201,
    description: 'The token has been successfully created.',
  })
  @ApiResponse({
    status: 403,
    description: 'login failed',
  })
  async login(@Body() createAuthDto: CreateAuthDto) {
    this.authService.create(createAuthDto);
  }
}

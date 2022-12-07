import { LoginRequestDto } from './dto/login.request.dto';
import { Controller, Post, Body, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegisterRequestDto } from './dto/register.requset.dto';
import { UsersService } from 'src/users/users.service';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: '회원가입', description: '유저를 생성한다.' })
  @ApiResponse({
    status: 201,
    description: 'Post: User Created',
    type: RegisterRequestDto,
  })
  async register(@Body() registerRequestDto: RegisterRequestDto) {
    return this.usersService.signUp(registerRequestDto);
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
  async login(@Body() loginRequestDto: LoginRequestDto) {
    return this.authService.jwtLogin(loginRequestDto);
  }
}

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { UserRegisterDto } from './dtos/user-register.dto';
import { UserLoginDTO } from './dtos/user-login.dto';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: '회원가입', description: '유저를 생성한다.' })
  @ApiResponse({
    status: 201,
    description: 'Post: User Created',
    type: UserRegisterDto,
  })
  async register(@Body() registerRequestDto: UserRegisterDto) {
    return this.usersService.createUser(registerRequestDto);
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
  async login(@Body() loginRequestDto: UserLoginDTO) {
    return this.authService.jwtLogin(loginRequestDto);
  }
}

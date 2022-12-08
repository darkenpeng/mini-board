import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async jwtLogin(data: LoginRequestDto) {
    const { email, password } = data;

    // check exist email
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new UnauthorizedException('찾는 아이디가 없습니다');
    }
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      user.password,
    );
    if (!isPasswordValidated) {
      throw new UnauthorizedException('패스워드가 다릅니다');
    }
    // sub는 나중에 id로 대체
    const payload = { email: email, sub: 'sub' };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}

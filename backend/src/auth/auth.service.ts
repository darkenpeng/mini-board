import { UsersService } from 'src/users/users.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDTO } from './dtos/user-login.dto';
import { UserPasswordNotValidException } from 'src/common/exceptions/user-password-not-valid.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async jwtLogin(data: UserLoginDTO) {
    const { email, password } = data;

    // check exist email
    const user = await this.usersService.getOneByEmail(email);
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      user.password,
    );
    if (!isPasswordValidated) {
      throw new UserPasswordNotValidException();
    }
    const payload = { email: email, sub: user.email };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}

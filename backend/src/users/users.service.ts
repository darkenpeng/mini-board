import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
//async는 나중에 사용할꺼라서 미리 작성해놓음 (없어도 상관x)
//DB연결하면서 대거 변경 예정

@Injectable()
export class UsersService {
  private readonly users = [
    {
      email: 'user1@test.com',
      username: 'user1',
      password: '1234',
    },
    {
      email: 'user2@test.com',
      username: 'user2',
      password: '1234',
    },
  ];

  async signUp(body: CreateUserDto) {
    const { email, username, password } = body;
    const isUserExist = this.users.find((user) => user.email === email);
    if (isUserExist !== undefined) {
      throw new UnauthorizedException('해당 이메일은 중복된 이메일입니다');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      email,
      username,
      password: hashedPassword,
    };
    await this.users.push(user);
    return user;
  }

  async findAll(): Promise<any> {
    return this.users;
  }

  async findOne(email: string) {
    const user = await this.users.find((user) => user.email === email);
    return user;
  }

  async update(email: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${updateUserDto} user`;
  }

  async remove(email: string) {
    return `This action removes a #${email} user`;
  }
}

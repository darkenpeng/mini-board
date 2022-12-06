import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

//async는 나중에 사용할꺼라서 미리 작성해놓음 (없어도 상관x)
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

  async create(createUserDto: CreateUserDto) {
    const createUser = createUserDto;
    this.users.push(createUser);
    return await this.users;
  }

  async findAll() {
    return await this.users;
  }

  async findOne(email: string) {
    const user = await this.users.find((user) => user.email === email);
    return user ? user : 'user not found';
  }

  async update(email: string, updateUserDto: UpdateUserDto) {
    return await `This action updates a #${updateUserDto} user`;
  }

  async remove(email: string) {
    return await `This action removes a #${email} user`;
  }
}

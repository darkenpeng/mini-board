import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

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
    return this.users;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findOne(email: string) {
    const user = await this.users.find((user) => user.email === email);
    return user ? user : 'user not found';
  }

  async update(email: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${updateUserDto} user`;
  }

  async remove(email: string) {
    return `This action removes a #${email} user`;
  }
}

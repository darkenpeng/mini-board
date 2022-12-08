import { UserEntity } from './entities/user.entity';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
// import { UserRegisterDto } from 'src/auth/dtos/user-register.dto';
import { UpdateUserDto } from './dtos';
import { UserDto } from './dtos/user.dto';
import { UserTypeOrmRepository } from './users.repository';
import { UserRegisterDto } from 'src/auth/dtos/user-register.dto';
//async는 나중에 사용할꺼라서 미리 작성해놓음 (없어도 상관x)
//DB연결하면서 대거 변경 예정

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private readonly userRepository: UserTypeOrmRepository,
  ) {}
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

  async createUser(userRegisterDto: UserRegisterDto): Promise<UserEntity> {
    const { email, username, password } = userRegisterDto;
    const isUserExist = this.users.find((user) => user.email === email);
    if (isUserExist !== undefined) {
      throw new UnauthorizedException('해당 이메일은 중복된 이메일입니다');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserDto = {
      email,
      username,
      password: hashedPassword,
    };
    const newUser = await this.userRepository.create(newUserDto);
    return newUser;
  }

  async getAll(): Promise<UserDto[]> {
    return this.userRepository.getAll();
  }

  async getOneByEmail(email: string) {
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

import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dtos';
import { UserDto } from './dtos/user.dto';
import { UserTypeOrmRepository } from './users.repository';
import { UserRegisterDto } from 'src/auth/dtos/user-register.dto';
import { UserNotFoundException } from 'src/common/exceptions/user-not-found.exception.ts';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private readonly userRepository: UserTypeOrmRepository,
  ) {}

  async createUser(userRegisterDto: UserRegisterDto): Promise<UserDto> {
    const { email, password } = userRegisterDto;
    const user = await this.getOneByEmail(email);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserDto = {
      email: user.email,
      username: user.username,
      password: hashedPassword,
    };
    const newUser = await this.userRepository.create(newUserDto);
    return newUser;
  }

  async getAll(): Promise<UserDto[]> {
    return await this.userRepository.getAll();
  }

  async getOneByEmail(email: string): Promise<UserDto> {
    const user = await this.userRepository.getOneByEmail(email);
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  async updateByEmail(
    email: string,
    updateUserDto: UpdateUserDto,
  ): Promise<void> {
    const user = await this.getOneByEmail(email);
    await this.userRepository.updateOneByEmail(user.email, updateUserDto);
  }

  async deleteByEmail(email: string) {
    const user = await this.getOneByEmail(email);
    await this.userRepository.deleteByEmail(user.email);
    return user;
  }
}

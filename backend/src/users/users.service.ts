import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dtos';
import { UserTypeOrmRepository } from './users.repository';
import { UserRegisterDto } from 'src/auth/dtos/user-register.dto';
import { UserNotFoundException } from 'src/common/exceptions/user-not-found.exception.ts';
import { UserEntity } from './entities';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserTypeOrmRepository) {}

  async createUser(userRegisterDto: UserRegisterDto): Promise<UserEntity> {
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

  async getAll(): Promise<UserEntity[]> {
    return await this.userRepository.getAll();
  }

  async getOneByEmail(email: string): Promise<UserEntity> {
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

  async deleteByEmail(email: string): Promise<UserEntity> {
    const user = await this.getOneByEmail(email);
    await this.userRepository.deleteByEmail(user.email);
    return user;
  }
}

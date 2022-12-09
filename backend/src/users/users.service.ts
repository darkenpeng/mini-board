import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dtos';
import { UserDto } from './dtos/user.dto';
import { UserTypeOrmRepository } from './users.repository';
import { UserRegisterDto } from 'src/auth/dtos/user-register.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private readonly userRepository: UserTypeOrmRepository,
  ) {}

  async createUser(userRegisterDto: UserRegisterDto): Promise<UserDto> {
    const { email, username, password } = userRegisterDto;
    console.log(email);
    const isUserExist = await this.userRepository.getOneByEmail(email);
    console.log(isUserExist, 'isUserExist');
    if (isUserExist) {
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
    return await this.userRepository.getAll();
  }

  async getOneById(id: string): Promise<UserDto> {
    const user = await this.userRepository.getOneByEmail(id);

    if (!user) {
      throw new UnauthorizedException('해당 유저가 없습니다');
    }
    return user;
  }

  async updateById(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    const user = await this.userRepository.getOneByEmail(id);
    if (!user) {
      throw new UnauthorizedException('해당 유저가 없습니다');
    }
    await this.userRepository.updateOneByEmail(id, updateUserDto);
  }

  async deleteById(id: string) {
    const user = await this.userRepository.getOneByEmail(id);
    if (!user) {
      throw new UnauthorizedException('해당 유저가 없습니다');
    }
    await this.userRepository.deleteByEmail(id);
    return user;
  }
}

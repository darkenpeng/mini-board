import { UpdateUserDto } from './dtos/user-update.dto';
import { UserEntity } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dtos';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class UserTypeOrmRepository {
  _repository: Repository<UserEntity>;
  constructor(
    @InjectRepository(UserEntity)
    private userModel: Repository<UserEntity>,
  ) {}

  async create(newUser: UserDto): Promise<UserDto> {
    const createdUser = await this.userModel.save(newUser);
    return createdUser;
  }
  async getAll(): Promise<UserDto[]> {
    return this.userModel.find();
  }
  // 내 생각엔 Dto 형식보다 프로퍼티가 3개많아서 에러가 떠야하는데 정상작동함...
  async getOneByEmail(email: string): Promise<UserDto> {
    const test = await this.userModel.findOneBy({ email });
    return test;
  }

  async updateOneByEmail(
    email: string,
    updateUserDto: UpdateUserDto,
  ): Promise<void> {
    await this.userModel.update({ email: email }, updateUserDto);
  }
  async deleteByEmail(email: string) {
    const result = await this.userModel.delete({ email });
    if (result.affected === 0) {
      throw new NotFoundException(`could not find a user with ${email}`);
    }
  }
}

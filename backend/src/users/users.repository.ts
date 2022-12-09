import { UpdateUserDto } from './dtos/user-update.dto';
import { UserEntity } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dtos';

@Injectable()
export class UserTypeOrmRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userModel: Repository<UserEntity>,
  ) {}

  async create(newUser: UserDto): Promise<UserEntity> {
    const createdUser = await this.userModel.save(newUser);
    return createdUser;
  }
  async getAll(): Promise<UserEntity[]> {
    return await this.userModel.find();
  }
  // 내 생각엔 Dto 형식보다 프로퍼티가 3개많아서 에러가 떠야하는데 정상작동함...
  async getOneByEmail(email: string): Promise<UserEntity> {
    const test = await this.userModel.findOneBy({ email });
    return test;
  }

  async updateOneByEmail(
    email: string,
    updateUserDto: UpdateUserDto,
  ): Promise<void> {
    await this.userModel.update({ email: email }, updateUserDto);
  }

  async deleteByEmail(email: string): Promise<DeleteResult> {
    const result = await this.userModel.delete({ email });
    return result;
  }
}

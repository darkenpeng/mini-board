import { UserEntity } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dtos';

@Injectable()
export class UserTypeOrmRepository {
  _repository: Repository<UserEntity>;
  constructor(
    @InjectRepository(UserEntity)
    private userModel: Repository<UserEntity>,
  ) {}

  async create(newUser: UserDto): Promise<UserEntity> {
    const createdUser = await this.userModel.save(newUser);
    return createdUser;
  }
  async getAll() {
    return this.userModel.find();
  }
  async getOneByEmail(email: string) {
    return this.userModel.findOneBy({ email });
  }
}

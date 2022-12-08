import { UserTypeOrmRepository } from './users.repository';
import { UserEntity } from './entities/user.entity';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    {
      provide: 'USERS_REPOSITORY',
      useClass: UserTypeOrmRepository,
    },
    UsersService,
  ],
  exports: [UsersService],
})
export class UsersModule {}

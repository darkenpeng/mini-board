import { IsOptional } from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity extends CommonEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @IsOptional()
  @Column({ nullable: true })
  imgUrl?: string;
}

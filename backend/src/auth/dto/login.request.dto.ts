import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class LoginRequestDto extends PickType(User, [
  'email',
  'password',
] as const) {
  @IsNotEmpty({ message: '이메일은 필수값입니다.' })
  @IsEmail({ message: '이메일의 형식이 올바르지않습니다.' })
  @ApiProperty({ example: 'user1@test.com', description: '이메일' })
  email: string;

  @IsNotEmpty({ message: '비밀번호는 필수값입니다.' })
  @IsString({ message: '비밀번호의 형식이 올바르지않습니다.' })
  @ApiProperty({ example: '1234', description: '비밀번호' })
  password: string;
}

import { NotFoundException } from '@nestjs/common';
export class UserPasswordNotValidException extends NotFoundException {
  constructor(error?: string) {
    super('ERROR:비밀번호가 틀렸습니다.', error);
  }
}

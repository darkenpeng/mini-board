import { NotFoundException } from '@nestjs/common';
export class UserNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('ERROR:찾는 유저가 없습니다.', error);
  }
}

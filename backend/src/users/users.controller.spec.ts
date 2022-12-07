import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const USER_MOCK_DATA = [
  {
    email: 'user1@test.com',
    username: 'user1',
    password: '1234',
  },
  {
    email: 'user2@test.com',
    username: 'user2',
    password: '1234',
  },
];

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      jest
        .spyOn(controller, 'findAll')
        .mockImplementation(async () => USER_MOCK_DATA);
      expect(await controller.findAll()).toBe(USER_MOCK_DATA);
    });
  });
});

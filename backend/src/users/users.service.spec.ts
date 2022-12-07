import { Test, TestingModule } from '@nestjs/testing';
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

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockImplementation(async () => USER_MOCK_DATA);
      expect(await service.findAll()).toBe(USER_MOCK_DATA);
    });
  });
});

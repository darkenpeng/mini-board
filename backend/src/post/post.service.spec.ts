import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;
  let repository: IPostRepository;

  // it이 하나 실행되기 전 마다 beforeEach의 callback이 실행된다.
  beforeEach(async () => {
    // service는 서로 다른 의존성과 도메인 로직 등을 중개해주는 handler 역할을 하기 떄문에 integration으로 한다.

    // unit => 훈련을 혼자 동료 객체는 mocking하거나 spy를 합니다
    // integration => 훈련을 같이, 동료 객체는 진짜나 fake를 넣어줍니다
    // e2e => 내부가 아니라 외부에서 실제로 사용자(client, frontend)가 쓰는 것처럼 테스트
    const fakeRepository = {
      _state: [] as Post[],
      async create(newPost: Omit<Post, 'createdAt' | 'updatedAt'>) {
        this._state.push({
          ...newPost,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      },
      async getAll() {
        return this._state;
      },
      async getOne(
        this: { _state: Post[] }, // 매개변수가 아니라 this에 타입을 달아준 것임
        slug: Post['slug'],
      ) {
        return this._state.find((post) => post.slug === slug);
      },
      async updateOne(
        this: { _state: Post[] }, // 매개변수가 아니라 this에 타입을 달아준 것임
        slug: Post['slug'],
        updatePostDto: Omit<Post, 'createdAt' | 'updatedAt'>,
      ) {
        const index = this._state.findIndex((post) => post.slug === slug);
        const old = this._state[index];
        this._state[index] = {
          ...old,
          ...updatePostDto,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      },
      async deleteOne(
        this: { _state: Post[] }, // 매개변수가 아니라 this에 타입을 달아준 것임
        slug: Post['slug'],
      ) {
        this._state = this._state.filter((post) => post.slug !== slug);
      },
    };

    repository = fakeRepository;
    // 1번 테스트 디비를 판다
    // 2번 fake repository
    service = new PostService(repository);
  });

  it('scenario', async () => {
    // getAll []
    expect(await service.getAll()).toStrictEqual([]);

    // create
    const dto = new CreatePostDto();
    dto.title = '테스트 제목';
    dto.content = '테스트 내용';
    await service.create(dto);

    // getAll [Post]
    const actual = await service.getAll();
    expect(actual).toHaveLength(1);
    expect(actual[0].title).toBe(dto.title);
    expect(actual[0].content).toBe(dto.content);
    expect(actual[0].slug).toBe('테스트-제목'); // title에서 slug가 생성되는지?

    // update
    const updateDto = {
      title: '수정된 제목',
      content: '수정된 내용',
    };
    await service.updateOne('테스트-제목', updateDto);

    // getOne UpdatedPost
    const updated = await service.getOne('수정된-제목');
    expect(updated.title).toBe(updateDto.title);
    expect(updated.content).toBe(updateDto.content);
    expect(updated.slug).toBe('수정된-제목');

    // delete
    await service.deleteOne('수정된-제목');

    // getAll []
    expect(await service.getAll()).toStrictEqual([]);
  });
});

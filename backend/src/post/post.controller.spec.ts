import { PostController } from './post.controller';
import { PostService } from './post.service';

// post.controller.spec.ts에 service가 존재하는 이유?
describe('PostController', () => {
  let postController: PostController;
  let postService: PostService;

  beforeEach(async () => {
    postService = new PostService({} as IPostRepository);
    postController = new PostController(postService);
  });

  it('getAll : should return an array of Posts', async () => {
    const expected = [
      {
        slug: 'test-title',
        title: 'test title',
        content: 'test-content',
        //author: User;
        //favorited: boolean;
        //favoritesCount?: number;
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    jest.spyOn(postService, 'getAll').mockImplementation(async () => expected);
    expect(await postController.getAll()).toBe(expected);
  });

  it('create : should return void', async () => {
    const input = {
      title: 'test title',
      content: 'test-content',
    };
    jest
      .spyOn(postService, 'create')
      .mockImplementation(async (createPostDto) => {
        //creatPostDto는 input과 같기를 기대한다.
        expect(createPostDto).toBe(input);
      });
    expect(await postController.create(input)).toBe(undefined);
  });

  it('getOne : should return a Post', async () => {
    const expected = {
      slug: 'test-title',
      title: 'test title',
      content: 'test-content',
      //author: User;
      //favorited: boolean;
      //favoritesCount?: number;
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(postService, 'getOne').mockImplementation(async () => expected);
    expect(await postController.getOne(expected.slug)).toBe(expected);
  });
  it('updateOne : should return void', async () => {
    const input = {
      title: 'test-title',
      content: 'test-content',
      slug: 'test-title',
    };
    jest
      .spyOn(postService, 'updateOne')
      .mockImplementation(async (slug, updatePostDto) => {
        expect(slug).toBe(input.slug);
        expect(updatePostDto).toBe(input);
      });
    expect(await postController.update(input.slug, input)).toBe(undefined);
  });

  it('deleteOne should return void', async () => {
    const input = 'test-slug';

    jest.spyOn(postService, 'deleteOne').mockImplementation(async (slug) => {
      expect(slug).toBe(input);
    });
    expect(await postController.remove(input)).toBe(undefined);
  });
});

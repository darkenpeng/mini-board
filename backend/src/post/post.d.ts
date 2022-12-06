// class <-> type
//import { User } from "src/user/user.d"; TODO 나중에 구현하시는 거 보고 import 하기

// https://github.com/lujakob/nestjs-realworld-example-app/blob/master/src/article/article.interface.ts
type Post = {
  slug: string;
  title: string;
  content: string;
  // author: User;
  //favorited: boolean;
  //favoritesCount?: number;
  createdAt: Date;
  updatedAt: Date;
};
interface IPostRepository {
  //https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys
  create: (newPost: Omit<Post, 'createdAt' | 'updatedAt'>) => Promise<void>;
  getAll: () => Promise<Post[]>;
  getOne: (slug: Post['slug']) => Promise<Post>;
  updateOne: (
    slug: Post['slug'],
    updatePostDto: Omit<Post, 'createdAt' | 'updatedAt'>,
  ) => Promise<void>;
  deleteOne: (slug: Post['slug']) => Promise<void>;
}

interface IPostService {
  create: (createPostDto: CreatePostDto) => Promise<void>;
  getAll: () => Promise<Post[]>;
  getOne: (slug: Post['slug']) => Promise<Post>;
  updateOne: (
    slug: Post['slug'],
    updatePostDto: UpdatePostDto,
  ) => Promise<void>;
  deleteOne: (slug: Post['slug']) => Promise<void>;
}
// entity가 있는데 굳이 왜 d.ts로 인터페이스를 정의했는지?
// 전역스코프에서 인터페이스를 정의하고 덜 헷갈림... entity가 ORM과 독립적임..

// class <-> type
//import { User } from "src/user/user.d"; TODO 나중에 구현하시는 거 보고 import 하기

// https://github.com/lujakob/nestjs-realworld-example-app/blob/master/src/article/article.interface.ts
type Post = {
  slug: string;
  title: string;
  content: string;
  //author: User;
  //favorited: boolean;
  //favoritesCount?: number;
  createdAt: Date;
  updatedAt: Date;
};
interface IPostRepository {
  create: (newPost: Post) => Promise<void>;
  getAll: () => Promise<Post[]>;
  getOne: (slug: Post['slug']) => Promise<Post>;
  updateOne: (slug: Post['slug']) => Promise<void>;
  deleteOne: (slug: Post['slug']) => Promise<void>;
}

interface IPostService {
  create: (newPost: Post) => Promise<void>;
  getAll: () => Promise<Post[]>;
  getOne: (slug: Post['slug']) => Promise<Post>;
  updateOne: (slug: Post['slug'], updatePostDto) => Promise<void>;
  deleteOne: (slug: Post['slug']) => Promise<void>;
}

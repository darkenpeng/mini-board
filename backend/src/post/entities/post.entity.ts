import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryColumn()
  slug: string;

  @Column({
    length: 32, //TODO
  })
  title: string;

  @Column({
    type: 'text',
    length: 32648,
  })
  content: string;
  //author: User;
  //favorited: boolean;
  //favoritesCount: number;
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

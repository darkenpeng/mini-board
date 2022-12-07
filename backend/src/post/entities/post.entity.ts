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

  @Column()
  title: string;

  @Column({
    type: 'text',
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

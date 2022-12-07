import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostTypeOrmRepository } from './post.respository';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostController],
  providers: [
    {
      provide: 'POST_REPOSITORY',
      useClass: PostTypeOrmRepository,
    },
    PostService,
  ],
})
export class PostModule {}

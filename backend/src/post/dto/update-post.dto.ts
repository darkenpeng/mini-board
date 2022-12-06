import { PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';
//import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {}

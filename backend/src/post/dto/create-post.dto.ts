import { IsNotEmpty, IsString } from 'class-validator';
//https://docs.nestjs.com/techniques/validation#using-the-built-in-validationpipe
export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}

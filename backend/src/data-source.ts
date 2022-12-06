import { DataSource } from 'typeorm';
import { Post } from './post/entities/post.entity';
import * as dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.host,
  port: parseInt(process.env.port),
  username: process.env.username,
  password: process.env.password,
  database: 'postgres',
  synchronize: true,
  logging: true,
  entities: [Post],
  subscribers: [],
  migrations: [],
});

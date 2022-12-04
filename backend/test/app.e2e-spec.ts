import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/user (GET)', () => {
    return request(app.getHttpServer()).get('/user').expect(200); //.expect('');
  });

  it('/user (PATCH)', () => {
    return request(app.getHttpServer()).patch('/user').expect(200); //.expect('');
  });

  it('/user/withdraw (PATCH)', () => {
    return request(app.getHttpServer()).patch('/user/withdraw').expect(200); //.expect('');
  });

  it('/register (POST)', () => {
    return request(app.getHttpServer()).post('/register').expect(201); //.expect('');
  });

  it('/login (POST)', () => {
    return request(app.getHttpServer()).post('/login').expect(201); //.expect('');
  });

  it('/board (POST)', () => {
    return request(app.getHttpServer()).post('/board').expect(201); //.expect('');
  });

  it('/board (GET)', () => {
    return request(app.getHttpServer()).get('/board').expect(200); //.expect('');
  });

  it('/board/{id} (GET)', () => {
    return request(app.getHttpServer()).get('/board/1').expect(200); //.expect('');
  });

  it('/board/{id} (PATCH)', () => {
    return request(app.getHttpServer()).patch('/board/1').expect(200); //.expect('');
  });

  it('/board/{id} (DELETE)', () => {
    return request(app.getHttpServer()).delete('/board/1').expect(204); //.expect('');
  });

  afterAll(async () => {
    await app.close();
  });
});

import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

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

  it('should can say hello', async () => {
    const result = await request(app.getHttpServer())
      .get('/api/users/hello')
      .query({
        first_name: 'kurniawan',
        last_name: 'awan',
      });

    expect(result.status).toBe(200);
    expect(result.text).toBe('Hello, my name is kurniawan awan');
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import * as httpMock from 'node-mocks-http';
import { UserController } from './user.controller';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should can say hello', async () => {
    const response = await controller.sayHello('kurniawan', 'awan');
    expect(response).toBe('Hello, my name is kurniawan awan');
  });

  it('should can view html', async () => {
    const response = httpMock.createResponse();
    controller.viewHtml('kurniawan', response);

    expect(response._getRenderView()).toBe('index.html');
    expect(response._getRenderData()).toEqual({
      title: 'view html berhasil',
      name: 'kurniawan',
    });
  });
});

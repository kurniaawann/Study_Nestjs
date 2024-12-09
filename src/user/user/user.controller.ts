import {
  Controller,
  Get,
  Header,
  HttpCode,
  HttpRedirectResponse,
  Param,
  Post,
  Query,
  Redirect,
  Res,
} from '@nestjs/common';

import { Response } from 'express';
import { Connection } from '../connection/connection';
import { MailService } from '../mail/mail.service';
import { UserRepository } from '../user-repository/user-repository';
import { UserService } from './user.service';

@Controller('/api/users')
export class UserController {
  constructor(
    private service: UserService,
    private connection: Connection,
    private mainService: MailService,
    private userRepository: UserRepository,
  ) {}

  @Get('/connection')
  async getConnection(): Promise<string> {
    this.mainService.send();
    this.userRepository.save();
    return this.connection.getName();
  }

  @Get('/hello')
  async sayHello(@Query('name') name: string): Promise<string> {
    return this.service.sayHello(name);
  }

  @Get('view-html')
  viewHtml(@Query('name') name: string, @Res() response: Response) {
    response.render('index.html', {
      title: 'view html berhasil',
      name: name,
    });
  }

  @Get('sample-response')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  sampleResponse(): Record<string, string> {
    return {
      data: 'hello',
    };
  }

  @Get('/redirect')
  @Redirect('/api/users/sample-response', 301)
  redirect(): HttpRedirectResponse {
    return {
      url: '/api/users/sample-response',
      statusCode: 301,
    };
  }

  @Get('/:id')
  getId(@Param('id') id: string): string {
    return `GET ${id}`;
  }

  @Post()
  post(): string {
    return 'POST';
  }

  @Get('/sample')
  get(): string {
    return 'Hello Nest js';
  }
}

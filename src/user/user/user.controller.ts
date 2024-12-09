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

@Controller('/api/users')
export class UserController {
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

  @Get('/hello')
  async sayHello(
    @Query('first_name') firstName: string,
    @Query('last_name') lastName: string,
  ): Promise<string> {
    return `Hello, my name is ${firstName} ${lastName}`;
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

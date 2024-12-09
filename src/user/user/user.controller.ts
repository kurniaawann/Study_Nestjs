import { Controller, Get, Param, Post, Query } from '@nestjs/common';
@Controller('/api/users')
export class UserController {
  @Get('/hello')
  sayHello(
    @Query('first_name') firstName: string,
    @Query('last_name') lastName: string,
  ): string {
    return `Hello, my name is ${firstName} ${lastName}.`;
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

import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpRedirectResponse,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Redirect,
  Res,
  UseFilters,
} from '@nestjs/common';

import { User } from '@prisma/client';
import { Response } from 'express';
import {
  LoginUserRequest,
  LoginUserRequestValidation,
} from 'src/model/login.model';
import { ValidationFilter } from 'src/validation/validation.filter';
import { ValidationPipe } from 'src/validation/validation.pipe';
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
    @Inject('EmailService') private emailService: MailService,
  ) {}

  @UseFilters(ValidationFilter)
  @Post('/login')
  login(
    @Body(new ValidationPipe(LoginUserRequestValidation))
    request: LoginUserRequest,
  ) {
    return `hello ${request.username}`;
  }

  @Get('/connection')
  async getConnection(): Promise<string> {
    this.mainService.send();
    this.emailService.send();
    return this.connection.getName();
  }

  @Get('/hello')
  @UseFilters(ValidationFilter)
  async sayHello(@Query('name') name: string): Promise<string> {
    return this.service.sayHello(name);
  }

  @Get('/create')
  async create(
    @Query('first_name') firstName: string, // Perbaikan pada parameter
    @Query('last_name') lastName: string,
  ): Promise<User> {
    if (!firstName) {
      throw new HttpException(
        {
          code: 400,
          error: 'first_name is required', // Konsistensi dengan parameter yang benar
        },
        400,
      );
    }
    return await this.userRepository.save(firstName, lastName);
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
  getId(@Param('id', ParseIntPipe) id: number): string {
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

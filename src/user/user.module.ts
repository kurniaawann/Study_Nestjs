import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Connection, createConnection } from './connection/connection';
import { mailService, MailService } from './mail/mail.service';
import { UserRepository } from './user-repository/user-repository';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  controllers: [UserController],
  providers: [
    UserRepository,
    UserService,
    {
      provide: Connection,
      useFactory: createConnection,
      inject: [ConfigService],
    },
    {
      provide: MailService,
      useValue: mailService,
    },

    {
      provide: 'EmailService',
      useExisting: MailService,
    },
  ],
})
export class UserModule {}

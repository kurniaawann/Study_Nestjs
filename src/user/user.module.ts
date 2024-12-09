import { Module } from '@nestjs/common';
import * as process from 'process';
import {
  Connection,
  MangoDBConnection,
  MySQLConnection,
} from './connection/connection';
import { mailService, MailService } from './mail/mail.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: Connection,
      useClass:
        process.env.DATABASE == 'mysql' ? MySQLConnection : MangoDBConnection,
    },
    {
      provide: MailService,
      useValue: mailService,
    },
  ],
})
export class UserModule {}

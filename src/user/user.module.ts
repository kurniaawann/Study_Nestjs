import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { Connection, createConnection } from './connection/connection';
import { mailService, MailService } from './mail/mail.service';
import { UserRepository } from './user-repository/user-repository';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [PrismaModule],
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

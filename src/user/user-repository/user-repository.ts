import { Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { Logger } from 'winston';

@Injectable()
export class UserRepository {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {
    this.logger.info('create user repository');
  }

  async save(fristname: string, lastName: string): Promise<User> {
    this.logger.info(`create user ${fristname}, ${lastName}`);
    return await this.prismaService.user.create({
      data: {
        frist_name: fristname,
        last_name: lastName,
      },
    });
  }
}

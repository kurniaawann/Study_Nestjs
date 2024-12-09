import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) {
    console.info('Create User repository');
  }

  async save(fristname: string, lastName: string): Promise<User> {
    return await this.prismaService.user.create({
      data: {
        frist_name: fristname,
        last_name: lastName,
      },
    });
  }
}

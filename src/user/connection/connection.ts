import { Injectable } from '@nestjs/common';

export class Connection {
  getName(): string {
    return null;
  }
}
@Injectable()
export class MySQLConnection extends Connection {
  getName(): string {
    return 'MySQL';
  }
}
@Injectable()
export class MangoDBConnection extends Connection {
  getName(): string {
    return 'MangoDB';
  }
}

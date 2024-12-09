import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as mustache from 'mustache-express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //logger service
  const loggerService = app.get(WINSTON_MODULE_PROVIDER);
  app.useLogger(loggerService);

  app.set('views', __dirname + '/../views');
  app.set('view engine', 'html');
  app.engine('html', mustache());

  const configService = app.get(ConfigService);

  await app.listen(configService.get('PORT'));
}
bootstrap();

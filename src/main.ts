import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as mustache from 'mustache-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.set('views', __dirname + '/../views');
  app.set('view enggine', 'html');
  app.engine('html', mustache());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

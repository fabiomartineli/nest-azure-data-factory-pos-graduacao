import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(new Logger());
  app.enableCors({
    origin: process.env.ENABLED_CORS.split(',')
  });
  await app.listen(443);
}
bootstrap();

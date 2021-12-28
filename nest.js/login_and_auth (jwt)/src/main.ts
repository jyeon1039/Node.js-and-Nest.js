import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true, // DTO에 존재하지 않는 key값은 거절
    transform: true // 원하는 실제 타입으로 변환 가능
  }));
  await app.listen(3000);
}

bootstrap();

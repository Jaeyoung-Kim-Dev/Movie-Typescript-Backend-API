import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // blocks values without validation decorator(IsString, IsNumber etc) in DTO(Data Transfer Object) will be removed, but passes the rest without error.
      forbidNonWhitelisted: true, // if non-white listed value included then throw error 400 and a message.
      transform: true, // when pass parameter via URL, it's always a string value. 'transform' changes parameters into the type in the controller automatically. For example, the movieId is changed to number.
    })
  );
  await app.listen(3000);
}
bootstrap();

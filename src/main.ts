import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { ValidationExeption } from './infra/exceptions/ValidationExeption';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new ValidationExeption(validationErrors);
      },

    })
  );
  await app.listen(3000);
}
bootstrap().finally();

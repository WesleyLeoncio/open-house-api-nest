import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { ValidationExeption } from './infra/exceptions/ValidationExeption';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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
  const config = new DocumentBuilder()
    .setTitle('OPEN HOUSE NESTJS')
    .setDescription('API DE FILMES')
    .setVersion('1.0')
    .addTag('filmes')
    .addTag('categorias')
    .addTag('roles')
    .addTag('usuarios')
    .addTag('avaliações')
    .addTag('autenticação')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap().finally();

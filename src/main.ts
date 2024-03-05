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

    }),
  );
  const config = new DocumentBuilder()
    .setTitle('OPEN HOUSE NESTJS')
    .setDescription(
      `<html lang="pt-br">
        <div>
           <img height="80" width="100"  src="https://titleinsurancewebdesign.com/firsttitleabstract/wp-content/uploads/sites/55/2014/03/open-house.jpg" alt="Imagem">
           <p>API DE EXEMPLO UTILIZANDO NESTJS</p>
        </div>
      </html>`)
    .setVersion('1.0')
    .addTag('Endpoint De Login')
    .addTag('Endpoints De Roles')
    .addTag('Endpoints De Usuários')
    .addTag('Endpoints De Categorias')
    .addTag('Endpoints De Filmes')
    .addTag('Endpoints De Avaliar Filmes')
    .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter token',
        in: 'header',
      }, 'KEY_AUTH',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap().finally();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { ValidationExeption } from './infra/exceptions/ValidationExeption';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfig } from './infra/config/swagger/swaggerConfig';

const swaggerConfig: SwaggerConfig = new SwaggerConfig();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
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
  const config: Omit<OpenAPIObject, 'paths'> = swaggerConfig.documentBuillder().build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap().finally();

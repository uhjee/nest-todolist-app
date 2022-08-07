import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from 'config';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Setting Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Todolist-nest API')
    .setDescription('Todolist 개발을 위한 API 문서입니다.')
    .setVersion('1.0')
    .addCookieAuth('connect.sid')
    .build();
  const documnet = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, documnet);

  const serverConfig = config.get<ServerConfig>('server');

  await app.listen(serverConfig.port);
  Logger.log(`Application running on port ${serverConfig.port}`);
}
bootstrap();

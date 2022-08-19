import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from 'config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { TransformResponseEntityInterceptor } from './interceptors/transform-response-entity.interceptor';
import session from 'express-session';
import passport from 'passport';

const cookieConfig = config.get<CookieConfig>('cookie');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Interceptors
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new TransformResponseEntityInterceptor());

  // Pipes
  app.useGlobalPipes(new ValidationPipe());

  // Exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // express-session
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: cookieConfig.secret,
      cookie: {
        httpOnly: true,
      },
    }),
  );

  // passport 관련
  app.use(passport.initialize());
  app.use(passport.session());

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

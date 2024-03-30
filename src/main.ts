import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformIntercepter } from './transform.intercepter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Application level - run validation pipe whenever encouter validation decorator
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformIntercepter());
  
  await app.listen(3000);
}
bootstrap();

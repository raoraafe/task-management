import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { TransformIntercepter } from './transform.intercepter';

async function bootstrap() {

  const logger = new Logger();

  const app = await NestFactory.create(AppModule);
  // Application level - run validation pipe whenever encouter validation decorator
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformIntercepter());
  
  const port = 3000;

  await app.listen(port);

  logger.log(`Application listening on port ${port}`)
}
bootstrap();

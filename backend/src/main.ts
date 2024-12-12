import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    // origin: process.env.FRONTEND_BASE_URL,
    origin: 'http://localhost:3000',
    credentials: true,
  });

  await app.listen(8080);
}
bootstrap();

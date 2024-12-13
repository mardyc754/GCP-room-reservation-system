import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(process.env.FRONTEND_BASE_URL);
  app.enableCors({
    origin: process.env.FRONTEND_BASE_URL,
    credentials: true,
  });

  await app.listen(8080);
}
bootstrap();

import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [process.env.FRONTEND_BASE_URL!],
    credentials: true,
  });
  app.use(cookieParser());

  await app.listen(8080);
}
bootstrap();

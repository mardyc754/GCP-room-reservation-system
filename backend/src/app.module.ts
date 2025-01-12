import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ZodValidationPipe } from 'nestjs-zod';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReservationModule } from './reservation/reservation.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './db/drizzle.module';
import { APP_PIPE } from '@nestjs/core';
import { RoomModule } from './room/room.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ReservationModule,
    ConfigModule.forRoot(),
    UserModule,
    DatabaseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        // connectionString: configService.get<string>('DATABASE_URL')!,
        // host: configService.get('DB_HOST')!,
        port: configService.get('DB_PORT') || 5432,
        user: configService.get('DB_USER')!,
        password: configService.get('DB_PASS')!,
        database: configService.get('DB_NAME')!,
      }),
    }),
    RoomModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    AppService,
  ],
})
export class AppModule {}

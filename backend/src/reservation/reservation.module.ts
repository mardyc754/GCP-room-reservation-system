import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, JwtModule],
  providers: [ReservationService],
  controllers: [ReservationController],
})
export class ReservationModule {}

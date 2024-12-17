import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from '@/schemas/reservation';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  getAllReservations() {
    return this.reservationService.getAllReservations();
  }

  @Get('user/:userId')
  getReservationsByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.reservationService.getReservationsByUserId(userId);
  }

  @Post()
  @HttpCode(201)
  createReservation(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationService.createReservation({
      ...createReservationDto,
      startDate: new Date(createReservationDto.startDate),
      endDate: new Date(createReservationDto.endDate),
    });
  }
}

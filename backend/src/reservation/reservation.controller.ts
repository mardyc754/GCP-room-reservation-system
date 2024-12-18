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
import { Reservation } from '@/db/schema';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  getAllReservations() {
    return this.reservationService.getAllReservations();
  }

  @Get(':id')
  getReservationById(@Param('id', ParseIntPipe) id: Reservation['id']) {
    return this.reservationService.getReservationById(id);
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

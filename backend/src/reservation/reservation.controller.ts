import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ReservationService } from './reservation.service';

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
}

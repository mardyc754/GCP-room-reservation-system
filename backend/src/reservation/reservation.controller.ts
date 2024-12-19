import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import {
  ChangeReservationDataDto,
  CreateReservationDto,
} from '@/schemas/reservation';
import { Reservation } from '@/db/schema';
import { AuthGuard } from '@/auth/auth.guard';

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

  @UseGuards(AuthGuard)
  @Get('user/:userId')
  getReservationsByUserId(
    @Req() req: { user: { id: Reservation['userId'] } },
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    if (userId != req.user.id) {
      throw new ForbiddenException('You can see only your own reservations');
    }

    return this.reservationService.getReservationsByUserId(userId);
  }

  @Get('room/:roomId')
  getReservationsByRoomId(@Param('roomId', ParseIntPipe) roomId: number) {
    return this.reservationService.getReservationsByRoomId(roomId);
  }

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(201)
  createReservation(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationService.createReservation({
      ...createReservationDto,
      startDate: new Date(createReservationDto.startDate),
      endDate: new Date(createReservationDto.endDate),
    });
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  updateReservation(
    @Req() req: { user: { id: Reservation['userId'] } },
    @Param('id', ParseIntPipe) id: Reservation['id'],
    @Body() changeReservationDataDto: ChangeReservationDataDto,
  ) {
    return this.reservationService.changeReservationData(id, req.user.id, {
      ...changeReservationDataDto,
      startDate: new Date(changeReservationDataDto.startDate),
      endDate: new Date(changeReservationDataDto.endDate),
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  cancelReservation(
    @Req() req: { user: { id: Reservation['userId'] } },
    @Param('id', ParseIntPipe) id: Reservation['id'],
  ) {
    return this.reservationService.cancelReservation(id, req.user.id);
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class ReservationService {
  getAllReservations() {
    return [
      {
        id: 1,
        name: 'John Doe',
        userId: 1,
        roomId: 1,
        startDate: new Date('2021-01-01T10:00:00Z'),
        endDate: new Date('2021-01-01T11:00:00Z'),
      },
      {
        id: 2,
        name: 'Jane Doe',
        userId: 2,
        roomId: 2,
        startDate: new Date('2021-01-01T11:00:00Z'),
        endDate: new Date('2021-01-01T12:00:00Z'),
      },
      {
        id: 3,
        name: 'John Smith',
        userId: 3,
        roomId: 1,
        startDate: new Date('2021-01-01T12:00:00Z'),
        endDate: new Date('2021-01-01T13:00:00Z'),
      },
    ];
  }

  getReservationsByUserId(userId: number) {
    return this.getAllReservations().filter(
      (reservation) => reservation.userId === userId,
    );
  }
}

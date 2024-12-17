import { DrizzleService } from '@/db/drizzle.service';
import { Reservation, reservations, rooms, users } from '@/db/schema';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

@Injectable()
export class ReservationService {
  constructor(private readonly drizzleService: DrizzleService) {}

  async getAllReservations() {
    // return [
    //   {
    //     id: 1,
    //     name: 'John Doe',
    //     userId: 1,
    //     roomId: 1,
    //     startDate: new Date('2021-01-01T10:00:00Z'),
    //     endDate: new Date('2021-01-01T11:00:00Z'),
    //   },
    //   {
    //     id: 2,
    //     name: 'Jane Doe',
    //     userId: 2,
    //     roomId: 2,
    //     startDate: new Date('2021-01-01T11:00:00Z'),
    //     endDate: new Date('2021-01-01T12:00:00Z'),
    //   },
    //   {
    //     id: 3,
    //     name: 'John Smith',
    //     userId: 3,
    //     roomId: 1,
    //     startDate: new Date('2021-01-01T12:00:00Z'),
    //     endDate: new Date('2021-01-01T13:00:00Z'),
    //   },
    // ];

    return await this.drizzleService.db.select().from(reservations);
  }

  getReservationsByUserId(userId: Reservation['userId']) {
    return this.drizzleService.db
      .select({
        id: reservations.id,
        name: reservations.name,
        userId: reservations.userId,
        roomId: reservations.roomId,
        startDate: reservations.startDate,
        endDate: reservations.endDate,
        username: users.username,
        roomName: rooms.name,
      })
      .from(reservations)
      .where(eq(reservations.userId, userId))
      .fullJoin(users, eq(reservations.userId, users.id))
      .fullJoin(rooms, eq(reservations.roomId, rooms.id));
  }

  getReservationsByRoomId(roomId: Reservation['roomId']) {
    return this.drizzleService.db
      .select({
        id: reservations.id,
        roomId: reservations.roomId,
        startDate: reservations.startDate,
        endDate: reservations.endDate,
        roomName: rooms.name,
      })
      .from(reservations)
      .where(eq(reservations.roomId, roomId))
      .fullJoin(rooms, eq(reservations.roomId, rooms.id));
  }

  async createReservation(data: Omit<Reservation, 'id'>) {
    const result = await this.drizzleService.db
      .insert(reservations)
      .values(data)
      .returning();

    return result[0];
  }
}

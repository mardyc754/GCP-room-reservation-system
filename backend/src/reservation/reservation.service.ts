import { DrizzleService } from '@/db/drizzle.service';
import { Reservation, reservations, rooms, users } from '@/db/schema';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

@Injectable()
export class ReservationService {
  constructor(private readonly drizzleService: DrizzleService) {}

  async getAllReservations() {
    return await this.drizzleService.db.select().from(reservations);
  }

  async getReservationsByUserId(userId: Reservation['userId']) {
    return await this.drizzleService.db
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

  async getReservationsByRoomId(roomId: Reservation['roomId']) {
    return await this.drizzleService.db
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

  async getReservationById(id: Reservation['id']) {
    const result = await this.drizzleService.db
      .select({
        id: reservations.id,
        name: reservations.name,
        roomId: reservations.roomId,
        startDate: reservations.startDate,
        endDate: reservations.endDate,
        roomName: rooms.name,
        username: users.username,
        userId: users.id,
      })
      .from(reservations)
      .where(eq(reservations.id, id))
      .fullJoin(users, eq(reservations.userId, users.id))
      .fullJoin(rooms, eq(reservations.roomId, rooms.id));

    return result[0];
  }

  async createReservation(data: Omit<Reservation, 'id'>) {
    const result = await this.drizzleService.db
      .insert(reservations)
      .values(data)
      .returning();

    return result[0];
  }

  async changeReservationData(
    id: Reservation['id'],
    data: Partial<Omit<Reservation, 'id'>>,
  ) {
    const result = await this.drizzleService.db
      .update(reservations)
      .set(data)
      .where(eq(reservations.id, id))
      .returning();

    return result[0];
  }
}

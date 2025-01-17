import { ForbiddenException, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NotFoundException } from '@nestjs/common';

import { DrizzleService } from '@/db/drizzle.service';
import { Reservation, reservations, rooms, users } from '@/db/schema';
import { PubSubService } from '@/pubsub/pubsub.service';
import { formatDate } from '@/utils/formatDate';

@Injectable()
export class ReservationService {
  constructor(
    private readonly drizzleService: DrizzleService,
    private readonly pubsubService: PubSubService,
  ) {}

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
        name: reservations.name,
        roomId: reservations.roomId,
        startDate: reservations.startDate,
        endDate: reservations.endDate,
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

    const createdReservation = result[0];

    const userData = await this.drizzleService.db
      .select({
        email: users.email,
      })
      .from(users)
      .where(eq(users.id, createdReservation.userId));

    await this.pubsubService.publishMessage({
      to: userData[0].email,
      subject: 'Reservation created',
      message: `Your reservation ${createdReservation.name} for room ${data.roomId}  has been created. It starts at ${formatDate(createdReservation.startDate)} and ends at ${formatDate(createdReservation.endDate)}`,
    });

    return createdReservation;
  }

  async changeReservationData(
    id: Reservation['id'],
    userId: Reservation['userId'],
    data: Partial<Omit<Reservation, 'id'>>,
  ) {
    const result = (
      await this.drizzleService.db
        .select()
        .from(reservations)
        .where(eq(reservations.id, id))
    )[0];

    if (result.userId != userId) {
      throw new ForbiddenException('You can only update your own reservations');
    }

    const updated = (
      await this.drizzleService.db
        .update(reservations)
        .set(data)
        .where(eq(reservations.id, id))
        .returning()
    )[0];

    const userAndReservationData = await this.drizzleService.db
      .select({
        email: users.email,
        reservationName: reservations.name,
        startDate: reservations.startDate,
        endDate: reservations.endDate,
      })
      .from(users)
      .where(eq(reservations.id, updated.id))
      .fullJoin(reservations, eq(reservations.userId, users.id));

    if (
      !userAndReservationData[0].email ||
      !userAndReservationData[0].reservationName ||
      !userAndReservationData[0].startDate ||
      !userAndReservationData[0].endDate
    ) {
      throw new NotFoundException('User or reservation data not found');
    }

    await this.pubsubService.publishMessage({
      to: userAndReservationData[0].email,
      subject: 'Reservation updated',
      message:
        `The reservation ${userAndReservationData[0].reservationName} for room ${data.roomId} has been updated.` +
        `\n Now, It starts at ${formatDate(userAndReservationData[0].startDate)} and ends at ${formatDate(userAndReservationData[0].endDate)}`,
    });

    return updated;
  }

  async cancelReservation(
    id: Reservation['id'],
    userId: Reservation['userId'],
  ) {
    const result = (
      await this.drizzleService.db
        .select()
        .from(reservations)
        .where(eq(reservations.id, id))
    )[0];

    if (result.userId !== userId) {
      throw new Error('You can only cancel your own reservations');
    }

    const userAndReservationData = await this.drizzleService.db
      .select({
        email: users.email,
        reservationName: reservations.name,
      })
      .from(users)
      .where(eq(reservations.id, id))
      .fullJoin(reservations, eq(reservations.userId, users.id));

    const deleted = (
      await this.drizzleService.db
        .delete(reservations)
        .where(eq(reservations.id, id))
        .returning()
    )[0];

    if (
      !userAndReservationData[0].email ||
      !userAndReservationData[0].reservationName
    ) {
      throw new NotFoundException('User or reservation data not found');
    }

    await this.pubsubService.publishMessage({
      to: userAndReservationData[0].email,
      subject: 'Reservation canceled',
      message: `The reservation ${userAndReservationData[0].reservationName} has been canceled.`,
    });

    return deleted;
  }
}

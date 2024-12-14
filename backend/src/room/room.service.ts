import { DrizzleService } from '@/db/drizzle.service';
import { rooms } from '@/db/schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomService {
  constructor(private readonly drizzleService: DrizzleService) {}

  async getAllRooms() {
    return await this.drizzleService.db.select().from(rooms);
  }
}

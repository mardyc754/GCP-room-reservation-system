import { eq } from 'drizzle-orm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { databaseSchema } from '@/db/schema';
import { DrizzleService } from '@/db/drizzle.service';

@Injectable()
export class UserService {
  constructor(private readonly drizzleService: DrizzleService) {}

  async createUser(email: string, password: string, username: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const users = await this.drizzleService.db
        .insert(databaseSchema.users)
        .values({
          email,
          password: hashedPassword,
          username,
        })
        .returning();

      return {
        id: users[0].id,
        email: users[0].email,
        username: users[0].username,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        'User with this email or username already exists',
      );
    }
  }

  async getUserById(id: number) {
    const user = await this.drizzleService.db
      .select()
      .from(databaseSchema.users)
      .where(eq(databaseSchema.users.id, id))
      .execute();

    if (user.length === 0) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user[0].id,
      email: user[0].email,
      username: user[0].username,
    };
  }

  async getUserByEmail(email: string) {
    const user = await this.drizzleService.db
      .select()
      .from(databaseSchema.users)
      .where(eq(databaseSchema.users.email, email))
      .execute();

    if (user.length === 0) {
      throw new NotFoundException('User not found');
    }

    return user[0];
  }
}

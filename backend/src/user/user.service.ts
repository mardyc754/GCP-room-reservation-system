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

    return await this.drizzleService.db.insert(databaseSchema.users).values({
      email,
      password: hashedPassword,
      username,
    });
  }

  async login(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.drizzleService.db
      .select()
      .from(databaseSchema.users)
      .where(eq(databaseSchema.users.email, email));

    if (user.length === 0) {
      throw new BadRequestException('Invalid username or password');
    }

    bcrypt.compare(hashedPassword, user[0].password, (err, result) => {
      if (result) {
        return {
          id: user[0].id,
          email: user[0].email,
          username: user[0].username,
        };
      } else {
        throw new BadRequestException('Invalid username or password');
      }
    });
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
}

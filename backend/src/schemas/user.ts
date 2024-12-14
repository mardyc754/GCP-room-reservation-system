import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export class CreateUserDto extends createZodDto(
  userSchema.omit({ id: true }),
) {}

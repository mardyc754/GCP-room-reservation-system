import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createReservationSchema = z.object({
  name: z.string().nonempty(),
  roomId: z.number().int(),
  userId: z.number().int(),
  startDate: z.string().transform((date) => new Date(date).toISOString()),
  endDate: z.string().transform((date) => new Date(date).toISOString()),
});

export type CreateReservationData = z.infer<typeof createReservationSchema>;

export class CreateReservationDto extends createZodDto(
  createReservationSchema,
) {}

export const changeReservationDataSchema = z.object({
  name: z.string().nonempty(),
  roomId: z.number().int(),
  userId: z.number().int(),
  startDate: z.string().transform((date) => new Date(date).toISOString()),
  endDate: z.string().transform((date) => new Date(date).toISOString()),
});

export type ChangeReservationData = z.infer<typeof createReservationSchema>;

export class ChangeReservationDataDto extends createZodDto(
  changeReservationDataSchema,
) {}

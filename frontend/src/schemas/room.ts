import { z } from "zod";

export const roomSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type Room = z.infer<typeof roomSchema>;

export const roomWithReservationsSchema = z.object({
  ...roomSchema.shape,
  reservations: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      startDate: z.string(),
      endDate: z.string(),
    })
  ),
});

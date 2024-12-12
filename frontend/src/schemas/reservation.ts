import { z } from "zod";

export const reservationSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  userId: z.number().int(),
  roomId: z.number().int(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
});

export type Reservation = z.infer<typeof reservationSchema>;

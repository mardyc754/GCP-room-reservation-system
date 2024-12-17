import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { isAfterOrSame } from "@/utils/dateUtils";

export const reservationSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  userId: z.number().int(),
  roomId: z.number().int(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
});

export type Reservation = z.infer<typeof reservationSchema>;

export const fullReservationSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  userId: z.number().int(),
  roomId: z.number().int(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  username: z.string(),
  roomName: z.string(),
});

export type FullReservationData = z.infer<typeof fullReservationSchema>;

export const createReservationSchema = z
  .object({
    name: z.string().nonempty(),
    startDate: z.string().transform((date) => new Date(date).toISOString()),
    endDate: z.string().transform((date) => new Date(date).toISOString()),
  })
  .refine(
    (data) => {
      return isAfterOrSame(new Date(data.endDate), new Date(data.startDate));
    },
    { message: "End date should occur after start date" }
  );

export type CreateReservationData = z.infer<typeof createReservationSchema>;

export const createReservationResolver = zodResolver(createReservationSchema);

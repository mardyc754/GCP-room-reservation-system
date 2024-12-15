import { reservationSchema } from "@/schemas/reservation";
import { customFetch } from "./fetchConfig";

export const getReservationsByUserId = async (userId: number) => {
  return await customFetch(
    `reservations/user/${userId}`,
    reservationSchema.array()
  );
};

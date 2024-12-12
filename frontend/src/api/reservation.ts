import { reservationSchema } from "@/schemas/reservation";

export const getReservationsByUserId = async (userId: number) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/reservations/user/${userId}`
  );

  const res = reservationSchema.array().parse(await response.json());

  return res;
};

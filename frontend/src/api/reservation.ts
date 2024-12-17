import {
  CreateReservationData,
  fullReservationSchema,
  reservationSchema,
} from "@/schemas/reservation";
import { customFetch } from "./fetchConfig";
import { Room } from "@/schemas/room";
import { User } from "@/schemas/auth";

export const getReservationsByUserId = async (userId: number) => {
  return await customFetch(
    `reservations/user/${userId}`,
    fullReservationSchema.array()
  );
};

export const createReservation = async (
  data: CreateReservationData & { roomId: Room["id"]; userId: User["id"] }
) => {
  return await customFetch("reservations", reservationSchema, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

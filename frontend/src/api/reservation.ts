import {
  ChangeReservationData,
  CreateReservationData,
  fullReservationSchema,
  Reservation,
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

export const getReservationById = async (reservationId: Reservation["id"]) => {
  return await customFetch(
    `reservations/${reservationId}`,
    fullReservationSchema
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

export const changeReservationData = async (
  reservationId: Reservation["id"],
  data: ChangeReservationData
) => {
  return await customFetch(
    `reservations/${reservationId}`,
    fullReservationSchema,
    {
      method: "PUT",
      body: JSON.stringify(data),
    }
  );
};

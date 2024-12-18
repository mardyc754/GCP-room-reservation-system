import {
  ChangeReservationData,
  CreateReservationData,
  fullReservationSchema,
  Reservation,
  reservationSchema,
} from "@/schemas/reservation";
import { Room } from "@/schemas/room";
import { User } from "@/schemas/auth";

import { customFetch } from "./fetchConfig";

export const getReservationsByUserId = async (userId: number) => {
  return await customFetch(
    `reservations/user/${userId}`,
    fullReservationSchema.array(),
    {
      credentials: "include",
    }
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
    credentials: "include",
  });
};

export const changeReservationData = async (
  reservationId: Reservation["id"],
  data: ChangeReservationData
) => {
  return await customFetch(`reservations/${reservationId}`, reservationSchema, {
    method: "PUT",
    body: JSON.stringify(data),
    credentials: "include",
  });
};

// TODO: not sure if should be deleted or its status should be changed to cancelled
export const cancelReservation = async (reservationId: Reservation["id"]) => {
  return await customFetch(`reservations/${reservationId}`, reservationSchema, {
    method: "DELETE",
    credentials: "include",
  });
};

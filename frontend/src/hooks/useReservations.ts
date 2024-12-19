import { useQuery } from "@tanstack/react-query";

import { Reservation } from "@/schemas/reservation";
import { User } from "@/schemas/auth";
import { Room } from "@/schemas/room";

import { reservation } from "@/constants/queryKeys";

import {
  getReservationById,
  getReservationsByRoomId,
  getReservationsByUserId,
} from "@/api/reservation";

export const useReservations = (userId: User["id"]) =>
  useQuery({
    queryKey: reservation.user(userId),
    queryFn: async () => await getReservationsByUserId(userId),
  });

export const useReservation = (reservationId: Reservation["id"]) =>
  useQuery({
    queryKey: reservation.byId(reservationId),
    queryFn: async () => await getReservationById(reservationId),
  });

export const useReservationsByRoomId = (roomId: Room["id"]) =>
  useQuery({
    queryKey: reservation.room(roomId),
    queryFn: async () => await getReservationsByRoomId(roomId),
  });

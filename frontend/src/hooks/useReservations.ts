import { useQuery } from "@tanstack/react-query";

import { Reservation } from "@/schemas/reservation";
import { User } from "@/schemas/auth";

import { getReservationById, getReservationsByUserId } from "@/api/reservation";

import { reservation } from "@/constants/queryKeys";

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

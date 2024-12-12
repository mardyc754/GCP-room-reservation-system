import { useQuery } from "@tanstack/react-query";

import { getReservationsByUserId } from "@/api/reservation";

import { reservation } from "@/constants/queryKeys";

export const useReservations = (userId: number) =>
  useQuery({
    queryKey: reservation.user(userId),
    queryFn: async () => await getReservationsByUserId(userId),
  });

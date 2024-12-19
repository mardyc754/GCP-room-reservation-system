import { findConflictingReservation } from "@/utils/reservationUtils";
import { useReservationsByRoomId } from "./useReservations";
import { Room } from "@/schemas/room";
import { FieldErrors, FieldValues } from "react-hook-form";
import { useMemo } from "react";

type UseConflictingReservationsOptions<T extends FieldValues> = {
  startDate: string;
  endDate: string;
  roomId: Room["id"];
  errors: FieldErrors<T>;
};

export const useConflictingReservations = <T extends FieldValues>({
  startDate,
  endDate,
  roomId,
  errors,
}: UseConflictingReservationsOptions<T>) => {
  const { data: exisingReservations, isLoading } =
    useReservationsByRoomId(roomId);

  const conflictingReservation = findConflictingReservation(
    startDate,
    endDate,
    exisingReservations ?? []
  );

  const disableSubmitButton = useMemo(() => {
    return (
      isLoading || !!conflictingReservation || Object.keys(errors).length > 0
    );
  }, [isLoading, conflictingReservation, errors]);

  return {
    conflictingReservation,
    isLoading,
    disableSubmitButton,
  };
};

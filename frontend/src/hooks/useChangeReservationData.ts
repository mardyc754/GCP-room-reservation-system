import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { changeReservationData } from "@/api/reservation";
import { reservation } from "@/constants/queryKeys";
import {
  ChangeReservationData,
  changeReservationDataResolver,
  Reservation,
} from "@/schemas/reservation";
import { Room } from "@/schemas/room";

import { useCurrentUser } from "./auth";

type UseChangeReservationDataOptions = {
  selectedRoomId: Room["id"];
  reservationId: Reservation["id"];
};

export const useChangeReservationData = ({
  selectedRoomId,
  reservationId,
}: UseChangeReservationDataOptions) => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const { data: currentUserData } = useCurrentUser();

  const methods = useForm<ChangeReservationData>({
    resolver: changeReservationDataResolver,
  });

  const { handleSubmit, getValues } = methods;

  const mutation = useMutation({
    mutationFn: () =>
      changeReservationData(reservationId, {
        ...getValues(),
        roomId: selectedRoomId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: reservation.user(currentUserData!.id!),
      });
      navigate("/reservations");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = handleSubmit(() => {
    mutation.mutate();
  });

  return {
    ...methods,
    onSubmit,
  };
};

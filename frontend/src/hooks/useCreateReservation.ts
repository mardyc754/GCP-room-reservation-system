import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createReservation } from "@/api/reservation";
import { reservation } from "@/constants/queryKeys";
import {
  CreateReservationData,
  createReservationResolver,
} from "@/schemas/reservation";
import { Room } from "@/schemas/room";

import { useCurrentUser } from "./auth";

type UseCreateReservationOptions = {
  selectedRoom: Room;
};

export const useCreateReservation = ({
  selectedRoom,
}: UseCreateReservationOptions) => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const { data: currentUserData } = useCurrentUser();
  const methods = useForm<CreateReservationData>({
    resolver: createReservationResolver,
  });

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = methods;

  const mutation = useMutation({
    mutationFn: () =>
      createReservation({
        ...watch(),
        roomId: selectedRoom.id,
        userId: currentUserData!.id!,
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

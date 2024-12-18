import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { changeReservationData } from "@/api/reservation";
import { reservation } from "@/constants/queryKeys";
import {
  ChangeReservationData,
  changeReservationDataResolver,
  FullReservationData,
} from "@/schemas/reservation";

import { useCurrentUser } from "./auth";
import { formatDateTime } from "@/utils/dateUtils";

type UseChangeReservationDataOptions = {
  reservationData: FullReservationData;
};

export const useChangeReservationData = ({
  reservationData,
}: UseChangeReservationDataOptions) => {
  const queryClient = useQueryClient();

  const {
    id: reservationId,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    username,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    roomName,
    ...initialFormData
  } = reservationData;

  const navigate = useNavigate();
  const { data: currentUserData } = useCurrentUser();

  const methods = useForm<ChangeReservationData>({
    resolver: changeReservationDataResolver,
    defaultValues: {
      ...initialFormData,
      startDate: formatDateTime(new Date(initialFormData.startDate)),
      endDate: formatDateTime(new Date(initialFormData.endDate)),
    },
  });

  const { handleSubmit, getValues } = methods;

  const mutation = useMutation({
    mutationFn: () =>
      changeReservationData(reservationId, {
        ...getValues(),
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

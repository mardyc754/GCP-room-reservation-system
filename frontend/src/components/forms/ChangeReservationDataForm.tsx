import { endOfDay } from "@/utils/dateUtils";

import { FullReservationData, Reservation } from "@/schemas/reservation";

import { Button } from "../Button";
import { LabelWithInput } from "../LabelWithInput";
import { useChangeReservationData } from "@/hooks/useChangeReservationData";
import { useReservation } from "@/hooks/useReservations";

type ChangeReservationDataFormProps = {
  // data: FullReservationData;
  reservationId: Reservation["id"];
};

type ChangeReservationDataFormContentProps = {
  // data: FullReservationData;
  data: FullReservationData;
};

const ChangeReservationDataFormContent = ({
  data,
}: ChangeReservationDataFormContentProps) => {
  const {
    register,
    getValues,
    onSubmit,
    formState: { errors },
  } = useChangeReservationData({
    selectedRoomId: data.roomId,
    reservationId: data.id,
  });

  return (
    <>
      <div className="flex w-full justify-between items-center">
        <p>{data.roomName}</p>
      </div>
      <h2 className="text-2xl">New reservation data:</h2>
      <form className="flex flex-col space-y-4" onSubmit={onSubmit}>
        <LabelWithInput
          label="Name"
          inputProps={{
            ...register("name", { required: true }),
            defaultValue: data.name,
          }}
          errorLabel={errors.name?.message}
        />
        <LabelWithInput
          label="Start date"
          inputProps={{
            ...register("startDate", { required: true }),
            type: "datetime-local",
            defaultValue: data.startDate,
          }}
          errorLabel={errors.startDate?.message}
        />
        <LabelWithInput
          label="End date"
          inputProps={{
            ...register("endDate", { required: true }),
            type: "datetime-local",
            max: endOfDay(getValues("startDate")).toISOString(),
            defaultValue: data.endDate,
          }}
          errorLabel={errors.endDate?.message}
        />
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
};

export const ChangeReservationDataForm = ({
  reservationId,
}: ChangeReservationDataFormProps) => {
  const { data, isLoading } = useReservation(reservationId);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return data && <ChangeReservationDataFormContent data={data} />;
};

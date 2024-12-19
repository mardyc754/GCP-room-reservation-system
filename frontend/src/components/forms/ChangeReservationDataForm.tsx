import {
  advanceByMinutes,
  endOfDay,
  formatDateTime,
  nextDay,
} from "@/utils/dateUtils";

import { FullReservationData, Reservation } from "@/schemas/reservation";

import { Button } from "../Button";
import { LabelWithInput } from "../LabelWithInput";
import { useChangeReservationData } from "@/hooks/useChangeReservationData";
import { useReservation } from "@/hooks/useReservations";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useConflictingReservations } from "@/hooks/useConflictingReservations";
import { ConflictingReservationInfo } from "../ConflictingReservationInfo";

type ChangeReservationDataFormProps = {
  reservationId: Reservation["id"];
};

type ChangeReservationDataFormContentProps = {
  data: FullReservationData;
};

const ChangeReservationDataFormContent = ({
  data,
}: ChangeReservationDataFormContentProps) => {
  const {
    register,
    onSubmit,
    watch,
    formState: { errors },
  } = useChangeReservationData({ reservationData: data });

  const { conflictingReservation, disableSubmitButton } =
    useConflictingReservations({
      startDate: watch("startDate"),
      endDate: watch("endDate"),
      roomId: data.roomId,
      errors,
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h1 className="text-2xl">{`Change reservation with id=${data.id} for the ${data.roomName}`}</h1>
        </CardTitle>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent>
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
              min: formatDateTime(nextDay(new Date())),
            }}
            errorLabel={errors.startDate?.message}
          />
          <LabelWithInput
            label="End date"
            inputProps={{
              ...register("endDate", { required: true }),
              type: "datetime-local",
              min: formatDateTime(
                advanceByMinutes(new Date(watch("startDate")), 30)
              ),
              max: formatDateTime(endOfDay(new Date(watch("startDate")))),
            }}
            errorLabel={errors.endDate?.message}
          />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            type="submit"
            className="w-full"
            disabled={disableSubmitButton}
          >
            Submit
          </Button>
          {conflictingReservation && (
            <ConflictingReservationInfo data={conflictingReservation} />
          )}
          <Button className="w-full bg-black">
            <a href="/reservations">Cancel</a>
          </Button>
        </CardFooter>
      </form>
    </Card>
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

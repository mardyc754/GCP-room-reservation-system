import { Room } from "@/schemas/room";

import { useConflictingReservations } from "@/hooks/useConflictingReservations";
import { useCreateReservation } from "@/hooks/useCreateReservation";
import { endOfDay, formatDateTime } from "@/utils/dateUtils";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../Button";
import { LabelWithInput } from "../LabelWithInput";
import { ConflictingReservationInfo } from "../ConflictingReservationInfo";

type SelectDateFormProps = {
  selectedRoom: Room;
  onReturn: () => void;
};

export const SelectDateForm = ({
  selectedRoom,
  onReturn,
}: SelectDateFormProps) => {
  const {
    register,
    onSubmit,
    watch,
    formState: { errors },
  } = useCreateReservation({ selectedRoom });

  const { conflictingReservation, disableSubmitButton, isLoading } =
    useConflictingReservations({
      startDate: watch("startDate"),
      endDate: watch("endDate"),
      roomId: selectedRoom.id,
      errors,
    });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <h1 className="text-2xl">{`Create a reservation for the ${selectedRoom.name}`}</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Loading...</p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full bg-black" onClick={onReturn}>
            Return
          </Button>
        </CardFooter>
      </Card>
    );
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h1 className="text-2xl">{`Create a reservation for the ${selectedRoom.name}`}</h1>
        </CardTitle>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent>
          <LabelWithInput
            label="Name"
            inputProps={{
              ...register("name", { required: true }),
            }}
            errorLabel={errors.name?.message}
          />
          <LabelWithInput
            label="Start date"
            inputProps={{
              ...register("startDate", { required: true }),
              type: "datetime-local",
            }}
            errorLabel={errors.startDate?.message}
          />
          <LabelWithInput
            label="End date"
            inputProps={{
              ...register("endDate", { required: true }),
              type: "datetime-local",
              max: formatDateTime(endOfDay(watch("startDate"))),
            }}
            errorLabel={errors.endDate?.message}
          />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            className="w-full"
            type="submit"
            disabled={disableSubmitButton}
          >
            Submit
          </Button>
          {conflictingReservation && (
            <ConflictingReservationInfo data={conflictingReservation} />
          )}
          <Button className="w-full bg-black" onClick={onReturn}>
            Return
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

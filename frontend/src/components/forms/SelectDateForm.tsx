import { Room } from "@/schemas/room";

import { useCreateReservation } from "@/hooks/useCreateReservation";

import { Button } from "../Button";
import { LabelWithInput } from "../LabelWithInput";
import { endOfDay, formatDateTime } from "@/utils/dateUtils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

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
    getValues,
    formState: { errors },
  } = useCreateReservation({ selectedRoom });

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
              max: formatDateTime(endOfDay(getValues("startDate"))),
            }}
            errorLabel={errors.endDate?.message}
          />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full" type="submit">
            Submit
          </Button>
          <Button className="w-full bg-black" onClick={onReturn}>
            Return
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

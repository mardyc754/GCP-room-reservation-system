import { Room } from "@/schemas/room";

import { useCreateReservation } from "@/hooks/useCreateReservation";

import { Button } from "../Button";
import { LabelWithInput } from "../LabelWithInput";
import { endOfDay } from "@/utils/dateUtils";

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
    <>
      <div className="flex w-full justify-between items-center">
        <p>Selected room: {selectedRoom.name}</p>
        <Button onClick={onReturn}>Return</Button>
      </div>
      <h2 className="text-2xl">Select date:</h2>
      <form className="flex flex-col space-y-4" onSubmit={onSubmit}>
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
            max: endOfDay(getValues("startDate")).toISOString(),
          }}
          errorLabel={errors.endDate?.message}
        />
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
};

import { Reservation } from "@/schemas/reservation";
import { displayDatesAsFullTimeslot } from "@/utils/dateUtils";

type ConflictingReservationInfoProps = {
  data: Omit<Reservation, "userId">;
};

export const ConflictingReservationInfo = ({
  data,
}: ConflictingReservationInfoProps) => {
  return (
    <p className="text-red-500">
      There is a conflicting reservation from{" "}
      {displayDatesAsFullTimeslot(data.startDate, data.endDate)}
    </p>
  );
};

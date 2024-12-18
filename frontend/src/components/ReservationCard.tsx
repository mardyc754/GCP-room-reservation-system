import { useCancelReservationData } from "@/hooks/useCancelReservation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FullReservationData } from "@/schemas/reservation";
import {
  displayDatesAsTimeslot,
  extractDateStringFromDate,
} from "@/utils/dateUtils";

import { Separator } from "./ui/separator";
import { Button } from "./Button";

type ReservationCardProps = {
  data: FullReservationData;
};

export const ReservationCard = ({ data }: ReservationCardProps) => {
  const { name, startDate, endDate, roomName, id } = data;

  const { mutate: cancelReservation } = useCancelReservationData({
    reservationId: id,
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{roomName}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-2">
        <Separator />
        <p className="font-semibold">{extractDateStringFromDate(startDate)}</p>
        <p>{displayDatesAsTimeslot(startDate, endDate)}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button>
          <a href={`reservations/${id}`}>Change data</a>
        </Button>
        <Button className="bg-black" onClick={() => cancelReservation()}>
          Cancel reservation
        </Button>
      </CardFooter>
    </Card>
  );
};

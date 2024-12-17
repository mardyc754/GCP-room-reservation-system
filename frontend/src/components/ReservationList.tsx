import { useReservations } from "@/hooks/useReservations";
import { User } from "@/schemas/auth";
import { ReservationCard } from "./ReservationCard";

type ReservationListProps = {
  userId: User["id"];
};

export const ReservationList = ({ userId }: ReservationListProps) => {
  const { data: reservations, isLoading } = useReservations(userId);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col space-y-4">
      {reservations?.map((reservation) => (
        <ReservationCard key={reservation.id} data={reservation} />
      ))}
    </div>
  );
};

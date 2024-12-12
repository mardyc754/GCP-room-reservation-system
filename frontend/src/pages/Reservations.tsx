import { useReservations } from "@/hooks/useReservations";

export const Reservations = () => {
  const { data } = useReservations(1);

  return (
    <div className="flex flex-col items-center p-8 space-y-8">
      <h1 className="text-4xl">Your reservations</h1>
      <div className="flex flex-col space-y-4">
        {data?.map((reservation) => (
          <div key={reservation.id} className="flex flex-col space-y-2">
            <span>{reservation.name}</span>
            <span>{new Date(reservation.startDate).toString()}</span>
            <span>{new Date(reservation.endDate).toString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

import { useRooms } from "@/hooks/useRooms";
import { Button } from "./Button";

export const ReservationForm = () => {
  const { data, isLoading } = useRooms();

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl">Select room:</h2>
      <div className="flex flex-col space-y-4">
        {isLoading && <p>Loading...</p>}
        {data?.map((room) => (
          <Button key={room.id}>{room.name}</Button>
        ))}
      </div>
    </div>
  );
};

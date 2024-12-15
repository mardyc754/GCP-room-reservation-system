import { useState } from "react";

import { useRooms } from "@/hooks/useRooms";

import { Button } from "./Button";
import { Room } from "@/schemas/room";

export const ReservationForm = () => {
  const { data, isLoading } = useRooms();
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  return (
    <div className="flex flex-col space-y-4">
      {!selectedRoom ? (
        <>
          <h2 className="text-2xl">Select a room:</h2>
          <div className="flex flex-col space-y-4">
            {isLoading && <p>Loading...</p>}
            {data?.map((room) => (
              <Button key={room.id} onClick={() => setSelectedRoom(room)}>
                {room.name}
              </Button>
            ))}
          </div>
        </>
      ) : (
        <>
          <p>Selected room: {selectedRoom.name}</p>
          <Button onClick={() => setSelectedRoom(null)}>Return</Button>
          <h2 className="text-2xl">Select date:</h2>
          <div className="flex flex-col space-y-4"></div>
        </>
      )}
    </div>
  );
};

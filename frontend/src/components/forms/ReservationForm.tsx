import { useState } from "react";

import { useRooms } from "@/hooks/useRooms";
import { Room } from "@/schemas/room";

import { Button } from "../Button";
import { SelectDateForm } from "./SelectDateForm";

export const ReservationForm = () => {
  const { data, isLoading } = useRooms();
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  return (
    <div className="flex flex-col space-y-4">
      {!selectedRoom ? (
        <>
          <h1 className="text-2xl">Select a room:</h1>
          <div className="grid grid-cols-3 gap-4">
            {isLoading && <p>Loading...</p>}
            {data?.map((room) => (
              <Button key={room.id} onClick={() => setSelectedRoom(room)}>
                {room.name}
              </Button>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col space-y-4 items-center justify-center">
          <SelectDateForm
            selectedRoom={selectedRoom}
            onReturn={() => setSelectedRoom(null)}
          />
        </div>
      )}
    </div>
  );
};

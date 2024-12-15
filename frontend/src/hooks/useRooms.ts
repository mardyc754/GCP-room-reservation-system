import { useQuery } from "@tanstack/react-query";

import { getAllRooms } from "@/api/room";
import { room } from "@/constants/queryKeys";

export const useRooms = () => {
  return useQuery({
    queryKey: room.all,
    queryFn: getAllRooms,
  });
};

export const useRoomById = (roomId: number) => {
  return useQuery({
    queryKey: room.byId(roomId),
    queryFn: async () => {
      const rooms = await getAllRooms();
      return rooms.find((room) => room.id === roomId);
    },
  });
};

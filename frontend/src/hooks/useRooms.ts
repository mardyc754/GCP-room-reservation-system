import { useQuery } from "@tanstack/react-query";

import { getAllRooms } from "@/api/room";
import { room } from "@/constants/queryKeys";

export const useRooms = () => {
  return useQuery({
    queryKey: room.all,
    queryFn: getAllRooms,
  });
};

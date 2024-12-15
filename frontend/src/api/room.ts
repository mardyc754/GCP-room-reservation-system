import { roomSchema, roomWithReservationsSchema } from "@/schemas/room";

import { customFetch } from "./fetchConfig";

export const getAllRooms = async () => {
  return await customFetch("rooms", roomSchema.array());
};

export const getRoomById = async (roomId: number) => {
  return await customFetch(`rooms/${roomId}`, roomWithReservationsSchema);
};

import { roomSchema } from "@/schemas/room";

import { customFetch } from "./fetchConfig";

export const getAllRooms = async () => {
  return await customFetch("rooms", roomSchema.array());
};

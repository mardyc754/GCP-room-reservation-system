export const reservation = {
  all: ["reservation"] as const,
  user: (userId: number) => [...reservation.all, "user", `${userId}`] as const,
  byId: (reservationId: number) =>
    [...reservation.all, "id", `${reservationId}`] as const,
  room: (roomId: number) => [...reservation.all, "room", `${roomId}`] as const,
};

export const room = {
  all: ["room"] as const,
  byId: (roomId: number) => [...room.all, "id", `${roomId}`] as const,
};

export const user = {
  all: ["user"] as const,
  current: () => [...user.all, "current"] as const,
};

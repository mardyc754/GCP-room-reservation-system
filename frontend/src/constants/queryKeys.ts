export const reservation = {
  all: ["reservation"] as const,
  user: (userId: number) => [...reservation.all, "user", `${userId}`] as const,
};

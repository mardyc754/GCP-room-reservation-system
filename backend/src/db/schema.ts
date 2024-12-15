//schema.ts
import { pgTable, serial, timestamp, text, integer } from 'drizzle-orm/pg-core';
import { InferSelectModel } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  username: text('username').notNull().unique(),
});

export const rooms = pgTable('rooms', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export const reservations = pgTable('reservations', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  roomId: integer('room_id')
    .notNull()
    .references(() => rooms.id, {
      onDelete: 'cascade',
      onUpdate: 'no action',
    }),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, {
      onDelete: 'cascade',
      onUpdate: 'no action',
    }),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
});

export type User = InferSelectModel<typeof users>;
export type Room = InferSelectModel<typeof rooms>;
export type Reservation = InferSelectModel<typeof reservations>;

export const databaseSchema = {
  users,
  rooms,
  reservations,
};

import "dotenv/config";
import { PubSub } from "@google-cloud/pubsub";
import pkg from "pg";

const pubSubClient = new PubSub();

export const dailyReminder = async () => {
  try {
    const { Pool } = pkg;

    const pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASS,
      port: process.env.DB_PORT,
    });

    const client = await pool.connect();

    const [rows] = await client.execute(
      "SELECT * FROM reservations WHERE startDate = $1 JOIN users ON reservations.userId = users.id",
      [new Date().getHours()]
    );

    console.log("Number of reservations: ", rows.length);

    const reservations = rows.map((row) => {
      return {
        id: row.id,
        userId: row.userId,
        startDate: row.startDate,
        endDate: row.endDate,
        user: {
          id: row.userId,
          name: row.name,
          email: row.email,
        },
      };
    });

    for (const reservation of reservations) {
      const message = {
        to: reservation.user.email,
        subject: "Daily Reminder",
        message: `Hello ${reservation.user.name}, your reservation is scheduled to start at ${reservation.startDate} and end at ${reservation.endDate}.`,
      };

      const dataBuffer = Buffer.from(JSON.stringify(message));
      await pubSubClient
        .topic("send-email")
        .publishMessage({ data: dataBuffer });
    }
    console.log("Number of emails sent: ", reservations.length);
  } catch (error) {
    console.error(error);
  } finally {
    await client.end();
  }
};

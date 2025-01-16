import "dotenv/config";
import { PubSub } from "@google-cloud/pubsub";
import { Connector, IpAddressTypes } from "@google-cloud/cloud-sql-connector";
import pkg from "pg";

const pubSubClient = new PubSub();

export const dailyReminder = async () => {
  try {
    const { Pool } = pkg;

    const connector = new Connector();

    const clientOpts = await connector.getOptions({
      instanceConnectionName:
        "gcp-room-reservation-system:europe-west1:room-reservation-db",
      ipType: IpAddressTypes.PUBLIC,
    });

    const pool = new Pool({
      ...clientOpts,
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASS,
      port: process.env.DB_PORT,
    });

    const client = await pool.connect();

    const [rows] = await client.execute(
      "SELECT * FROM reservations JOIN users ON reservations.user_id = users.id WHERE Date(start_date) = $1",
      [new Intl.DateTimeFormat("en-CA").format(new Date())]
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

import "dotenv/config";
import functions from "@google-cloud/functions-framework";
import pg from "pg";
import { PubSub } from "@google-cloud/pubsub";

import { Connector, IpAddressTypes } from "@google-cloud/cloud-sql-connector";

functions.http("dailyReminder", async (req, res) => {
  console.log("Starting daily reminder function");
  const pubSubClient = new PubSub({ projectId: process.env.projectId });

  try {
    const connector = new Connector();
    console.log("Getting the database connection options");
    const clientOpts = await connector.getOptions({
      instanceConnectionName:
        "gcp-room-reservation-system:europe-west1:room-reservation-db",
      ipType: IpAddressTypes.PUBLIC,
    });
    const pool = new pg.Pool({
      ...clientOpts,
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASS,
      port: process.env.DB_PORT,
    });

    const result = await pool.query(
      "SELECT * FROM reservations JOIN users ON reservations.user_id = users.id WHERE Date(start_date) = $1",
      [new Intl.DateTimeFormat("en-CA").format(new Date())]
    );

    console.log("Number of reservations: ", result.rows.length);

    const reservations = result.rows.map((row) => {
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

    return res.status(200).send("Daily reminder emails sent successfully!");
  } catch (error) {
    console.error("Error sending daily reminder emails: ", error);
    console.error(error);
    return res.status(500).send("Failed to send daily reminder emails.");
  }
});

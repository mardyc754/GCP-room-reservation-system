import "dotenv/config";

import functions from "@google-cloud/functions-framework";
import nodemailer from "nodemailer";

functions.cloudEvent("sendEmailNotification", async (event) => {
  try {
    console.log("Starting send email notification function");

    const pubSubMessage = event.data
      ? JSON.parse(Buffer.from(event.data.message.data, "base64").toString())
      : {};

    // Parse request body for email details
    const { to, subject, message } = pubSubMessage;

    if (!to || !subject || !message) {
      console.error("Missing required fields: to, subject, or message.");
      return;
    }

    // Configure Nodemailer transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // if true the port is 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: `Room Reservation System <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text: message,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent: ", info.response);
    console.log("Email sent successfully!");
    transporter.close();
  } catch (error) {
    console.error("Error sending email: ", error);
  }
});

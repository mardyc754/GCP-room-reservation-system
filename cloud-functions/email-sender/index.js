import "dotenv/config";
import nodemailer from "nodemailer";
// Cloud Function
export const sendEmailNotification = async (req, res) => {
  try {
    // Parse request body for email details
    const { to, subject, message } = req.body;

    if (!to || !subject || !message) {
      return res
        .status(400)
        .send("Missing required fields: to, subject, or message.");
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
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: message,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent: ", info.response);
    res.status(200).send("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email: ", error);
    res.status(500).send("Failed to send email.");
  }
};

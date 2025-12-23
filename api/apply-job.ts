import { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { jobTitle, applicantName, applicantEmail, applicantPhone, message, resumeUrl } = req.body;

    // Validate required fields
    if (!jobTitle || !applicantName || !applicantEmail || !applicantPhone) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Email content to admins
    const mailOptions = {
      from: process.env.SMTP_USER || "noreply@srrconsultancy.com",
      to: "srinithipg1999@gmail.com,ratheesh50@gmail.com",
      subject: `Job Application: ${jobTitle}`,
      html: `
        <h2>New Job Application</h2>
        <p><strong>Job Position:</strong> ${jobTitle}</p>
        <hr />
        <h3>Applicant Information:</h3>
        <p><strong>Name:</strong> ${applicantName}</p>
        <p><strong>Email:</strong> ${applicantEmail}</p>
        <p><strong>Phone:</strong> ${applicantPhone}</p>
        ${message ? `<p><strong>Message:</strong></p><p>${message.replace(/\n/g, "<br>")}</p>` : ""}
        ${resumeUrl ? `<p><strong>Resume:</strong> <a href="${resumeUrl}">View Resume</a></p>` : ""}
        <hr />
        <p>Please review the application and contact the applicant at ${applicantEmail} or ${applicantPhone}.</p>
      `,
    };

    // Send email to admins
    await transporter.sendMail(mailOptions);

    // Send confirmation email to applicant
    const confirmationMail = {
      from: process.env.SMTP_USER || "noreply@srrconsultancy.com",
      to: applicantEmail,
      subject: `Application Received - ${jobTitle}`,
      html: `
        <h2>Application Received</h2>
        <p>Dear ${applicantName},</p>
        <p>Thank you for applying for the position of <strong>${jobTitle}</strong> at SRR Consultancy.</p>
        <p>We have received your application and will review it carefully. Our team will contact you shortly if your profile matches our requirements.</p>
        <p>Best regards,<br>SRR Consultancy Team</p>
      `,
    };

    await transporter.sendMail(confirmationMail);

    return res.status(200).json({ message: "Application submitted successfully" });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return res.status(500).json({
      message: "Failed to submit application",
      error: error.message,
    });
  }
}

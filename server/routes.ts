import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import nodemailer from "nodemailer";

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Verify transporter connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Configuration Error:", error.message);
    console.error("Make sure you have:");
    console.error("1. Enabled 'Less secure app access' or");
    console.error("2. Generated an App Password from Google Account Settings");
  } else {
    console.log("SMTP Server is ready to send emails");
  }
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Job application endpoint
  app.post("/api/apply-job", async (req, res) => {
    try {
      const { jobTitle, applicantName, applicantEmail, applicantPhone, message, resumeUrl } = req.body;

      // Validate required fields
      if (!jobTitle || !applicantName || !applicantEmail || !applicantPhone) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Email content
      const mailOptions = {
        from: process.env.SMTP_USER || "noreply@srrconsultancy.com",
        to: "srinithipg1999@gmail.com,ratheeshraj50@gmail.com",
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

      // Send email
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

      res.json({ message: "Application submitted successfully" });
    } catch (error: any) {
      console.error("Error sending email:", error);
      
      // More detailed error logging
      if (error.response) {
        console.error("SMTP Response Code:", error.responseCode);
        console.error("SMTP Response:", error.response);
      }
      
      // Return more helpful error message
      const errorMessage = error.message || "Failed to submit application";
      res.status(500).json({ 
        message: "Failed to submit application",
        error: errorMessage,
        details: process.env.NODE_ENV === "development" ? error.message : undefined
      });
    }
  });

  return httpServer;
}
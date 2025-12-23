import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

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

      // Store application data or process it as needed
      console.log("Job application received:", { jobTitle, applicantName, applicantEmail, applicantPhone });

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
import { VercelRequest, VercelResponse } from "@vercel/node";

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

    // Store application data or process it as needed
    console.log("Job application received:", { jobTitle, applicantName, applicantEmail, applicantPhone });

    return res.status(200).json({ message: "Application submitted successfully" });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return res.status(500).json({
      message: "Failed to submit application",
      error: error.message,
    });
  }
}

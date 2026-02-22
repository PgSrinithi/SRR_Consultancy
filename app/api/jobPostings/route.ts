import { NextResponse } from "next/server";
import Airtable from "airtable";
import { cookies } from "next/headers";

const COOKIE_NAME = "jobPostings";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const cached = cookieStore.get(COOKIE_NAME);

    console.log("JobPostings API HIT", cached);

    // ✅ Serve from cookie if available
    if (cached) {
      console.log("Serving JobPostings from COOKIE");
      return NextResponse.json(JSON.parse(cached.value));
    }

    console.log("Fetching JobPostings from AIRTABLE");

    const base = new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY || "",
    }).base(process.env.AIRTABLE_BASE_ID || "");

    const records = await base("JobPostings").select().all();

    const jobPostings = records
      .map((record) => ({
        id: record.id,
        jobId:
          Array.isArray(record.fields.JobId) &&
          record.fields.JobId.length > 0
            ? record.fields.JobId[0]
            : null,
        locationId:
          Array.isArray(record.fields.LocationId) &&
          record.fields.LocationId.length > 0
            ? record.fields.LocationId[0]
            : null,
        industryId:
          Array.isArray(record.fields.IndustryId) &&
          record.fields.IndustryId.length > 0
            ? record.fields.IndustryId[0]
            : null,
        Requirement: record.fields.Requirement ?? null,
        Openings: record.fields.Openings ?? null,
      }))
      .filter((item) => item.jobId);

    // ✅ Persist until user clears cookies
    cookieStore.set(COOKIE_NAME, JSON.stringify(jobPostings), {
      httpOnly: false, // must be readable by MobX
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date("9999-12-31"),
    });

    return NextResponse.json(jobPostings);
  } catch (error) {
    console.error("[Airtable] Error fetching job postings:", error);
    return NextResponse.json(
      { error: "Failed to fetch job postings" },
      { status: 500 }
    );
  }
}

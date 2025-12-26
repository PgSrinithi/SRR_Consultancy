import { NextResponse } from "next/server";
import Airtable from "airtable";

export async function GET() {
  try {
    const base = new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY || "",
    }).base(process.env.AIRTABLE_BASE_ID || "");

    const records = await base("JobRoles").select().all();
    const jobRoles = records
      .map((record) => ({
        id: record.id,
        jobName: record.fields.RoleName ?? null,
        jobDescriptions: record.fields.RoleDescription ?? null,
      }))
      .filter((item) => item.jobName);

    return NextResponse.json(jobRoles);
  } catch (error) {
    console.error("[Airtable] Error fetching job roles from Airtable:", error);
    return NextResponse.json(
      { error: "Failed to fetch job roles" },
      { status: 500 }
    );
  }
}

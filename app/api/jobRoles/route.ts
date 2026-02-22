// /api/jobRoles/route.ts
import { NextResponse } from "next/server";
import Airtable from "airtable";
import { cookies } from "next/headers";

const COOKIE_NAME = "jobRoles";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const cached = cookieStore.get(COOKIE_NAME);

    if (cached) {
      console.log("Serving from COOKIE");
      return NextResponse.json(JSON.parse(cached.value));
    }

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

    cookieStore.set(COOKIE_NAME, JSON.stringify(jobRoles), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date("9999-12-31"),
    });

    return NextResponse.json(jobRoles);
  } catch (error) {
    console.error("[Airtable] Error fetching job roles:", error);
    return NextResponse.json(
      { error: "Failed to fetch job roles" },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from "next/server";
import Airtable from "airtable";

/* -----------------------------
   Airtable Base Helper
------------------------------ */
const getBase = () =>
  new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY || "",
  }).base(process.env.AIRTABLE_BASE_ID || "");

/* -----------------------------
   GET: Fetch Locations
------------------------------ */
export async function GET() {
  try {
    const base = getBase();

    const records = await base("Locations").select().all();

    const locations = records
      .map((record) => ({
        id: record.id,
        name: record.fields.Name ?? null,
      }))
      .filter((item) => item.name);

    return NextResponse.json(locations);
  } catch (error) {
    console.error("[Airtable] Error fetching locations:", error);
    return NextResponse.json(
      { error: "Failed to fetch locations" },
      { status: 500 }
    );
  }
}

/* -----------------------------
   POST: Create Location (Name only)
------------------------------ */
export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Location name is required" },
        { status: 400 }
      );
    }

    const base = getBase();

    const created = await base("Locations").create([
      {
        fields: {
          Name: name.trim(),
        },
      },
    ]);

    return NextResponse.json(
      {
        success: true,
        id: created[0].id,
        name: created[0].fields.Name,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Airtable] Error creating location:", error);
    return NextResponse.json(
      { error: "Failed to create location" },
      { status: 500 }
    );
  }
}

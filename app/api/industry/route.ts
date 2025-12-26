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
   GET: Fetch Industries
------------------------------ */
export async function GET() {
  try {
    const base = getBase();

    const records = await base("Industry").select().all();

    const industries = records
      .map((record) => ({
        id: record.id,
        name: record.fields.Name ?? null,
        description: record.fields.Description ?? null,
      }))
      .filter((item) => item.name);

    return NextResponse.json(industries);
  } catch (error) {
    console.error("[Airtable] Error fetching industries:", error);
    return NextResponse.json(
      { error: "Failed to fetch industries" },
      { status: 500 }
    );
  }
}

/* -----------------------------
   POST: Create Industry (Name only)
------------------------------ */
export async function POST(request: NextRequest) {
  try {
    const { name , description} = await request.json();

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Industry name is required" },
        { status: 400 }
      );
    }

    const base = getBase();

    const created = await base("Industry").create([
      {
        fields: {
          Name: name.trim(),
          Description: description?.trim() || "",
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
    console.error("[Airtable] Error creating industry:", error);
    return NextResponse.json(
      { error: "Failed to create industry" },
      { status: 500 }
    );
  }
}

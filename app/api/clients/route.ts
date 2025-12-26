import { NextRequest, NextResponse } from "next/server";
import Airtable from "airtable";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phoneNumber,
      businessName,
      industry,
      location,
      message,
    } = body;

    // Basic validation
    if (!name || !email || !phoneNumber || !businessName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const base = new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY || "",
    }).base(process.env.AIRTABLE_BASE_ID || "");

    const record = await base("Clients").create([
      {
        fields: {
          name: name,
          email: email,
          phoneNumber: phoneNumber,
          businessName: businessName,
          industry: industry ?? [],
          location: location ?? [],
          message: message ?? "",
        },
      },
    ]);

    return NextResponse.json(
      {
        success: true,
        id: record[0].id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Airtable] Error saving client:", error);

    return NextResponse.json(
      { error: "Failed to save client data" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import Airtable from "airtable";
import { cookies } from "next/headers";

const getBase = () =>
  new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY || "",
  }).base(process.env.AIRTABLE_BASE_ID || "");

const COOKIE_NAME = "locations";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const cached = cookieStore.get(COOKIE_NAME);

    console.log("Location API HIT", cached);

    // ✅ Serve from cookie if available
    if (cached) {
      console.log("Serving Locations from COOKIE");
      return NextResponse.json(JSON.parse(cached.value));
    }

    console.log("Fetching Locations from AIRTABLE");

    const base = getBase();
    const records = await base("Locations").select().all();

    const locations = records
      .map((record) => ({
        id: record.id,
        name: record.fields.Name ?? null,
      }))
      .filter((item) => item.name);

    // ✅ Persist until user clears cookies
    cookieStore.set(COOKIE_NAME, JSON.stringify(locations), {
      httpOnly: false, // client-readable
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date("9999-12-31"),
    });

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
   POST: Create Location
   (Invalidate cookie)
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

    (await cookies()).delete(COOKIE_NAME);

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

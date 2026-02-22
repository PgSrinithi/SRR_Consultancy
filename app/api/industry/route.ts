import { NextRequest, NextResponse } from "next/server";
import Airtable from "airtable";
import { cookies } from "next/headers";

const getBase = () =>
  new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY || "",
  }).base(process.env.AIRTABLE_BASE_ID || "");

const COOKIE_NAME = "industries";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const cached = cookieStore.get(COOKIE_NAME);

    console.log("Industry API HIT", cached);

    // ✅ Serve from cookie
    if (cached) {
      console.log("Serving Industries from COOKIE");
      return NextResponse.json(JSON.parse(cached.value));
    }

    console.log("Fetching Industries from AIRTABLE");

    const base = getBase();
    const records = await base("Industry").select().all();

    const industries = records
      .map((record) => ({
        id: record.id,
        name: record.fields.Name ?? null,
        description: record.fields.Description ?? null,
      }))
      .filter((item) => item.name);

    // ✅ Persist until user clears cookies
    cookieStore.set(COOKIE_NAME, JSON.stringify(industries), {
      httpOnly: false, // client-readable
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date("9999-12-31"),
    });

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
   POST: Create Industry
   (Invalidate cookie)
------------------------------ */
export async function POST(request: NextRequest) {
  try {
    const { name, description } = await request.json();

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
    console.error("[Airtable] Error creating industry:", error);
    return NextResponse.json(
      { error: "Failed to create industry" },
      { status: 500 }
    );
  }
}

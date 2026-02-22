import { NextResponse } from "next/server";
import Airtable from "airtable";
import { ClientLogo } from "@/interface/clientLogos";

const getBase = () =>
  new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY || "",
  }).base(process.env.AIRTABLE_BASE_ID || "");

const normalizeImageUrl = (url?: string | null): string | null => {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    if (parsed.protocol === "http:") {
      parsed.protocol = "https:";
    }
    return parsed.toString();
  } catch {
    return null;
  }
};

const normalizeLogos = (items: ClientLogo[]): ClientLogo[] =>
  items
    .map((item) => ({
      ...item,
      image: normalizeImageUrl(item.image) || "",
    }))
    .filter((item) => Boolean(item.name) && Boolean(item.image));

export async function GET() {
  try {
    const base = getBase();
    const records = await base("ClientLogos").select().all();

    const clientLogos: ClientLogo[] = normalizeLogos(
      records
      .map((record) => ({
        id: record.id,
        name: record.fields.name ?? null,
        isActive: record.fields.isActive ?? false,
        image:
          record.fields.logo?.[0]?.thumbnails?.large?.url ??
          record.fields.logo?.[0]?.url ??
          null,
      }))
    );

    return NextResponse.json(clientLogos);
  } catch (error) {
    console.error("[Airtable] Error fetching client logos:", error);
    return NextResponse.json(
      { error: "Failed to fetch client logos" },
      { status: 500 }
    );
  }
}

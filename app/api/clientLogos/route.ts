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

type RawClientLogo = {
  id: string;
  name: unknown;
  isActive: unknown;
  image: unknown;
};

const normalizeLogos = (items: RawClientLogo[]): ClientLogo[] =>
  items
    .map((item) => {
      const name = typeof item.name === "string" ? item.name.trim() : "";
      const image = normalizeImageUrl(
        typeof item.image === "string" ? item.image : null
      );

      return {
        id: item.id,
        name,
        isActive: Boolean(item.isActive),
        image: image || "",
      };
    })
    .map((item) => ({
      id: item.id,
      name: item.name,
      isActive: item.isActive,
      image: item.image,
    }))
    .filter((item) => item.name.length > 0 && item.image.length > 0);

export async function GET() {
  try {
    const base = getBase();
    const records = await base("ClientLogos").select().all();

    const clientLogos: ClientLogo[] = normalizeLogos(
      records
        .map((record) => {
          const fields = record.fields as Record<string, unknown>;
          const logoField = fields.logo;
          let image: string | null = null;

          if (Array.isArray(logoField) && logoField.length > 0) {
            const firstLogo = logoField[0] as {
              url?: unknown;
              thumbnails?: { large?: { url?: unknown } };
            };

            image =
              (typeof firstLogo.thumbnails?.large?.url === "string"
                ? firstLogo.thumbnails.large.url
                : null) ??
              (typeof firstLogo.url === "string" ? firstLogo.url : null);
          }

          return {
            id: record.id,
            name: fields.name,
            isActive: fields.isActive ?? false,
            image,
          };
        })
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

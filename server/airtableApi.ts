import type { Express } from "express";
import { base } from '../server/airtable';

// Table names
export const TABLES = {
  INDUSTRY: 'Industry',
  LOCATIONS: 'Locations',
};

/**
 * Fetch all records from Industry table
 */
export async function fetchIndustries() {
  try {
    const records = await base(TABLES.INDUSTRY)
      .select()
      .all();

    const mappedRecords = records.map(record => ({
      id: record.id,
      ...record.fields,
    }));
    
    return mappedRecords;
  } catch (error) {
    console.error('[Airtable] Error fetching industries from Airtable:', error);
    throw error;
  }
}

/**
 * Fetch all records from Locations table
 */
export async function fetchLocations() {
  try {
    const records = await base(TABLES.LOCATIONS)
      .select()
      .all();

    const mappedRecords = records.map(record => ({
      id: record.id,
      ...record.fields,
    }));
    
    return mappedRecords;
  } catch (error) {
    console.error('[Airtable] Error fetching locations from Airtable:', error);
    throw error;
  }
}

/**
 * Register Airtable API routes with Express
 */
export async function registerAirtableRoutes(app: Express): Promise<void> {
  // Get all industries
  app.get("/api/industry", async (req, res) => {
    try {
      const industries = await fetchIndustries();
      res.json(industries);
    } catch (error: any) {
      console.error("Error fetching industries:", error);
      res.status(500).json({ error: error.message || "Failed to fetch industries" });
    }
  });

  // Get all locations
  app.get("/api/location", async (req, res) => {
    try {
      const locations = await fetchLocations();
      res.json(locations);
    } catch (error: any) {
      console.error("Error fetching locations:", error);
      res.status(500).json({ error: error.message || "Failed to fetch locations" });
    }
  });
}

import { NextResponse } from 'next/server';
import Airtable from 'airtable';

export async function GET() {
  try {
    // Configure Airtable dynamically in the route handler
    const base = new Airtable({ 
      apiKey: process.env.AIRTABLE_API_KEY || '' 
    }).base(process.env.AIRTABLE_BASE_ID || '');

    const records = await base('Locations')
      .select()
      .all();

    const locations = records.map(record => ({
      id: record.id,
      ...record.fields,
    }));

    return NextResponse.json(locations);
  } catch (error) {
    console.error('[Airtable] Error fetching locations from Airtable:', error);
    return NextResponse.json(
      { error: 'Failed to fetch locations' },
      { status: 500 }
    );
  }
}

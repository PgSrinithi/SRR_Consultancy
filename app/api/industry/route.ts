import { NextResponse } from 'next/server';
import Airtable from 'airtable';

export async function GET() {
  try {
    // Configure Airtable dynamically in the route handler
    const base = new Airtable({ 
      apiKey: process.env.AIRTABLE_API_KEY || '' 
    }).base(process.env.AIRTABLE_BASE_ID || '');

    const records = await base('Industry')
      .select()
      .all();

    const industries = records
      .map(record => ({
        id: record.id,
        name: record.fields.Name ?? null,
        description: record.fields.Description ?? null,
      }))
      .filter(item => item.name);

    return NextResponse.json(industries);
  } catch (error) {
    console.error('[Airtable] Error fetching industries from Airtable:', error);
    return NextResponse.json(
      { error: 'Failed to fetch industries' },
      { status: 500 }
    );
  }
}

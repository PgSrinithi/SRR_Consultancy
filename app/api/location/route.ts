import { NextResponse } from 'next/server';
import { base } from '@/lib/airtable';

export async function GET() {
  try {
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

import { NextResponse } from 'next/server';
import { base } from '@/lib/airtable';

export async function GET() {
  try {
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

import Airtable from 'airtable';

// Configure Airtable with environment variables
Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_API_KEY || '',
});

// Initialize the base
const base = Airtable.base(process.env.AIRTABLE_BASE_ID || 'appDhlWulte2xfMUD');

export { Airtable, base };

# Airtable Setup Instructions

## Current Issue
The Airtable API key is returning a 403 "NOT_AUTHORIZED" error.

## Solution

### Step 1: Generate a New Airtable API Token
1. Go to https://airtable.com/account
2. In the left sidebar, click "Personal access tokens"
3. Click "+ Create token"
4. Name it: "SRR-Connect" or similar
5. Under "Scopes", select these permissions:
   - `data.records:read`
   - `data.records:write`
   - `data.records:delete`
6. Under "Access to bases", select your base (the one with the Industry table)
7. Click "Create token"
8. Copy the generated token

### Step 2: Update the .env file
Replace the `AIRTABLE_API_KEY` in `.env` with your new token:

```
AIRTABLE_API_KEY=your_new_token_here
AIRTABLE_BASE_ID=appvl6mmk8Qdi6chk
```

### Step 3: Restart the server
```
npm run dev
```

### Step 4: Test the API
```
curl http://localhost:5000/api/industries
```

You should now see your Industry data from Airtable in JSON format.

## Current Configuration
- **Base ID**: appvl6mmk8Qdi6chk ✓
- **Table Name**: Industry ✓
- **API Key**: Needs to be regenerated ❌

Once you generate the new token and update `.env`, the industries will automatically load from Airtable!

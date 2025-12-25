# SRR Consultancy - Next.js Migration

This project has been successfully migrated from Vite + Express to Next.js App Router.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Home page
│   ├── jobs/
│   │   └── page.tsx         # Jobs page
│   ├── not-found.tsx        # 404 page
│   ├── globals.css          # Global styles
│   └── api/                 # API routes
│       ├── industry/
│       │   └── route.ts     # GET /api/industry
│       └── location/
│           └── route.ts     # GET /api/location
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── animations.tsx
│   ├── contact-modal.tsx
│   ├── job-application-modal.tsx
│   └── layout.tsx
├── lib/                     # Utility libraries
│   ├── utils.ts
│   ├── queryClient.ts
│   └── airtable.ts          # Airtable configuration
├── stores/                  # MobX stores
│   ├── index.ts
│   ├── IndustryStore.ts
│   └── LocationStore.ts
├── hooks/                   # Custom React hooks
├── public/                  # Static assets
│   ├── assets/              # Images and media
│   ├── favicon.png
│   └── opengraph.jpg
├── next.config.js           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
└── package.json             # Dependencies and scripts
```

## Key Features

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling
- **MobX** for state management
- **React Query** for data fetching
- **Framer Motion** for animations
- **shadcn/ui** component library
- **Airtable** integration for data

## Environment Variables

Create a `.env.local` file in the root directory with:

```env
AIRTABLE_API_KEY=your_airtable_api_key
AIRTABLE_BASE_ID=your_airtable_base_id
```

## Pages

- **Home (`/`)**: Landing page with company information, services, and sectors
- **Jobs (`/jobs`)**: Job listings with filtering by industry and location
- **404**: Custom not found page

## API Routes

- **GET /api/industry**: Fetch all industries from Airtable
- **GET /api/location**: Fetch all locations from Airtable

## Migration Summary

### What Was Changed

1. **Routing**: Migrated from `wouter` to Next.js file-based routing
2. **Server**: Replaced Express.js with Next.js API routes
3. **Build Tool**: Switched from Vite to Next.js built-in bundler
4. **Navigation**: Updated from `wouter` hooks to Next.js `useRouter` and `usePathname`
5. **Images**: Converted to Next.js `Image` component where appropriate
6. **Assets**: Moved from `attached_assets/` to `public/assets/`

### What Was Preserved

- All UI components and styling
- MobX stores and state management
- Airtable integration
- Job listings and filtering functionality
- Contact and application modals
- All Framer Motion animations
- shadcn/ui component library

### Removed Files

- `server/` folder (Express server)
- `client/` folder (moved to root)
- `vite.config.ts` and Vite plugins
- `vercel.json`, `render.yaml`, `netlify.toml` (old deployment configs)
- `.replit` configuration
- `script/` build scripts
- `api/` Vercel serverless functions

## Development

The project uses:
- Next.js dev server on port 3000
- TypeScript for type checking
- ESLint for code linting
- Tailwind CSS for styling

## Deployment

This Next.js application can be deployed to:
- Vercel (recommended)
- Netlify
- Any Node.js hosting platform

Make sure to set the environment variables in your deployment platform.

## License

MIT

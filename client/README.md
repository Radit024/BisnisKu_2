# BisnisCatat Client

React frontend for the BisnisCatat business record-keeping application.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Environment Variables

Create a `.env` file:

```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_PROJECT_ID=your-project-id
```

## Deployment

Deploy the `dist` folder to any static hosting service like Vercel, Netlify, or GitHub Pages.

## Features

- React 18 with TypeScript
- Tailwind CSS with shadcn/ui components
- Firebase Authentication
- TanStack Query for data fetching
- Wouter for routing
- Responsive design for mobile and desktop
# BisnisCatat Server

Express.js backend API for the BisnisCatat business record-keeping application.

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
DATABASE_URL=your-postgresql-connection-string
NODE_ENV=development
PORT=3000
```

## Database

Run migrations:
```bash
npm run db:push
```

## Deployment

Deploy the `dist` folder to any Node.js hosting service like Vercel, Railway, or Render.

## Features

- Express.js with TypeScript
- Drizzle ORM with PostgreSQL
- In-memory storage for development
- Firebase Authentication integration
- RESTful API endpoints
- CORS enabled
- Session management
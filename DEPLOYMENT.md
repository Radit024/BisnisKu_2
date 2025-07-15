# Deployment Guide for BisnisCatat

This guide explains how to deploy the BisnisCatat application using serverless architecture with separate client and server deployments.

## Project Structure

```
bisniscatat/
├── client/          # React frontend
│   ├── src/
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── server/          # Express backend
│   ├── package.json
│   ├── tsconfig.json
│   └── *.ts files
├── shared/          # Shared types and schemas
│   └── schema.ts
└── package.json     # Root package (for development)
```

## Deployment Options

### Option 1: Vercel (Recommended)

#### Frontend (Client)
1. Deploy the `client` folder to Vercel
2. Build command: `npm run build`
3. Output directory: `dist`
4. Environment variables needed:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_FIREBASE_PROJECT_ID`

#### Backend (Server)
1. Deploy the `server` folder to Vercel (or any serverless platform)
2. Build command: `npm run build`
3. Output directory: `dist`
4. Environment variables needed:
   - `DATABASE_URL` (if using PostgreSQL)
   - Any other API keys

### Option 2: Netlify

#### Frontend (Client)
1. Deploy the `client` folder to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables in Netlify dashboard

#### Backend (Server)
1. Deploy to Netlify Functions or separate serverless platform
2. Configure API proxy in `netlify.toml`

### Option 3: Railway/Render

#### Full Stack Deployment
1. Deploy root directory
2. Build command: `npm run build`
3. Start command: `npm start`
4. Environment variables in platform dashboard

## Environment Variables

### Client (.env)
```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_PROJECT_ID=your-project-id
```

### Server (.env)
```
DATABASE_URL=your-database-url
NODE_ENV=production
PORT=3000
```

## Build Commands

### Development
```bash
# Install all dependencies
npm run install:all

# Run client only
npm run dev:client

# Run server only
npm run dev:server

# Run full stack (from root)
npm run dev
```

### Production
```bash
# Build client
npm run build:client

# Build server
npm run build:server

# Build both
npm run build
```

## Database Setup

1. Create a PostgreSQL database (recommend Neon, Supabase, or PlanetScale)
2. Run migrations:
   ```bash
   cd server
   npm run db:push
   ```

## Firebase Setup

1. Create a Firebase project
2. Enable Authentication with Google and Email/Password
3. Add your domain to authorized domains
4. Copy configuration keys to environment variables

## Deployment Checklist

- [ ] Firebase project created and configured
- [ ] Database created and migrated
- [ ] Environment variables set
- [ ] Client built and deployed
- [ ] Server built and deployed
- [ ] API endpoints accessible
- [ ] Authentication working
- [ ] Database connections working

## Troubleshooting

### Common Issues

1. **CORS Issues**: Ensure your API server allows requests from your client domain
2. **Environment Variables**: Check all required variables are set
3. **Firebase Auth**: Verify authorized domains include your deployment URL
4. **Database Connection**: Ensure DATABASE_URL is correct and accessible

### Logs

Check your deployment platform's logs for detailed error messages:
- Vercel: Check function logs
- Netlify: Check site logs
- Railway: Check deployment logs
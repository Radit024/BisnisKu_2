# BisnisKu Server

Express.js backend API untuk BisnisKu Business Management System.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup database
npm run db:generate
npm run db:migrate

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
├── db.ts              # Database configuration & connection
├── index.ts           # Main server entry point
├── routes.ts          # API routes definition
├── storage.ts         # Data storage & business logic
├── vite.ts            # Vite integration for development
└── vercel.json        # Vercel deployment config
```

## 🛠 Tech Stack

- **Node.js** + **Express.js**
- **TypeScript** for type safety
- **Drizzle ORM** for database operations
- **SQLite** for local database
- **Vite** for development integration

## 📡 API Endpoints

### Dashboard
- `GET /api/dashboard/summary` - Dashboard summary data
- `GET /api/transactions/recent` - Recent transactions
- `GET /api/stock/items` - Stock items

### Transactions
- `GET /api/transactions` - List all transactions
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

### Stock Management
- `GET /api/stock` - List all stock items
- `POST /api/stock` - Add new stock item
- `PUT /api/stock/:id` - Update stock item
- `DELETE /api/stock/:id` - Delete stock item

### Production
- `GET /api/production` - List production records
- `POST /api/production` - Create production record

### Reports
- `GET /api/reports/financial` - Financial reports
- `GET /api/reports/sales` - Sales analytics

## 📱 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm run start` - Start production server
- `npm run db:generate` - Generate database schema
- `npm run db:migrate` - Run database migrations
- `npm run type-check` - TypeScript type checking

## 🔧 Environment Variables

Create `.env` file in server directory:

```env
# Database
DATABASE_URL=./database.sqlite

# Server Configuration
PORT=3000
NODE_ENV=development

# CORS Origins (comma separated)
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

## 🗄️ Database Schema

The application uses SQLite with Drizzle ORM. Main tables:

- **transactions** - Financial transactions (income/expense)
- **stock_items** - Product inventory
- **production_records** - Production tracking
- **users** - User management (if implemented)

## 📚 Documentation

Refer to main [README.md](../README.md) for complete setup instructions.

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
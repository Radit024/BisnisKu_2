# Bisnisku - Business Record Keeping System

## Overview

Bisnisku is a comprehensive business record-keeping application designed for beginner users, particularly home-based MSME (Micro, Small, and Medium Enterprise) owners. The system provides an intuitive interface for managing transactions, production records, stock inventory, and generating business reports with calculations for HPP (Cost of Production) and BEP (Break Even Point). All monetary values are displayed in Indonesian Rupiah (IDR) format.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a full-stack architecture with a clear separation between frontend and backend concerns:

- **Frontend**: React.js with TypeScript using Vite as the build tool
- **Backend**: Express.js server with RESTful API endpoints
- **Database**: PostgreSQL with Drizzle ORM for database operations
- **Authentication**: Firebase Authentication with Google OAuth and email/password support
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state management

## Key Components

### Frontend Architecture
- **Component Structure**: Modular React components using shadcn/ui design system
- **Routing**: Wouter for client-side routing
- **Forms**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Build Tool**: Vite with TypeScript support

### Backend Architecture
- **API Server**: Express.js with middleware for logging and error handling
- **Database Layer**: Drizzle ORM with PostgreSQL dialect
- **Authentication Middleware**: Firebase token verification simulation
- **Route Structure**: RESTful API endpoints organized by feature

### Database Schema
The system uses five main tables:
- `users`: User authentication and profile information
- `transactions`: Income and expense records
- `productions`: Production activity records
- `production_materials`: Materials used in production
- `stock_items`: Inventory tracking
- `stock_movements`: Stock change history

## Data Flow

1. **User Authentication**: Firebase handles user authentication with Google OAuth and email/password
2. **API Requests**: Frontend makes HTTP requests to Express.js backend
3. **Database Operations**: Drizzle ORM manages PostgreSQL database interactions
4. **Real-time Updates**: TanStack Query provides optimistic updates and cache management
5. **State Management**: React Query handles server state synchronization

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **firebase**: Authentication services
- **@hookform/resolvers**: Form validation integration
- **date-fns**: Date manipulation utilities

### UI Dependencies
- **@radix-ui/***: Headless UI components
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **class-variance-authority**: Utility for creating variant-based component APIs

## Deployment Strategy

The application is now structured for serverless deployment with separate client and server packages:

### Package Structure
- `client/` - React frontend with separate package.json, Vite config, and build system
- `server/` - Express backend with separate package.json, TypeScript config, and build system
- `shared/` - Shared types and schemas used by both client and server

### Deployment Options

1. **Serverless (Recommended)**:
   - Frontend: Deploy `client/dist` to Vercel, Netlify, or similar static hosting
   - Backend: Deploy `server/dist` to Vercel Functions, Netlify Functions, or similar serverless platforms
   - Database: PostgreSQL on Neon, Supabase, or PlanetScale

2. **Traditional Hosting**:
   - Full stack deployment to Railway, Render, or similar platforms
   - Single build process serves both frontend and backend

### Build Process
- Client: `npm run build` in client/ directory produces `dist/` folder
- Server: `npm run build` in server/ directory produces `dist/` folder
- Deployment script: `./deploy.sh` handles building both packages

### Environment Configuration
- Client: `VITE_FIREBASE_*` variables for Firebase configuration
- Server: `DATABASE_URL` for PostgreSQL connection
- Vercel configurations included for easy deployment

This structure allows for independent scaling and deployment of frontend and backend components, making it suitable for modern serverless architectures.

## Key Features

1. **Transaction Management**: Record income and expenses with IDR currency formatting
2. **Production Tracking**: Log production activities with material usage
3. **Stock Management**: Monitor inventory levels with automatic stock updates
4. **Business Reports**: Generate financial summaries, HPP calculations, and BEP analysis
5. **User Authentication**: Secure login with Firebase Authentication
6. **Responsive Design**: Mobile-first approach with Tailwind CSS
7. **Real-time Data**: Optimistic updates with TanStack Query

The architecture prioritizes simplicity and ease of use while maintaining robust functionality for small business operations.
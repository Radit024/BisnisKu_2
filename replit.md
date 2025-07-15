# BisnisCatat - Business Record Keeping System

## Overview

BisnisCatat is a comprehensive business record-keeping application designed for beginner users, particularly home-based MSME (Micro, Small, and Medium Enterprise) owners. The system provides an intuitive interface for managing transactions, production records, stock inventory, and generating business reports with calculations for HPP (Cost of Production) and BEP (Break Even Point). All monetary values are displayed in Indonesian Rupiah (IDR) format.

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

The application is configured for deployment with the following build process:

1. **Development**: 
   - Frontend: Vite dev server with HMR
   - Backend: tsx for TypeScript execution
   - Database: Drizzle migrations

2. **Production Build**:
   - Frontend: Vite builds to `dist/public`
   - Backend: esbuild bundles server code to `dist/index.js`
   - Database: Drizzle pushes schema changes

3. **Environment Configuration**:
   - Firebase configuration via environment variables
   - Database URL configuration for PostgreSQL
   - Replit-specific optimizations included

The system is designed to be deployed on platforms like Replit, with specific configurations for development and production environments. The build process creates a single deployable package with the frontend assets served by the Express server.

## Key Features

1. **Transaction Management**: Record income and expenses with IDR currency formatting
2. **Production Tracking**: Log production activities with material usage
3. **Stock Management**: Monitor inventory levels with automatic stock updates
4. **Business Reports**: Generate financial summaries, HPP calculations, and BEP analysis
5. **User Authentication**: Secure login with Firebase Authentication
6. **Responsive Design**: Mobile-first approach with Tailwind CSS
7. **Real-time Data**: Optimistic updates with TanStack Query

The architecture prioritizes simplicity and ease of use while maintaining robust functionality for small business operations.
## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── ui/            # Shadcn/ui components
│   ├── Layout.tsx     # Main layout component
│   └── forms/         # Form components
├── contexts/          # React contexts (Theme, etc.)
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── pages/             # Application pages/routes
└── types/             # TypeScript definitions
```

## 🛠 Tech Stack

- **React 18** + **TypeScript**
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Shadcn/ui** for UI components
- **React Query** for data fetching
- **Wouter** for routing
- **Firebase Auth** for authentication

## 🎨 Features

- ✅ Modern React 18 with hooks
- ✅ TypeScript for type safety
- ✅ Responsive design with Tailwind
- ✅ Dark/Light mode support
- ✅ Component library with Shadcn/ui
- ✅ Form handling with React Hook Form
- ✅ Real-time data with React Query
- ✅ Authentication with Firebase

## 📱 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript type checking

## 🔧 Environment Variables

Create `.env` file in client directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 📚 Documentation

Refer to main [README.md](../README.md) for complete setup instructions.

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
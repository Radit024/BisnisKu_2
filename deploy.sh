#!/bin/bash

# Bisnisku Deployment Script

echo "🚀 Starting Bisnisku deployment..."

# Install dependencies
echo "📦 Installing dependencies..."
cd client && npm install
cd ../server && npm install
cd ..

# Build client
echo "🏗️ Building client..."
cd client && npm run build
cd ..

# Build server
echo "🏗️ Building server..."
cd server && npm run build
cd ..

echo "✅ Build complete!"
echo "📁 Client build: ./client/dist"
echo "📁 Server build: ./server/dist"
echo ""
echo "🌐 Deploy instructions:"
echo "1. Deploy ./client/dist to your static hosting (Vercel, Netlify, etc.)"
echo "2. Deploy ./server/dist to your serverless platform"
echo "3. Set environment variables on both platforms"
echo "4. Update API endpoints if needed"
echo ""
echo "📚 Check DEPLOYMENT.md for detailed instructions"
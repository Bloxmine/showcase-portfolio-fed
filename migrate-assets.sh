#!/bin/bash

# Portfolio to Next.js - Asset Migration Script
# This script moves your assets to the Next.js public folder

echo "🚀 Starting Next.js Portfolio Asset Migration..."
echo ""

# Create public directory if it doesn't exist
if [ ! -d "public" ]; then
    echo "📁 Creating public directory..."
    mkdir -p public
fi

# Move fonts
if [ -d "fonts" ]; then
    echo "🔤 Moving fonts..."
    mv fonts public/
    echo "✅ Fonts moved to public/fonts"
else
    echo "⚠️  fonts directory not found (may already be moved)"
fi

# Move images
if [ -d "images" ]; then
    echo "🖼️  Moving images..."
    mv images public/
    echo "✅ Images moved to public/images"
else
    echo "⚠️  images directory not found (may already be moved)"
fi

# Move JSON files
if [ -d "json" ]; then
    echo "📄 Moving JSON files..."
    mv json public/
    echo "✅ JSON files moved to public/json"
else
    echo "⚠️  json directory not found (may already be moved)"
fi

# Move letters
if [ -d "letters" ]; then
    echo "📝 Moving letters..."
    mv letters public/
    echo "✅ Letters moved to public/letters"
else
    echo "⚠️  letters directory not found (may already be moved)"
fi

# Move favicon if it exists
if [ -f "favicon.png" ]; then
    echo "⭐ Moving favicon..."
    mv favicon.png public/
    echo "✅ Favicon moved to public/"
else
    echo "ℹ️  No favicon.png found in root"
fi

echo ""
echo "✨ Migration complete!"
echo ""
echo "Next steps:"
echo "1. Run: npm install"
echo "2. Run: npm run dev"
echo "3. Open: http://localhost:3000"
echo ""
echo "Happy coding! 🎉"

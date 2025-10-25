# Portfolio Next.js

This is a modern portfolio website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **GSAP Animations**: Smooth scroll-based animations and flying text effects
- **Chromatic Aberration**: Interactive mouse-based visual effects
- **Scroll Reveals**: IntersectionObserver-based section reveals optimized for touch devices
- **Dynamic Projects**: Projects loaded from JSON files with sorting and view options
- **Responsive Design**: Fully responsive with mobile-first approach
- **Torn Paper Edges**: Custom clip-path styling for unique visual appeal

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **GSAP** - Professional-grade animation library
- **ScrollTrigger** - Scroll-based animations

## Project Structure

```
├── app/
│   ├── layout.tsx      # Root layout with SVG filters
│   ├── page.tsx        # Main page component
│   └── globals.css     # Global styles and animations
├── components/
│   ├── MouseEffects.tsx       # Mouse interaction effects
│   ├── ScrollAnimations.tsx   # Scroll-based animations
│   └── Projects.tsx            # Dynamic projects component
├── public/
│   ├── images/         # Images and icons
│   ├── letters/        # Letter images for logo
│   ├── fonts/          # Custom fonts
│   └── json/           # Project data
└── ...config files

```

## Build

To create a production build:

```bash
npm run build
npm start
```

## Deployment

This project can be deployed on Vercel, Netlify, or any other hosting platform that supports Next.js.

## License

MIT

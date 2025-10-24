# Next.js Portfolio Migration

This project has been converted to Next.js 14 with Tailwind CSS.

## Project Structure

```
/app
  /layout.tsx       - Root layout with metadata
  /page.tsx         - Main page with all sections
  /globals.css      - Global styles and Tailwind directives
/components
  /ChromaticAberration.tsx  - SVG filter effect component
  /ProjectsSection.tsx      - Projects carousel with sorting
/public
  - Move all static assets here (images, json, css/letters, favicon.png)
```

## Getting Started

1. **Install dependencies:**
```bash
npm install
```

2. **Move static assets to public directory:**
```bash
# Move images, json files, letters, and favicon to public/
mv images public/
mv json public/
mv css/letters public/
mv favicon.png public/ (if exists)
```

3. **Run the development server:**
```bash
npm run dev
```

4. **Open [http://localhost:3000](http://localhost:3000)**

## Key Changes

- ✅ Converted vanilla HTML/CSS/JS to Next.js with TypeScript
- ✅ Replaced custom CSS with Tailwind CSS utility classes
- ✅ Migrated JavaScript to React hooks (useState, useEffect)
- ✅ Created reusable components for better organization
- ✅ Maintained all original functionality:
  - Snap scrolling between sections
  - Project carousel with sorting (alphabetical, by date, default)
  - List/thumbnail view toggle
  - Chromatic aberration effect on hover
  - Letter animations
  - Torn-edge clip-path styling

## Build for Production

```bash
npm run build
npm start
```

## Notes

- All interactive elements use client components ('use client')
- Projects are still loaded from JSON files in /public/json/projects/
- The torn-edge effect and animations are preserved in globals.css
- Tailwind handles most styling, with custom CSS for animations

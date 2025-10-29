# Portfolio - Next.js Conversion

This is a converted Next.js 14+ version of the original portfolio website, now using:
- **Next.js 14** with App Router
- **TypeScript**
- **Tailwind CSS** alongside custom CSS
- **GSAP** for animations
- **React Components** for each section

## 🎨 Features Preserved

All your original styling and animations have been preserved:
- ✅ Chromatic aberration effects
- ✅ Torn edge clip-path effects  
- ✅ GSAP scroll animations
- ✅ Flying text animations
- ✅ Letter floating animations
- ✅ Mouse-reactive rotation effects
- ✅ Dust overlay effect
- ✅ SVG filters

## 📁 Project Structure

```
/app
  layout.tsx          # Root layout with fonts, metadata, SVG filters
  page.tsx            # Main page combining all sections
  globals.css         # Global styles + Tailwind
/components
  LandingSection.tsx  # Hero section with letters
  AnimatedSection.tsx # Flying text section
  AboutSection.tsx    # About me section
  ProjectsSection.tsx # Projects carousel
  TechStackSection.tsx# Tech stack list
  ContactSection.tsx  # Contact section
  *.module.css        # Component-specific styles
/hooks
  usePortfolioEffects.ts # GSAP and chromatic effects
/public
  /fonts              # Custom fonts (moved from /fonts)
  /images             # Images (moved from /images)
  /json               # Project JSON files (moved from /json)
  /letters            # Letter images (moved from /letters)
```

## 🚀 Getting Started

### 1. Move Assets to Public Folder

Before running the project, move these folders to `/public`:

```bash
# From your project root
mkdir -p public
mv fonts public/
mv images public/
mv json public/
mv letters public/
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm start
```

## 🔧 Key Differences from Original

### CSS
- Global styles now in `app/globals.css` with Tailwind directives
- Component styles use CSS Modules (`.module.css`)
- All custom CSS variables and animations preserved

### JavaScript → React
- `main.js` → `hooks/usePortfolioEffects.ts` (custom hook)
- `projects-loader.js` → `components/ProjectsSection.tsx` (React component)
- DOM manipulation → React state and effects

### Structure
- Each section is now a separate React component
- Client-side interactivity uses `'use client'` directive
- GSAP loaded via Next.js `<Script>` component

## 📝 Customization

### Adding Projects
Add JSON files to `/public/json/projects/` and update the file list in `ProjectsSection.tsx`:

```typescript
const files = [
  'your-project.json',
  // ... other projects
];
```

### Modifying Styles
- Global styles: `app/globals.css`
- Component styles: `components/*.module.css`
- Tailwind config: `tailwind.config.ts`

### Animations
All GSAP animations are in `hooks/usePortfolioEffects.ts`. Modify the `CONFIG` object to adjust:
- Chromatic aberration intensity
- Rotation effects
- Animation durations
- Scroll trigger thresholds

## 🎯 Benefits of Next.js Version

1. **Better Performance**: Image optimization, code splitting
2. **SEO Friendly**: Server-side rendering, metadata
3. **TypeScript**: Type safety and better DX
4. **Modern Stack**: React 18, Next.js 14
5. **Scalability**: Easy to add new pages/features
6. **Tailwind CSS**: Utility classes for rapid development

## 📦 Dependencies

- `next` - Next.js framework
- `react` & `react-dom` - React library
- `gsap` - Animation library
- `tailwindcss` - Utility-first CSS
- `typescript` - Type safety

## 🐛 Troubleshooting

**Animations not working?**
- Check browser console for GSAP errors
- Ensure GSAP scripts load before effects hook runs

**Images not loading?**
- Verify files are in `/public` folder
- Check file paths in components

**Styles not applying?**
- Run `npm run dev` to restart dev server
- Check for CSS module import paths

## 📄 License

Same as original portfolio.

---

Built with ❤️ using Next.js and Tailwind CSS

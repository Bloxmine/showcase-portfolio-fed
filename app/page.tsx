'use client';

import { usePortfolioEffects } from '@/hooks/usePortfolioEffects';
import LandingSection from '@/components/LandingSection';
import AnimatedSection from '@/components/AnimatedSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import TechStackSection from '@/components/TechStackSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  // Initialize portfolio effects (GSAP, chromatic aberration, etc.)
  usePortfolioEffects();

  return (
    <main id="main-content">
      <LandingSection />
      <AnimatedSection />
      <AboutSection />
      <ProjectsSection />
      <TechStackSection />
      <ContactSection />
      
      {/* Footer */}
      <footer className="footer" style={{ background: '#111', color: 'var(--muted)', padding: '1.5rem 2rem', marginTop: '2rem', textAlign: 'center', fontSize: '1rem', letterSpacing: '0.05em' }}>
        <p>&copy; 2025 heind_</p>
      </footer>
    </main>
  );
}

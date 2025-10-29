'use client';

import { useEffect, useRef } from 'react';

// Configuration
const CONFIG = {
  chromaticAberration: {
    maxOffset: 5,
    redDefault: { dx: 2, dy: 0 },
    blueDefault: { dx: -3, dy: 0 }
  },
  rotation: {
    max: 2,
    cyanMultiplier: -1.5,
    magentaMultiplier: 2.5,
    cyanOffset: 8,
    magentaOffset: 8
  },
  animation: {
    duration: 0.2,
    resetDuration: 0.3,
    ease: 'power2.out'
  },
  scrollTrigger: {
    threshold: 0.1,
    rootMargin: '-10% 0px -10% 0px'
  }
};

function isTouchDevice() {
  const hasTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const lacksHover = window.matchMedia('(hover: none)').matches;
  const isProbablyIPad = hasTouch && (hasCoarsePointer || lacksHover || navigator.maxTouchPoints > 0);
  
  return isProbablyIPad || hasCoarsePointer || lacksHover;
}

export function usePortfolioEffects() {
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Check if GSAP is loaded
    const checkGSAP = setInterval(() => {
      if (typeof window !== 'undefined' && (window as any).gsap && (window as any).ScrollTrigger) {
        clearInterval(checkGSAP);
        initializeEffects();
      }
    }, 100);

    return () => {
      clearInterval(checkGSAP);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  function initializeEffects() {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;

    if (!gsap || !ScrollTrigger) return;

    // Register GSAP plugin
    gsap.registerPlugin(ScrollTrigger);

    // Create chromatic layers
    createChromaticLayers();

    // Setup mouse effects
    setupMouseEffects();

    // Setup GSAP animations
    setupGSAPAnimations(gsap, ScrollTrigger);

    // Setup hash updates
    setupHashUpdates(gsap, ScrollTrigger);
  }

  function createChromaticLayers() {
    const allSectionInners = document.querySelectorAll('.section-inner');
    
    allSectionInners.forEach(sectionInner => {
      // Skip if already wrapped
      if (sectionInner.parentElement?.classList.contains('chromatic-wrapper')) return;

      const wrapper = document.createElement('div');
      wrapper.className = 'chromatic-wrapper';
      wrapper.style.position = 'relative';
      wrapper.style.width = '100%';
      wrapper.style.maxWidth = '900px';
      wrapper.style.margin = '0 auto';
      
      const cyanLayer = document.createElement('div');
      cyanLayer.className = 'chromatic-layer cyan';
      
      const magentaLayer = document.createElement('div');
      magentaLayer.className = 'chromatic-layer magenta';
      
      sectionInner.parentNode?.insertBefore(wrapper, sectionInner);
      wrapper.appendChild(cyanLayer);
      wrapper.appendChild(magentaLayer);
      wrapper.appendChild(sectionInner);
    });
  }

  function setupMouseEffects() {
    const redOffset = document.getElementById('redOffset');
    const blueOffset = document.getElementById('blueOffset');

    if (!redOffset || !blueOffset) return;

    function updateAnimations() {
      if (!redOffset || !blueOffset) return;
      const x = mouseX.current;
      const y = mouseY.current;

      // Update chromatic aberration
      const offsetX = x * CONFIG.chromaticAberration.maxOffset;
      const offsetY = y * CONFIG.chromaticAberration.maxOffset;
      
      redOffset.setAttribute('dx', String(offsetX));
      redOffset.setAttribute('dy', String(offsetY));
      blueOffset.setAttribute('dx', String(-offsetX));
      blueOffset.setAttribute('dy', String(-offsetY));

      // Update rotation effects
      const gsap = (window as any).gsap;
      if (!gsap) return;

      const rotation = x * CONFIG.rotation.max;
      const sectionInners = document.querySelectorAll('.section-inner');

      sectionInners.forEach(sectionInner => {
        const wrapper = sectionInner.closest('.chromatic-wrapper');
        if (!wrapper) return;

        const cyan = wrapper.querySelector('.chromatic-layer.cyan');
        const magenta = wrapper.querySelector('.chromatic-layer.magenta');

        gsap.to(sectionInner, { rotation, duration: CONFIG.animation.duration, ease: CONFIG.animation.ease });
        
        if (cyan) {
          gsap.to(cyan, {
            rotation: rotation * CONFIG.rotation.cyanMultiplier,
            x: -x * CONFIG.rotation.cyanOffset,
            y: -y * (CONFIG.rotation.cyanOffset / 2),
            duration: CONFIG.animation.duration,
            ease: CONFIG.animation.ease
          });
        }
        
        if (magenta) {
          gsap.to(magenta, {
            rotation: rotation * CONFIG.rotation.magentaMultiplier,
            x: x * CONFIG.rotation.magentaOffset,
            y: y * (CONFIG.rotation.magentaOffset / 2),
            duration: CONFIG.animation.duration,
            ease: CONFIG.animation.ease
          });
        }
      });

      animationFrameId.current = null;
    }

    document.addEventListener('mousemove', (e) => {
      mouseX.current = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY.current = (e.clientY / window.innerHeight) * 2 - 1;
      
      if (!animationFrameId.current) {
        animationFrameId.current = requestAnimationFrame(updateAnimations);
      }
    });

    document.addEventListener('mouseleave', () => {
      const redOffset = document.getElementById('redOffset');
      const blueOffset = document.getElementById('blueOffset');
      
      if (redOffset && blueOffset) {
        redOffset.setAttribute('dx', String(CONFIG.chromaticAberration.redDefault.dx));
        redOffset.setAttribute('dy', String(CONFIG.chromaticAberration.redDefault.dy));
        blueOffset.setAttribute('dx', String(CONFIG.chromaticAberration.blueDefault.dx));
        blueOffset.setAttribute('dy', String(CONFIG.chromaticAberration.blueDefault.dy));
      }

      const gsap = (window as any).gsap;
      if (!gsap) return;

      const sectionInners = document.querySelectorAll('.section-inner');
      sectionInners.forEach(sectionInner => {
        const wrapper = sectionInner.closest('.chromatic-wrapper');
        if (!wrapper) return;

        const cyan = wrapper.querySelector('.chromatic-layer.cyan');
        const magenta = wrapper.querySelector('.chromatic-layer.magenta');

        gsap.to(sectionInner, { rotation: 0, duration: CONFIG.animation.resetDuration, ease: CONFIG.animation.ease });
        if (cyan) gsap.to(cyan, { rotation: 0, x: 0, y: 0, duration: CONFIG.animation.resetDuration, ease: CONFIG.animation.ease });
        if (magenta) gsap.to(magenta, { rotation: 0, x: 0, y: 0, duration: CONFIG.animation.resetDuration, ease: CONFIG.animation.ease });
      });
    });
  }

  function setupGSAPAnimations(gsap: any, ScrollTrigger: any) {
    const sections = gsap.utils.toArray('.section:not(.landing):not(.full-width)');
    const touchDevice = isTouchDevice();
    
    sections.forEach((section: any) => {
      const sectionInner = section.querySelector('.section-inner');
      if (!sectionInner) return;
      
      if (touchDevice) {
        gsap.set(sectionInner, { opacity: 0, y: 30, transformOrigin: 'center center' });
      } else {
        gsap.set(sectionInner, { y: -100, scale: 0.85, rotation: -3, opacity: 0, transformOrigin: 'center center' });
      }
    });
    
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSectionReveal(entry.target, touchDevice, gsap);
          sectionObserver.unobserve(entry.target);
        }
      });
    }, { 
      threshold: CONFIG.scrollTrigger.threshold,
      rootMargin: CONFIG.scrollTrigger.rootMargin
    });
    
    sections.forEach((section: any) => sectionObserver.observe(section));
  }

  function animateSectionReveal(section: Element, touchDevice: boolean, gsap: any) {
    const sectionInner = section.querySelector('.section-inner');
    if (!sectionInner) return;
    
    if (touchDevice) {
      gsap.to(sectionInner, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
      });
    } else {
      gsap.to(sectionInner, {
        y: 0,
        scale: 1,
        rotation: 0,
        opacity: 1,
        ease: 'back.out(1.7)',
        duration: 0.8
      });
      
      gsap.delayedCall(0.5, () => {
        gsap.to(sectionInner, {
          keyframes: [
            { rotation: 1, duration: 0.05 },
            { rotation: -1, duration: 0.05 },
            { rotation: 0.5, duration: 0.05 },
            { rotation: 0, duration: 0.05 }
          ],
          ease: 'power2.out'
        });
      });
    }
  }

  function setupHashUpdates(gsap: any, ScrollTrigger: any) {
    const allSections = gsap.utils.toArray('.section');
    
    allSections.forEach((section: any) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => updateHash(section.id),
        onEnterBack: () => updateHash(section.id)
      });
    });
  }

  function updateHash(id: string) {
    if (id && typeof window !== 'undefined') {
      history.replaceState(null, '', '#' + id);
    }
  }
}

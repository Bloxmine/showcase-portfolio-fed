'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ScrollAnimations() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    gsap.registerPlugin(ScrollTrigger)

    // Configure ScrollTrigger
    ScrollTrigger.config({
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
      ignoreMobileResize: true,
    })

    // Better touch device detection
    const isTouchDevice = (() => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches
      const lacksHover = window.matchMedia('(hover: none)').matches
      const isProbablyIPad = hasTouch && (hasCoarsePointer || lacksHover || navigator.maxTouchPoints > 0)
      return isProbablyIPad || hasCoarsePointer || lacksHover
    })()

    console.log('Touch device detected:', isTouchDevice)

    // Create chromatic aberration layers
    const allSectionInners = document.querySelectorAll('.section-inner')
    allSectionInners.forEach((sectionInner) => {
      if (sectionInner.parentElement?.classList.contains('chromatic-wrapper')) return

      const wrapper = document.createElement('div')
      wrapper.className = 'chromatic-wrapper relative w-full max-w-[900px] mx-auto'

      const cyanLayer = document.createElement('div')
      cyanLayer.className = 'chromatic-layer cyan'

      const magentaLayer = document.createElement('div')
      magentaLayer.className = 'chromatic-layer magenta'

      sectionInner.parentNode?.insertBefore(wrapper, sectionInner)
      wrapper.appendChild(cyanLayer)
      wrapper.appendChild(magentaLayer)
      wrapper.appendChild(sectionInner)
    })

    // Get sections for animation
    const sections = gsap.utils.toArray('.section:not(.landing):not(.full-width)') as HTMLElement[]

    // Set initial states
    sections.forEach((section) => {
      const sectionInner = section.querySelector('.section-inner')
      if (!sectionInner) return

      if (isTouchDevice) {
        gsap.set(sectionInner, {
          opacity: 0,
          y: 30,
          transformOrigin: 'center center',
        })
      } else {
        gsap.set(sectionInner, {
          y: -100,
          scale: 0.85,
          rotation: -3,
          opacity: 0,
          transformOrigin: 'center center',
        })
      }
    })

    // IntersectionObserver for section reveals
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target as HTMLElement
            const sectionInner = section.querySelector('.section-inner')
            if (!sectionInner) return

            if (isTouchDevice) {
              gsap.to(sectionInner, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out',
              })
            } else {
              gsap.to(sectionInner, {
                y: 0,
                scale: 1,
                rotation: 0,
                opacity: 1,
                ease: 'back.out(1.7)',
                duration: 0.8,
              })

              gsap.delayedCall(0.5, () => {
                gsap.to(sectionInner, {
                  keyframes: [
                    { rotation: 1, duration: 0.05 },
                    { rotation: -1, duration: 0.05 },
                    { rotation: 0.5, duration: 0.05 },
                    { rotation: 0, duration: 0.05 },
                  ],
                  ease: 'power2.out',
                })
              })
            }

            sectionObserver.unobserve(section)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '-10% 0px -10% 0px',
      }
    )

    sections.forEach((section) => sectionObserver.observe(section))

    // Flying text animation
    const flyingTexts = gsap.utils.toArray('.flying-text') as HTMLElement[]
    const animatedSection = document.querySelector('#animated')

    if (flyingTexts.length > 0 && animatedSection) {
      flyingTexts.forEach((text, index) => {
        const speed = parseFloat(text.dataset.speed || '1')
        const isFromRight = text.style.transform.includes('translateX(100%)')
        const delay = index * 0.05

        gsap.set(text, {
          opacity: 0,
          x: isFromRight ? '120vw' : '-120vw',
        })

        gsap.to(text, {
          x: isFromRight ? '-120vw' : '120vw',
          opacity: 1,
          ease: 'none',
          delay: delay,
          scrollTrigger: {
            trigger: animatedSection,
            start: 'top 100%',
            end: 'bottom 0%',
            scrub: speed,
            refreshPriority: -1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress
              let opacity = 1

              if (progress < 0.2) {
                opacity = progress / 0.2
              } else if (progress > 0.8) {
                opacity = (1 - progress) / 0.2
              }

              gsap.set(text, { opacity: opacity })
            },
          },
        })
      })
    }

    // Disable scroll snap in animated section (desktop only)
    if (animatedSection && !isTouchDevice) {
      ScrollTrigger.create({
        trigger: animatedSection,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => {
          document.body.style.scrollSnapType = 'none'
        },
        onLeave: () => {
          document.body.style.scrollSnapType = 'y proximity'
        },
        onEnterBack: () => {
          document.body.style.scrollSnapType = 'none'
        },
        onLeaveBack: () => {
          document.body.style.scrollSnapType = 'y proximity'
        },
      })
    }

    // Refresh ScrollTrigger
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 500)

    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      sectionObserver.disconnect()
    }
  }, [])

  return null
}

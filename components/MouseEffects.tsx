'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface MouseEffectsProps {
  children: React.ReactNode
}

export default function MouseEffects({ children }: MouseEffectsProps) {
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const maxOffset = 5
    const maxRotation = 2

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1

      // Update chromatic aberration SVG filters
      const redOffset = document.getElementById('redOffset')
      const blueOffset = document.getElementById('blueOffset')

      if (redOffset && blueOffset) {
        const redDx = x * maxOffset
        const redDy = y * maxOffset
        const blueDx = -x * maxOffset
        const blueDy = -y * maxOffset

        redOffset.setAttribute('dx', redDx.toString())
        redOffset.setAttribute('dy', redDy.toString())
        blueOffset.setAttribute('dx', blueDx.toString())
        blueOffset.setAttribute('dy', blueDy.toString())
      }

      // Rotation effect for section-inner elements
      const rotation = x * maxRotation
      const sectionInners = document.querySelectorAll('.section-inner')

      sectionInners.forEach((sectionInner) => {
        gsap.to(sectionInner, {
          rotation: rotation,
          duration: 0.2,
          ease: 'power2.out',
        })

        // Get chromatic layers
        const wrapper = sectionInner.parentElement
        if (wrapper) {
          const cyanLayer = wrapper.querySelector('.chromatic-layer.cyan')
          const magentaLayer = wrapper.querySelector('.chromatic-layer.magenta')

          if (cyanLayer) {
            gsap.to(cyanLayer, {
              rotation: -rotation * 1.5,
              x: -x * 8,
              y: -y * 4,
              duration: 0.2,
              ease: 'power2.out',
            })
          }

          if (magentaLayer) {
            gsap.to(magentaLayer, {
              rotation: rotation * 2.5,
              x: x * 8,
              y: y * 4,
              duration: 0.2,
              ease: 'power2.out',
            })
          }
        }
      })
    }

    const handleMouseLeave = () => {
      // Reset chromatic aberration
      const redOffset = document.getElementById('redOffset')
      const blueOffset = document.getElementById('blueOffset')

      if (redOffset && blueOffset) {
        redOffset.setAttribute('dx', '2')
        redOffset.setAttribute('dy', '0')
        blueOffset.setAttribute('dx', '-3')
        blueOffset.setAttribute('dy', '0')
      }

      // Reset rotation
      const sectionInners = document.querySelectorAll('.section-inner')
      sectionInners.forEach((sectionInner) => {
        gsap.to(sectionInner, {
          rotation: 0,
          duration: 0.3,
          ease: 'power2.out',
        })

        const wrapper = sectionInner.parentElement
        if (wrapper) {
          const cyanLayer = wrapper.querySelector('.chromatic-layer.cyan')
          const magentaLayer = wrapper.querySelector('.chromatic-layer.magenta')

          if (cyanLayer) {
            gsap.to(cyanLayer, {
              rotation: 0,
              x: 0,
              y: 0,
              duration: 0.3,
              ease: 'power2.out',
            })
          }

          if (magentaLayer) {
            gsap.to(magentaLayer, {
              rotation: 0,
              x: 0,
              y: 0,
              duration: 0.3,
              ease: 'power2.out',
            })
          }
        }
      })
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    // Apply filter to titles
    const titles = document.querySelectorAll('h1, h2')
    titles.forEach((title) => {
      ;(title as HTMLElement).style.filter = 'url(#kill)'
    })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div ref={mainRef} id="main-content">
      {children}
    </div>
  )
}

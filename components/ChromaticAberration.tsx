'use client'

import { useEffect, useRef } from 'react'

export default function ChromaticAberration() {
  const redOffsetRef = useRef<SVGFEOffsetElement>(null)
  const blueOffsetRef = useRef<SVGFEOffsetElement>(null)

  useEffect(() => {
    const maxOffset = 5

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1
      const redDx = x * maxOffset
      const redDy = y * maxOffset
      const blueDx = -x * maxOffset
      const blueDy = -y * maxOffset

      if (redOffsetRef.current) {
        redOffsetRef.current.setAttribute('dx', String(redDx))
        redOffsetRef.current.setAttribute('dy', String(redDy))
      }
      if (blueOffsetRef.current) {
        blueOffsetRef.current.setAttribute('dx', String(blueDx))
        blueOffsetRef.current.setAttribute('dy', String(blueDy))
      }
    }

    const handleMouseLeave = () => {
      if (redOffsetRef.current) {
        redOffsetRef.current.setAttribute('dx', '2')
        redOffsetRef.current.setAttribute('dy', '0')
      }
      if (blueOffsetRef.current) {
        blueOffsetRef.current.setAttribute('dx', '-3')
        blueOffsetRef.current.setAttribute('dy', '0')
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    // Apply filter to titles
    const titles = document.querySelectorAll('h1, h2')
    titles.forEach(title => {
      (title as HTMLElement).style.filter = 'url(#kill)'
    })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <svg width="0" height="0" className="absolute">
      <filter id="kill">
        <feColorMatrix
          type="matrix"
          result="red_"
          values="4 0 0 0 0
                  0 0 0 0 0 
                  0 0 0 0 0 
                  0 0 0 1 0"
        />
        <feOffset in="red_" dx="2" dy="0" result="red" ref={redOffsetRef} />
        <feColorMatrix
          type="matrix"
          in="SourceGraphic"
          result="blue_"
          values="0 0 0 0 0
                  0 3 0 0 0 
                  0 0 10 0 0 
                  0 0 0 1 0"
        />
        <feOffset in="blue_" dx="-3" dy="0" result="blue" ref={blueOffsetRef} />
        <feBlend mode="screen" in="red" in2="blue" />
      </filter>
    </svg>
  )
}

import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'heind_',
  description: 'Portfolio of Hein Dijstelbloem',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body className={montserrat.className}>
        {children}
        
        {/* SVG Filters */}
        <svg width="0" height="0" className="hidden">
          <filter id="kill">
            <feColorMatrix type="matrix" 
              result="red_"             
              values="4 0 0 0 0
                      0 0 0 0 0 
                      0 0 0 0 0 
                      0 0 0 1 0"/>
            <feOffset in="red_" dx="2" dy="0" result="red" id="redOffset"/>
            <feColorMatrix type="matrix" 
              in="SourceGraphic"             
              result="blue_"             
              values="0 0 0 0 0
                      0 3 0 0 0 
                      0 0 10 0 0 
                      0 0 0 1 0"/>
            <feOffset in="blue_" dx="-3" dy="0" result="blue" id="blueOffset"/>    
            <feBlend mode="screen" in="red" in2="blue"/>
          </filter>
        </svg>
        
        <div id="dust-overlay"></div>
      </body>
    </html>
  )
}

import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "heind_",
  description: "Portfolio website by Hein Dijstelbloem - Web Developer, Creative Coder, Tech Enthusiast",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        
        {/* SVG Filters - Chromatic Aberration Effect */}
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <filter id="kill">
            <feColorMatrix 
              type="matrix" 
              result="red_"             
              values="1 0 0 0 0
                      0 0 0 0 0
                      1 0 1 0 0
                      0 0 0 1 0"
            />
            <feOffset in="red_" dx="2" dy="0" result="red" id="redOffset"/>
            <feColorMatrix 
              type="matrix" 
              in="SourceGraphic"             
              result="blue_"             
              values="0 0 0 0 0
                      0 3 0 0 0 
                      0 0 10 0 0 
                      0 0 0 1 0"
            />
            <feOffset in="blue_" dx="-3" dy="0" result="blue" id="blueOffset"/>    
            <feBlend mode="screen" in="red" in2="blue"/>
          </filter>
          
          <filter id="cymk-printing-offset">
            <feColorMatrix 
              in="SourceGraphic" 
              type="matrix" 
              values="0.3 0 0 0 0
                      0 0.59 0 0 0
                      0 0 0.11 0 0
                      0 0 0 1 0" 
              result="gray"
            />
            <feComponentTransfer in="gray" result="cyan">
              <feFuncR type="table" tableValues="1 0"/>
              <feFuncG type="table" tableValues="1 0"/>
              <feFuncB type="table" tableValues="1 0"/>
            </feComponentTransfer>
            <feComponentTransfer in="gray" result="magenta">
              <feFuncR type="table" tableValues="1 0"/>
              <feFuncG type="table" tableValues="0 1"/>
              <feFuncB type="table" tableValues="1 0"/>
            </feComponentTransfer>
            <feComponentTransfer in="gray" result="yellow">
              <feFuncR type="table" tableValues="1 0"/>
              <feFuncG type="table" tableValues="1 0"/>
              <feFuncB type="table" tableValues="0 1"/>
            </feComponentTransfer>
            <feOffset in="cyan" dx="-2" dy="0" result="cyanOffset"/>
            <feOffset in="magenta" dx="2" dy="0" result="magentaOffset"/>
            <feOffset in="yellow" dx="0" dy="2" result="yellowOffset"/>
            <feBlend mode="screen" in="cyanOffset" in2="magentaOffset" result="cmBlend"/>
            <feBlend mode="screen" in="cmBlend" in2="yellowOffset"/>
          </filter>
        </svg>
        
        {/* Dust Overlay */}
        <div id="dust-overlay" />
        
        {/* GSAP Scripts */}
        <Script 
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
          strategy="beforeInteractive"
        />
        <Script 
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}

import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'heind_ Portfolio',
  description: 'Portfolio website',
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

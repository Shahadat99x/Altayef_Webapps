import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: 'Altayef Visa',
    template: '%s | Altayef Visa',
  },
  description: 'Government-approved visa processing agency based in Dhaka, Bangladesh. Your trusted partner for global mobility.',
  icons: {
    icon: '/brand/icon.svg',
    shortcut: '/brand/icon.svg',
    apple: '/brand/icon.svg',
  },
  openGraph: {
    siteName: 'Altayef Visa',
    images: [
      {
        url: '/brand/logo.svg', // Fallback OG image
        width: 800,
        height: 600,
      }
    ]
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  )
}

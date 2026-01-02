import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Altayef Webapps - Visa Processing Agency',
  description:
    'Government-approved visa processing agency based in Dhaka, Bangladesh.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen antialiased bg-gray-50 text-gray-900`}
      >
        {children}
      </body>
    </html>
  )
}

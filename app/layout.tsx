import type { Metadata } from 'next'
import './globals.css'
import { getSiteUrl } from '@/lib/utils/site-url'

// Generate metadata with proper canonical URLs
export async function generateMetadata(): Promise<Metadata> {
    const siteUrl = getSiteUrl()

    return {
        metadataBase: new URL(siteUrl),
        title: {
            default: 'Altayef | Government-Approved Visa Processing Agency',
            template: '%s | Altayef',
        },
        description: 'Government-approved visa processing agency based in Dhaka, Bangladesh. Your trusted partner for Saudi Arabia, Gulf countries, and global mobility. Licensed by Bangladesh government.',
        keywords: ['visa processing', 'immigration', 'Saudi Arabia visa', 'work visa', 'Bangladesh', 'government approved', 'manpower agency', 'Dhaka'],
        authors: [{ name: 'Altayef Overseas' }],
        creator: 'Altayef Overseas',
        publisher: 'Altayef Overseas',
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        alternates: {
            canonical: siteUrl,
            languages: {
                'en': siteUrl,
            },
        },
        openGraph: {
            type: 'website',
            locale: 'en_US',
            url: siteUrl,
            siteName: 'Altayef Overseas',
            title: 'Altayef | Government-Approved Visa Processing Agency',
            description: 'Government-approved visa processing agency based in Dhaka, Bangladesh. Your trusted partner for Saudi Arabia, Gulf countries, and global mobility.',
            images: [
                {
                    url: `${siteUrl}/brand/og-image.png`,
                    width: 1200,
                    height: 630,
                    alt: 'Altayef - Government-Approved Visa Processing Agency',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Altayef | Government-Approved Visa Processing Agency',
            description: 'Government-approved visa processing agency based in Dhaka, Bangladesh. Your trusted partner for global mobility.',
            images: [`${siteUrl}/brand/og-image.png`],
            creator: '@altayef',
        },
        verification: {
            google: 'google-site-verification-code', // Replace with actual code
        },
        icons: {
            icon: '/brand/logo-mark.png',
            shortcut: '/brand/logo-mark.png',
            apple: '/brand/logo-mark.png',
        },
    }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  )
}

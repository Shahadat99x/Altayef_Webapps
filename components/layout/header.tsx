'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { SiteSettings } from '@/lib/models/schema'

const NAV_LINKS = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/countries', label: 'Countries' },
    { href: '/knowledge-center', label: 'Knowledge' },
    { href: '/verify-license', label: 'Verify License' },
    { href: '/contact', label: 'Contact' },
]

export function Header({ settings }: { settings?: Partial<SiteSettings> | null }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const pathname = usePathname()

    const brandName = settings?.siteName || 'Altayef Visa'
    const logoUrl = settings?.logoMarkUrl || '/brand/logo-mark.png'
    const ctaText = settings?.primaryCTA || 'Book Consultation'

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <div className="flex items-center">
                    <Link href="/" className="flex items-center gap-3 font-bold text-xl text-slate-900 dark:text-slate-50">
                        <div className="relative h-9 w-9 overflow-hidden rounded-md bg-white p-1 shadow-sm">
                            <Image
                                src={logoUrl}
                                alt={brandName}
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-slate-900 dark:text-slate-50 leading-tight">{brandName}</span>
                        </div>
                    </Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-medium transition-colors hover:text-blue-600 ${pathname === link.href
                                ? 'text-blue-600'
                                : 'text-slate-600 dark:text-slate-400'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        {ctaText}
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-slate-600 dark:text-slate-400"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <span className="sr-only">Open menu</span>
                    {mobileMenuOpen ? (
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    ) : (
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                    )}
                </button>
            </div >

            {/* Mobile Menu */}
            {
                mobileMenuOpen && (
                    <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-6 space-y-4 shadow-lg">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block text-base font-medium ${pathname === link.href
                                    ? 'text-blue-600'
                                    : 'text-slate-600 dark:text-slate-400'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-4">
                            <Link
                                href="/contact"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block w-full text-center rounded-md bg-blue-600 px-4 py-2 text-base font-semibold text-white hover:bg-blue-700"
                            >
                                {ctaText}
                            </Link>
                        </div>
                    </div>
                )
            }
        </header >
    )
}

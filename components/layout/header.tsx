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
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <div className="flex items-center">
                    <Link href="/" className="flex items-center gap-3 font-bold text-xl text-slate-900">
                        <div className="relative h-11 w-11 rounded-md shadow-sm" style={{ backgroundColor: '#ffffff' }}>
                            <Image
                                src={logoUrl}
                                alt={brandName}
                                fill
                                className="object-contain p-0.5"
                                priority
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-slate-900 leading-tight">{brandName}</span>
                        </div>
                    </Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-semibold transition-colors hover:text-blue-600 ${pathname === link.href
                                ? 'text-blue-600'
                                : 'text-slate-600'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95"
                    >
                        {ctaText}
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-slate-600 hover:text-slate-900"
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
                    <div className="md:hidden border-t border-slate-100 bg-white px-4 py-6 space-y-4 shadow-xl absolute w-full left-0">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block text-base font-medium p-2 rounded-lg hover:bg-slate-50 transition-colors ${pathname === link.href
                                    ? 'text-blue-600 bg-blue-50'
                                    : 'text-slate-600'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-4 border-t border-slate-100">
                            <Link
                                href="/contact"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block w-full text-center rounded-lg bg-blue-600 px-4 py-3 text-base font-bold text-white hover:bg-blue-700"
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

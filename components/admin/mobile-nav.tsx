'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Pages', href: '/admin/pages' },
    { name: 'Services', href: '/admin/services' },
    { name: 'Countries', href: '/admin/countries' },
    { name: 'Verify License', href: '/admin/verify-license' },
    { name: 'Knowledge Center', href: '/admin/knowledge' },
    { name: 'Team', href: '/admin/team' },
    { name: 'Testimonials', href: '/admin/testimonials' },
    { name: 'Enquiries', href: '/admin/enquiries' },
    { name: 'Settings', href: '/admin/settings' },
]

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    return (
        <div className="md:hidden">
            {/* Hamburger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-4 text-gray-600 focus:outline-none"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Drawer */}
            <div className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-6 text-xl font-bold border-b border-gray-800 flex justify-between items-center">
                    <span>Altayef Admin</span>
                    <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`block px-4 py-2 rounded transition-colors ${pathname === item.href ? 'bg-blue-700 text-white' : 'hover:bg-gray-800'
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <form action="/api/auth/signout" method="post">
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-800 rounded text-red-400">
                            Sign Out
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

import Link from 'next/link'
import Image from 'next/image'
import { getSiteSettings } from '@/lib/data/settings'

export async function Footer() {
    const settings = await getSiteSettings()

    // Fallbacks
    const brandName = settings?.siteName || 'Altayef Visa'
    const logoUrl = settings?.logoMarkUrl || '/brand/logo-mark.png'
    const footerText = settings?.footerText || 'Government-approved visa processing agency based in Dhaka, Bangladesh. Your trusted partner for global mobility.'
    const address = settings?.address || 'Dhaka, Bangladesh'
    const social = settings?.socialLinks || {}

    return (
        <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-slate-50 mb-4">
                            <div className="relative h-9 w-auto min-w-[36px] overflow-hidden rounded-md bg-white p-1 shadow-sm aspect-square">
                                <Image
                                    src={logoUrl}
                                    alt={brandName}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="font-bold text-slate-900 dark:text-slate-50">{brandName}</span>
                        </Link>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            {footerText}
                        </p>
                        <div className="flex gap-4 mt-4">
                            {social.facebook && <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-600">FB</a>}
                            {social.linkedin && <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-700">LI</a>}
                            {social.instagram && <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-pink-600">IG</a>}
                            {social.youtube && <a href={social.youtube} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-red-600">YT</a>}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Services</h3>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <li><Link href="/services" className="hover:text-blue-600">Work Visas</Link></li>
                            <li><Link href="/services" className="hover:text-blue-600">Student Visas</Link></li>
                            <li><Link href="/services" className="hover:text-blue-600">Immigration</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Company</h3>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <li><Link href="/about/team" className="hover:text-blue-600">Our Team</Link></li>
                            <li><Link href="/about/testimonials" className="hover:text-blue-600">Testimonials</Link></li>
                            <li><Link href="/knowledge-center" className="hover:text-blue-600">Knowledge Center</Link></li>
                            <li><Link href="/verify-license" className="hover:text-blue-600">Verify License</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Contact</h3>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <li>{address}</li>
                            <li><Link href="/contact" className="hover:text-blue-600">Contact Us</Link></li>
                            {settings?.email && <li><a href={`mailto:${settings.email}`} className="hover:text-blue-600">{settings.email}</a></li>}
                            {settings?.phone && <li><a href={`tel:${settings.phone}`} className="hover:text-blue-600">{settings.phone}</a></li>}
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
                    <p>&copy; {new Date().getFullYear()} {brandName}. All rights reserved.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <Link href="/privacy-policy" className="hover:text-slate-900 dark:hover:text-slate-300">Privacy Policy</Link>
                        <Link href="/terms-of-service" className="hover:text-slate-900 dark:hover:text-slate-300">Terms of Service</Link>
                    </div>
                </div>
            </div >
        </footer >
    )
}

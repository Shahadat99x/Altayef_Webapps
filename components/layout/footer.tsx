import Link from 'next/link'
import Image from 'next/image'
import { getSiteSettings } from '@/lib/data/settings'

export async function Footer() {
    const settings = await getSiteSettings()

    // Fallbacks - handle empty strings
    const brandName = settings?.siteName || 'Altayef Visa'
    const logoMarkUrl = (settings?.logoMarkUrl && settings.logoMarkUrl.trim()) || '/brand/logo-mark.png'
    const footerText = settings?.footerText || 'Government-approved visa processing agency based in Dhaka, Bangladesh. Your trusted partner for global mobility.'
    const address = settings?.address || 'Dhaka, Bangladesh'
    const social = settings?.socialLinks || {}

    return (
        <footer className="bg-[#0B1220] text-slate-100 dark:bg-[#0B1220]">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-white p-1 shadow-sm">
                                <Image
                                    src={logoMarkUrl}
                                    alt={brandName}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="font-bold text-lg text-white">{brandName}</span>
                        </Link>
                        <p className="text-sm text-slate-400 leading-relaxed mb-6">
                            {footerText}
                        </p>
                        <div className="flex gap-4">
                            {social.facebook && <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">FB</a>}
                            {social.linkedin && <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">LI</a>}
                            {social.instagram && <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">IG</a>}
                            {social.youtube && <a href={social.youtube} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">YT</a>}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Services</h3>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><Link href="/services" className="hover:text-blue-400 transition-colors">Work Visas</Link></li>
                            <li><Link href="/services" className="hover:text-blue-400 transition-colors">Student Visas</Link></li>
                            <li><Link href="/services" className="hover:text-blue-400 transition-colors">Immigration</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Company</h3>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><Link href="/about/team" className="hover:text-blue-400 transition-colors">Our Team</Link></li>
                            <li><Link href="/about/testimonials" className="hover:text-blue-400 transition-colors">Testimonials</Link></li>
                            <li><Link href="/knowledge-center" className="hover:text-blue-400 transition-colors">Knowledge Center</Link></li>
                            <li><Link href="/verify-license" className="hover:text-blue-400 transition-colors">Verify License</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Contact</h3>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li>{address}</li>
                            <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
                            {settings?.email && <li><a href={`mailto:${settings.email}`} className="hover:text-blue-400 transition-colors">{settings.email}</a></li>}
                            {settings?.phone && <li><a href={`tel:${settings.phone}`} className="hover:text-blue-400 transition-colors">{settings.phone}</a></li>}
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
                    <p>&copy; {new Date().getFullYear()} {brandName}. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
                        <Link href="/terms-of-service" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div >
        </footer >
    )
}

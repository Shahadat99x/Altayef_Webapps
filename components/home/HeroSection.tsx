'use client'

import Link from 'next/link'
import { License } from '@/lib/models/schema'
import { Reveal } from '@/components/motion'
import { AgencyStatusCard } from './AgencyStatusCard'

export function HeroSection({ license }: { license?: License | null }) {
    return (
        <section className="relative bg-slate-50 py-20 lg:py-28 overflow-hidden">
            {/* Background Pattern - Subtle & Clean */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* Left: Content */}
                    <div className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
                        <Reveal delay={0}>
                            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10 mb-6">
                                <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
                                Government Approved Agency
                            </div>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl mb-6">
                                Simplifying Your Journey <span className="text-blue-600">Abroad</span>
                            </h1>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <p className="text-lg leading-8 text-slate-600 mb-8">
                                Official visa processing partner for Saudi Arabia and the Middle East.
                                Transparency, speed, and 100% compliance with government regulations.
                            </p>
                        </Reveal>
                        <Reveal delay={0.3}>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link
                                    href="/contact"
                                    className="rounded-xl bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-blue-700 hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all active:scale-95 motion-reduce:hover:translate-y-0"
                                >
                                    Book Consultation
                                </Link>
                                {license?.whatsapp && (
                                    <a
                                        href={`https://wa.me/${license.whatsapp}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-xl bg-white px-8 py-4 text-base font-bold text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 motion-reduce:hover:translate-y-0"
                                    >
                                        <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.215-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                                        WhatsApp
                                    </a>
                                )}
                            </div>
                        </Reveal>
                    </div>

                    {/* Right: Agency Status Card */}
                    <Reveal delay={0.2} className="relative mx-auto w-full max-w-lg lg:mx-0">
                        {/* Decorative background blobs */}
                        <div className="absolute top-0 -right-4 -z-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                        <div className="absolute -bottom-8 -left-4 -z-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

                        <AgencyStatusCard
                            licenseNumber={license?.licenseNumber || '1851'}
                            statusText="Active & Verified"
                        />
                    </Reveal>
                </div>
            </div>
        </section>
    )
}

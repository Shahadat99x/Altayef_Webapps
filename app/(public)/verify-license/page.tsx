import { getLicensePublic } from '@/lib/data/license'
import { Metadata } from 'next'
import { PageShell } from '@/components/public/PageShell'
import { Card } from '@/components/public/Card'

export const metadata: Metadata = {
    title: 'Verify License | Altayef - Government Approved Agency',
    description: 'Official license verification details for Altayef, a government-approved visa processing agency in Dhaka, Bangladesh.',
}

export default async function VerifyLicensePage() {
    const license = await getLicensePublic()

    if (!license) {
        return (
            <PageShell title="Verify License">
                <div className="flex items-center justify-center py-20">
                    <div className="text-center bg-slate-50 p-10 rounded-2xl border border-dashed border-slate-200">
                        <h1 className="text-2xl font-bold text-slate-400 mb-2">Details Unavailable</h1>
                        <p className="text-slate-500">License verification details are currently being updated. Please check back later.</p>
                    </div>
                </div>
            </PageShell>
        )
    }

    return (
        <PageShell
            title="Verify Our License"
            description="Official compliance information for your safety and trust."
        >
            <div className="max-w-3xl mx-auto">
                <Card className="overflow-hidden border-slate-200 shadow-lg">
                    <div className="bg-slate-900 px-8 py-10 text-center text-white relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold mb-6 tracking-tight">{license.agencyLegalName}</h2>
                            <div className="inline-flex flex-col items-center p-4 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm">
                                <span className="text-blue-200 text-xs uppercase tracking-widest font-bold mb-1">Government License No</span>
                                <span className="text-3xl font-mono font-bold tracking-wider">{license.licenseNumber}</span>
                            </div>
                            <p className="mt-4 text-slate-400 text-sm">Issued by {license.issuingAuthority}</p>
                        </div>
                    </div>

                    <div className="p-8 md:p-10 space-y-10">
                        {/* Office Info */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    Registered Office
                                </h3>
                                <p className="text-slate-600 whitespace-pre-line leading-relaxed pl-7 border-l-2 border-slate-100">{license.officeAddress}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Contact Details
                                </h3>
                                <div className="space-y-2 pl-7 border-l-2 border-slate-100">
                                    <p className="text-slate-600"><span className="font-medium text-slate-900">Phone:</span> {license.phone}</p>
                                    {license.whatsapp && <p className="text-slate-600"><span className="font-medium text-slate-900">WhatsApp:</span> {license.whatsapp}</p>}
                                    {license.email && <p className="text-slate-600"><span className="font-medium text-slate-900">Email:</span> {license.email}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-slate-100 pt-8">
                            {/* Verification Steps */}
                            {license.verificationSteps.length > 0 && (
                                <section className="mb-8">
                                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                                        <div className="bg-green-100 p-1.5 rounded-full mr-3">
                                            <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        How to Verify This License Independently
                                    </h3>
                                    <ol className="space-y-3 ml-2">
                                        {license.verificationSteps.map((step, idx) => (
                                            <li key={idx} className="flex gap-3 text-slate-600 text-sm">
                                                <span className="flex-shrink-0 font-bold text-slate-300">{idx + 1}.</span>
                                                <span className="leading-relaxed">{step}</span>
                                            </li>
                                        ))}
                                    </ol>
                                </section>
                            )}

                            {/* Disclaimer */}
                            <div className="bg-amber-50 rounded-lg p-5 border border-amber-100 flex gap-4">
                                <div className="flex-shrink-0 mt-0.5">
                                    <svg className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-amber-800 mb-1">Anti-Fraud Warning</h4>
                                    <p className="text-sm text-amber-700 leading-relaxed">
                                        Always verify payments and receipts against the official contact information listed above. We do not use personal agents for transactions.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </PageShell>
    )
}

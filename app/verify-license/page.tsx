import { getLicensePublic } from '@/lib/data/license'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Verify License | Altayef - Government Approved Agency',
    description: 'Official license verification details for Altayef, a government-approved visa processing agency in Dhaka, Bangladesh.',
}

export default async function VerifyLicensePage() {
    const license = await getLicensePublic()

    if (!license) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-300 mb-2">Details Unavailable</h1>
                    <p className="text-gray-500">License verification details are currently being updated. Please check back later.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Verify Our License</h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Official compliance information for your safety and trust.
                    </p>
                </div>

                <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                    <div className="bg-blue-600 px-6 py-8 text-center text-white">
                        <h2 className="text-2xl font-bold">{license.agencyLegalName}</h2>
                        <div className="mt-4 inline-flex items-center px-4 py-2 bg-blue-700 rounded-lg border border-blue-500">
                            <span className="text-blue-200 text-sm uppercase tracking-wider font-semibold mr-2">License No:</span>
                            <span className="text-xl font-mono tracking-widest">{license.licenseNumber}</span>
                        </div>
                        <p className="mt-2 text-blue-100 text-sm">Issued by {license.issuingAuthority}</p>
                    </div>

                    <div className="p-8 space-y-8">
                        {/* Verification Steps */}
                        {license.verificationSteps.length > 0 && (
                            <section>
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    How to Verify
                                </h3>
                                <ol className="list-decimal list-inside space-y-2 text-gray-600 ml-1">
                                    {license.verificationSteps.map((step, idx) => (
                                        <li key={idx} className="pl-2">{step}</li>
                                    ))}
                                </ol>
                            </section>
                        )}

                        {/* Office Info */}
                        <section className="grid md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl">
                            <div>
                                <h3 className="font-bold text-gray-900 mb-2">Registered Office</h3>
                                <p className="text-gray-600 whitespace-pre-line">{license.officeAddress}</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 mb-2">Contact</h3>
                                <p className="text-gray-600">Phone: {license.phone}</p>
                                {license.whatsapp && <p className="text-gray-600">WhatsApp: {license.whatsapp}</p>}
                                {license.email && <p className="text-gray-600">Email: {license.email}</p>}
                            </div>
                        </section>

                        {/* Disclaimer */}
                        <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4 rounded-r">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-yellow-700">
                                        <strong>Anti-Fraud Warning:</strong> Always verify payments and receipts against the official contact information listed above. We do not use personal agents for transactions.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

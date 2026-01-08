import { getEnquiryById } from '@/lib/data/enquiries'
import { getServiceById } from '@/lib/data/services'
import { getCountryById } from '@/lib/data/countries'
import { notFound } from 'next/navigation'
import EnquiryStatusForm from '@/components/admin/enquiry-status-form'

export default async function AdminEnquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const enquiry = await getEnquiryById(id)

    if (!enquiry) {
        notFound()
    }

    // Resolve references if they exist
    const service = enquiry.interestedServiceId ? await getServiceById(enquiry.interestedServiceId.toString()) : null
    const country = enquiry.countryId ? await getCountryById(enquiry.countryId.toString()) : null

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Enquiry Details</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Info */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Client Information</h2>
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                                <dd className="mt-1 text-sm text-gray-900">{enquiry.fullName}</dd>
                            </div>
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500">Preferred Method</dt>
                                <dd className="mt-1 text-sm text-gray-900">{enquiry.preferredContactMethod || 'N/A'}</dd>
                            </div>
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500">Phone / WhatsApp</dt>
                                <dd className="mt-1 text-sm text-gray-900">{enquiry.phoneOrWhatsapp}</dd>
                            </div>
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500">Email</dt>
                                <dd className="mt-1 text-sm text-gray-900">{enquiry.email || 'N/A'}</dd>
                            </div>
                        </dl>
                    </div>

                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Request Details</h2>
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-6">
                            {service && (
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Interested Service</dt>
                                    <dd className="mt-1 text-sm text-gray-900 font-semibold">{service.title}</dd>
                                </div>
                            )}
                            {country && (
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Target Country</dt>
                                    <dd className="mt-1 text-sm text-gray-900 font-semibold">{country.name}</dd>
                                </div>
                            )}
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Message</dt>
                                <dd className="mt-2 text-sm text-gray-900 bg-gray-50 p-3 rounded">{enquiry.message}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Source</dt>
                                <dd className="mt-1 text-sm text-gray-500">{enquiry.source}</dd>
                            </div>
                        </dl>
                    </div>
                </div>

                {/* Management Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Management</h2>
                        <EnquiryStatusForm
                            id={id}
                            initialStatus={enquiry.status}
                            initialNotes={enquiry.adminNotes || ''}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

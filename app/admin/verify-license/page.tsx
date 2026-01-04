import { getLicenseAdminOrCreateDraft } from '@/lib/data/license'
import EditLicenseForm from './form'

export default async function AdminLicensePage() {
    // Fetches the singleton or creates a draft if none exists
    const license = await getLicenseAdminOrCreateDraft()

    // Serialize ID
    const serializedLicense = {
        ...license,
        _id: license._id?.toString()
    }

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-2">Verify License & Compliance</h1>
            <p className="text-gray-500 mb-6">Manage the official agency license details shown to the public.</p>
            <EditLicenseForm license={serializedLicense} />
        </div>
    )
}

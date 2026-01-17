import { getLicenseAdminOrCreateDraft } from '@/lib/data/license'
import EditLicenseForm from './form'

export default async function AdminLicensePage() {
    const license = await getLicenseAdminOrCreateDraft()

    // Serialize for client component
    const serializedLicense = JSON.parse(JSON.stringify(license))

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Verify License Configuration</h1>
            <p className="text-slate-600 mb-8">
                Configure the license information that appears on your public Verify License page.
                Set status to &quot;Published&quot; to make it visible to visitors.
            </p>
            <EditLicenseForm license={serializedLicense} />
        </div>
    )
}

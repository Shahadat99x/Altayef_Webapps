import { auth } from '@/auth'
import { getSiteSettings } from '@/lib/data/settings'
import { redirect } from 'next/navigation'
import { SettingsForm } from './form'

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
    const session = await auth()
    if (!session?.user || (session.user.role !== 'superadmin' && session.user.role !== 'editor')) {
        redirect('/admin')
    }

    const settings = await getSiteSettings()

    // Safe defaults
    const defaults = {
        siteName: settings?.siteName || 'Altayef Visa',
        phone: settings?.phone || '',
        whatsapp: settings?.whatsapp || '',
        email: settings?.email || '',
        address: settings?.address || '',
        mapUrl: settings?.mapUrl || '',
        primaryCTA: settings?.primaryCTA || 'Book Consultation',
        footerText: settings?.footerText || '',
        social: settings?.socialLinks || {}
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Site Settings</h1>
                <p className="text-gray-500 mt-2">Manage global settings, contact info, and branding.</p>
            </div>

            <SettingsForm defaults={defaults} />
        </div>
    )
}

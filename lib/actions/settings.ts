'use server'

import { auth } from '@/auth'
import { upsertSiteSettings } from '@/lib/data/settings'
import { revalidatePath } from 'next/cache'
import { SiteSettings } from '@/lib/models/schema'

export async function updateSiteSettingsAction(prevState: unknown, formData: FormData) {
    const session = await auth()

    if (!session?.user || (session.user.role !== 'superadmin' && session.user.role !== 'editor')) {
        return { success: false, message: 'Unauthorized' }
    }

    try {
        const rawData: Record<string, unknown> = {
            siteName: formData.get('siteName'),
            phone: formData.get('phone'),
            whatsapp: formData.get('whatsapp'),
            email: formData.get('email'),
            logoMarkUrl: formData.get('logoMarkUrl'),
            logoLockupUrl: formData.get('logoLockupUrl'),
            address: formData.get('address'),
            mapUrl: formData.get('mapUrl'),
            primaryCTA: formData.get('primaryCTA'),
            footerText: formData.get('footerText'),
            socialLinks: {
                facebook: formData.get('social.facebook'),
                instagram: formData.get('social.instagram'),
                youtube: formData.get('social.youtube'),
                tiktok: formData.get('social.tiktok'),
                linkedin: formData.get('social.linkedin'),
            }
        }

        // Clean up empty strings in socialLinks and optional fields
        const socialLinks = rawData.socialLinks as Record<string, unknown>
        Object.keys(socialLinks).forEach(key => {
            if (socialLinks[key] === '') {
                socialLinks[key] = undefined
            }
        })

        // Perform update
        await upsertSiteSettings(rawData as unknown as Partial<SiteSettings>)

        revalidatePath('/')
        revalidatePath('/admin/settings')

        return { success: true, message: 'Settings updated successfully' }
    } catch (error: unknown) {
        console.error('Failed to update settings:', error)
        const err = error as Error
        return { success: false, message: err.message || 'Failed to update settings' }
    }
}

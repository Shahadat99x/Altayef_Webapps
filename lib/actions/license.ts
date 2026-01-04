'use server'

import { auth } from '@/auth'
import { updateLicense } from '@/lib/data/license'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export type ActionState = { error?: string; errors?: Record<string, string[]> } | null

const LicenseFormSchema = z.object({
    agencyLegalName: z.string().min(2),
    licenseNumber: z.string().min(1),
    issuingAuthority: z.string().min(2),
    licenseScanUrl: z.string().optional(),
    verificationSteps: z.string().optional(), // Multiline
    officeAddress: z.string().min(5),
    phone: z.string().min(5),
    whatsapp: z.string().optional(),
    email: z.string().email().optional().or(z.literal('')),
    notes: z.string().optional(),
    status: z.enum(['draft', 'published', 'archived']),
})

export async function updateLicenseAction(prevState: ActionState, formData: FormData) {
    const session = await auth()
    if (!session?.user?.role || !['superadmin'].includes(session.user.role)) {
        // Intentionally strict: only superadmin for license details
        return { error: 'Unauthorized' }
    }

    const validatedFields = LicenseFormSchema.safeParse({
        agencyLegalName: formData.get('agencyLegalName'),
        licenseNumber: formData.get('licenseNumber'),
        issuingAuthority: formData.get('issuingAuthority'),
        licenseScanUrl: formData.get('licenseScanUrl') || undefined,
        verificationSteps: formData.get('verificationSteps'),
        officeAddress: formData.get('officeAddress'),
        phone: formData.get('phone'),
        whatsapp: formData.get('whatsapp') || undefined,
        email: formData.get('email') || undefined,
        notes: formData.get('notes') || undefined,
        status: formData.get('status'),
    })

    if (!validatedFields.success) {
        return { error: 'Validation failed', errors: validatedFields.error.flatten().fieldErrors }
    }

    const { data } = validatedFields

    const splitLines = (str?: string) => str ? str.split('\n').map(s => s.trim()).filter(Boolean) : []

    try {
        const success = await updateLicense({
            ...data,
            verificationSteps: splitLines(data.verificationSteps)
        })
        if (!success) {
            return { error: 'Failed to update license. Single record might be missing.' }
        }
    } catch {
        return { error: 'Database Error: Failed to update license.' }
    }

    revalidatePath('/admin/verify-license')
    revalidatePath('/verify-license')
    return { error: undefined } // Success state, no redirect needed as it's a single page form
}

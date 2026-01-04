'use server'

import { auth } from '@/auth'
import { createCountry, updateCountry, setCountryStatus } from '@/lib/data/countries'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export type ActionState = { error?: string; errors?: Record<string, string[]> } | null

// Basic input validation using Zod
const CountryFormSchema = z.object({
    name: z.string().min(2),
    slug: z.string().optional(),
    overview: z.string().min(10),
    content: z.string().optional(),
    supportedVisaTypes: z.string().optional(), // CSV or newline
    requirements: z.string().optional(), // CSV or newline
    processSteps: z.string().optional(), // CSV or newline
    timelineText: z.string(),
    feesDisclaimer: z.string().optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    featured: z.coerce.boolean(),
    status: z.enum(['draft', 'published', 'archived']),
})

export async function createCountryAction(prevState: ActionState, formData: FormData) {
    const session = await auth()
    if (!session?.user?.role || !['superadmin', 'editor'].includes(session.user.role)) {
        return { error: 'Unauthorized' }
    }

    const validatedFields = CountryFormSchema.safeParse({
        name: formData.get('name'),
        slug: formData.get('slug') || undefined,
        overview: formData.get('overview'),
        content: formData.get('content'),
        supportedVisaTypes: formData.get('supportedVisaTypes'),
        requirements: formData.get('requirements'),
        processSteps: formData.get('processSteps'),
        timelineText: formData.get('timelineText'),
        feesDisclaimer: formData.get('feesDisclaimer'),
        seoTitle: formData.get('seoTitle'),
        seoDescription: formData.get('seoDescription'),
        featured: formData.get('featured') === 'on',
        status: formData.get('status'),
    })

    if (!validatedFields.success) {
        return { error: 'Validation failed', errors: validatedFields.error.flatten().fieldErrors }
    }

    const { data } = validatedFields

    // Helper to split lines
    const splitLines = (str?: string) => str ? str.split('\n').map(s => s.trim()).filter(Boolean) : []

    try {
        const payload = {
            ...data,
            supportedVisaTypes: splitLines(data.supportedVisaTypes),
            requirements: splitLines(data.requirements),
            processSteps: splitLines(data.processSteps),
            seo: {
                title: data.seoTitle,
                description: data.seoDescription
            }
        }
        await createCountry(payload)
    } catch {
        return { error: 'Database Error: Failed to create country.' }
    }

    revalidatePath('/admin/countries')
    revalidatePath('/countries')
    redirect('/admin/countries')
}

export async function updateCountryAction(id: string, prevState: ActionState, formData: FormData) {
    const session = await auth()
    if (!session?.user?.role || !['superadmin', 'editor'].includes(session.user.role)) {
        return { error: 'Unauthorized' }
    }

    const validatedFields = CountryFormSchema.safeParse({
        name: formData.get('name'),
        slug: formData.get('slug') || undefined,
        overview: formData.get('overview'),
        content: formData.get('content'),
        supportedVisaTypes: formData.get('supportedVisaTypes'),
        requirements: formData.get('requirements'),
        processSteps: formData.get('processSteps'),
        timelineText: formData.get('timelineText'),
        feesDisclaimer: formData.get('feesDisclaimer'),
        seoTitle: formData.get('seoTitle'),
        seoDescription: formData.get('seoDescription'),
        featured: formData.get('featured') === 'on',
        status: formData.get('status'),
    })

    if (!validatedFields.success) {
        return { error: 'Validation failed', errors: validatedFields.error.flatten().fieldErrors }
    }

    const { data } = validatedFields
    const splitLines = (str?: string) => str ? str.split('\n').map(s => s.trim()).filter(Boolean) : []

    try {
        await updateCountry(id, {
            ...data,
            supportedVisaTypes: splitLines(data.supportedVisaTypes),
            requirements: splitLines(data.requirements),
            processSteps: splitLines(data.processSteps),
            seo: {
                title: data.seoTitle,
                description: data.seoDescription
            }
        })
    } catch {
        return { error: 'Database Error: Failed to update country.' }
    }

    revalidatePath('/admin/countries')
    revalidatePath(`/admin/countries/${id}/edit`)
    revalidatePath('/countries')
    redirect('/admin/countries')
}

export async function deleteCountryAction(id: string) {
    const session = await auth()
    if (!session?.user?.role || !['superadmin'].includes(session.user.role)) {
        return { error: 'Unauthorized' }
    }

    await setCountryStatus(id, 'archived')
    revalidatePath('/admin/countries')
    revalidatePath('/countries')
}

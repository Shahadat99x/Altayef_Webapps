'use server'

import { auth } from '@/auth'
import { createService, updateService, setServiceStatus } from '@/lib/data/services'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

// Basic input validation using Zod
const ServiceFormSchema = z.object({
    title: z.string().min(3),
    slug: z.string().optional(), // optional on input, generated if empty
    summary: z.string().min(10),
    content: z.string().min(10),
    requirements: z.string().optional(), // handled as CSV string or multiline in form
    timelineText: z.string(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    featured: z.coerce.boolean(),
    status: z.enum(['draft', 'published', 'archived']),
})

export type ActionState = { error?: string; errors?: Record<string, string[]> } | null

export async function createServiceAction(prevState: ActionState, formData: FormData) {
    const session = await auth()
    if (!session?.user?.role || !['superadmin', 'editor'].includes(session.user.role)) {
        return { error: 'Unauthorized' }
    }

    const validatedFields = ServiceFormSchema.safeParse({
        title: formData.get('title'),
        slug: formData.get('slug') || undefined,
        summary: formData.get('summary'),
        content: formData.get('content'),
        requirements: formData.get('requirements'),
        timelineText: formData.get('timelineText'),
        seoTitle: formData.get('seoTitle'),
        seoDescription: formData.get('seoDescription'),
        featured: formData.get('featured') === 'on',
        status: formData.get('status'),
    })

    if (!validatedFields.success) {
        return { error: 'Validation failed', errors: validatedFields.error.flatten().fieldErrors }
    }

    const { data } = validatedFields

    // Transform requirements string to array
    const requirementsArray = data.requirements
        ? data.requirements.split('\n').map(r => r.trim()).filter(Boolean)
        : []

    try {
        const payload = {
            ...data,
            requirements: requirementsArray,
            seo: {
                title: data.seoTitle,
                description: data.seoDescription
            }
        }
        await createService(payload)
    } catch {
        return { error: 'Database Error: Failed to create service.' }
    }

    revalidatePath('/admin/services')
    revalidatePath('/services')
    redirect('/admin/services')
}

export async function updateServiceAction(id: string, prevState: ActionState, formData: FormData) {
    const session = await auth()
    if (!session?.user?.role || !['superadmin', 'editor'].includes(session.user.role)) {
        return { error: 'Unauthorized' }
    }

    const validatedFields = ServiceFormSchema.safeParse({
        title: formData.get('title'),
        slug: formData.get('slug') || undefined,
        summary: formData.get('summary'),
        content: formData.get('content'),
        requirements: formData.get('requirements'),
        timelineText: formData.get('timelineText'),
        seoTitle: formData.get('seoTitle'),
        seoDescription: formData.get('seoDescription'),
        featured: formData.get('featured') === 'on',
        status: formData.get('status'),
    })

    if (!validatedFields.success) {
        return { error: 'Validation failed', errors: validatedFields.error.flatten().fieldErrors }
    }

    const { data } = validatedFields
    const requirementsArray = data.requirements
        ? data.requirements.split('\n').map(r => r.trim()).filter(Boolean)
        : []

    try {
        await updateService(id, {
            ...data,
            requirements: requirementsArray,
            seo: {
                title: data.seoTitle,
                description: data.seoDescription
            }
        })
    } catch {
        return { error: 'Database Error: Failed to update service.' }
    }

    revalidatePath('/admin/services')
    revalidatePath(`/admin/services/${id}/edit`)
    revalidatePath('/services')
    redirect('/admin/services')
}

export async function deleteServiceAction(id: string) {
    const session = await auth()
    if (!session?.user?.role || !['superadmin'].includes(session.user.role)) {
        // Only superadmin can delete/archive? Or editor too? Let's allow editor to archive.
        // Actually, user requested "actions: edit, publish/unpublish, archive".
        // Let's implement setStatus.
        return { error: 'Unauthorized' }
    }

    // We will use archiving instead of hard delete for safety as requested
    await setServiceStatus(id, 'archived')
    revalidatePath('/admin/services')
    revalidatePath('/services')
}

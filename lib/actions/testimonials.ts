'use server'

import { auth } from '@/auth'
import { createTestimonial, updateTestimonial, deleteTestimonial } from '@/lib/data/testimonials'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export type ActionState = { error?: string; errors?: Record<string, string[]> } | null

const TestimonialFormSchema = z.object({
    quote: z.string().min(10, "Quote is required"),
    authorName: z.string().min(2, "Author Name is required"),
    authorRole: z.string().optional(),
    authorPhotoUrl: z.string().optional(),
    country: z.string().optional(),
    anonymized: z.coerce.boolean(),
    featured: z.coerce.boolean(),
    order: z.coerce.number().int().default(0),
    status: z.enum(['draft', 'published', 'archived']),
})

export async function createTestimonialAction(_prevState: ActionState, formData: FormData) {
    const session = await auth()
    if (!session?.user?.role || !['superadmin', 'editor'].includes(session.user.role)) {
        return { error: 'Unauthorized' }
    }

    const validatedFields = TestimonialFormSchema.safeParse({
        quote: formData.get('quote'),
        authorName: formData.get('authorName'),
        authorRole: formData.get('authorRole') || undefined,
        authorPhotoUrl: formData.get('authorPhotoUrl') || undefined,
        country: formData.get('country') || undefined,
        anonymized: formData.get('anonymized') === 'true' || formData.get('anonymized') === 'on',
        featured: formData.get('featured') === 'true' || formData.get('featured') === 'on',
        order: formData.get('order'),
        status: formData.get('status'),
    })

    if (!validatedFields.success) {
        return { error: 'Validation failed', errors: validatedFields.error.flatten().fieldErrors }
    }

    const { data } = validatedFields

    try {
        await createTestimonial(data)
    } catch {
        return { error: 'Database Error: Failed to create testimonial.' }
    }

    revalidatePath('/admin/testimonials')
    revalidatePath('/about/testimonials')
    redirect('/admin/testimonials')
}

export async function updateTestimonialAction(id: string, _prevState: ActionState, formData: FormData) {
    const session = await auth()
    if (!session?.user?.role || !['superadmin', 'editor'].includes(session.user.role)) {
        return { error: 'Unauthorized' }
    }

    const validatedFields = TestimonialFormSchema.safeParse({
        quote: formData.get('quote'),
        authorName: formData.get('authorName'),
        authorRole: formData.get('authorRole') || undefined,
        authorPhotoUrl: formData.get('authorPhotoUrl') || undefined,
        country: formData.get('country') || undefined,
        anonymized: formData.get('anonymized') === 'true' || formData.get('anonymized') === 'on',
        featured: formData.get('featured') === 'true' || formData.get('featured') === 'on',
        order: formData.get('order'),
        status: formData.get('status'),
    })

    if (!validatedFields.success) {
        return { error: 'Validation failed', errors: validatedFields.error.flatten().fieldErrors }
    }

    const { data } = validatedFields

    try {
        await updateTestimonial(id, data)
    } catch {
        return { error: 'Database Error: Failed to update testimonial.' }
    }

    revalidatePath('/admin/testimonials')
    revalidatePath('/about/testimonials')
    redirect('/admin/testimonials')
}

export async function deleteTestimonialAction(id: string) {
    const session = await auth()
    if (!session?.user?.role || !['superadmin'].includes(session.user.role)) {
        return { error: 'Unauthorized' }
    }

    try {
        await deleteTestimonial(id)
        revalidatePath('/admin/testimonials')
        revalidatePath('/about/testimonials')
    } catch {
        return { error: 'Failed to delete testimonial' }
    }
}

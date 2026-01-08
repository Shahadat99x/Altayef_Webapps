'use server'

import { auth } from '@/auth'
import { createTeamMember, updateTeamMember, deleteTeamMember } from '@/lib/data/team'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export type ActionState = { error?: string; errors?: Record<string, string[]> } | null

const TeamMemberFormSchema = z.object({
    name: z.string().min(2, "Name is required"),
    role: z.string().min(2, "Role is required"),
    photoUrl: z.string().optional(),
    bio: z.string().optional(),
    order: z.coerce.number().int().default(0),
    featured: z.coerce.boolean(),
    status: z.enum(['draft', 'published', 'archived']),
})

export async function createTeamMemberAction(prevState: ActionState, formData: FormData) {
    const session = await auth()
    if (!session?.user?.role || !['superadmin', 'editor'].includes(session.user.role)) {
        return { error: 'Unauthorized' }
    }

    const validatedFields = TeamMemberFormSchema.safeParse({
        name: formData.get('name'),
        role: formData.get('role'),
        photoUrl: formData.get('photoUrl') || undefined,
        bio: formData.get('bio') || undefined,
        order: formData.get('order'),
        featured: formData.get('featured') === 'true' || formData.get('featured') === 'on',
        status: formData.get('status'),
    })

    if (!validatedFields.success) {
        return { error: 'Validation failed', errors: validatedFields.error.flatten().fieldErrors }
    }

    const { data } = validatedFields

    try {
        await createTeamMember(data)
    } catch {
        return { error: 'Database Error: Failed to create team member.' }
    }

    revalidatePath('/admin/team')
    revalidatePath('/about/team')
    redirect('/admin/team')
}

export async function updateTeamMemberAction(id: string, prevState: ActionState, formData: FormData) {
    const session = await auth()
    if (!session?.user?.role || !['superadmin', 'editor'].includes(session.user.role)) {
        return { error: 'Unauthorized' }
    }

    const validatedFields = TeamMemberFormSchema.safeParse({
        name: formData.get('name'),
        role: formData.get('role'),
        photoUrl: formData.get('photoUrl') || undefined,
        bio: formData.get('bio') || undefined,
        order: formData.get('order'),
        featured: formData.get('featured') === 'true' || formData.get('featured') === 'on',
        status: formData.get('status'),
    })

    if (!validatedFields.success) {
        return { error: 'Validation failed', errors: validatedFields.error.flatten().fieldErrors }
    }

    const { data } = validatedFields

    try {
        await updateTeamMember(id, data)
    } catch {
        return { error: 'Database Error: Failed to update team member.' }
    }

    revalidatePath('/admin/team')
    revalidatePath('/about/team')
    redirect('/admin/team')
}

export async function deleteTeamMemberAction(id: string) {
    const session = await auth()
    if (!session?.user?.role || !['superadmin'].includes(session.user.role)) {
        return { error: 'Unauthorized' }
    }

    try {
        await deleteTeamMember(id)
        revalidatePath('/admin/team')
        revalidatePath('/about/team')
    } catch {
        return { error: 'Failed to delete team member' }
    }
}

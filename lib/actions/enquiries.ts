'use server'

import { auth } from '@/auth'
import { updateEnquiry } from '@/lib/data/enquiries'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const UpdateEnquirySchema = z.object({
    status: z.enum(['new', 'contacted', 'closed', 'spam']),
    adminNotes: z.string().optional()
})

export type ActionState = { error?: string; success?: boolean } | null

export async function updateEnquiryAction(id: string, _prevState: ActionState, formData: FormData) {
    const session = await auth()
    if (!session?.user?.role || !['superadmin', 'editor'].includes(session.user.role)) {
        return { error: 'Unauthorized' }
    }

    const rawData = {
        status: formData.get('status'),
        adminNotes: formData.get('adminNotes')
    }

    const validated = UpdateEnquirySchema.safeParse(rawData)

    if (!validated.success) {
        return { error: 'Invalid data' }
    }

    try {
        await updateEnquiry(id, validated.data)
        revalidatePath(`/admin/enquiries/${id}`)
        revalidatePath('/admin/enquiries')
        return { success: true }
    } catch {
        return { error: 'Database error' }
    }
}

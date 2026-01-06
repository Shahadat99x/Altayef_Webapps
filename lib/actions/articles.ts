'use server'

import { auth } from '@/auth'
import { createArticle, updateArticle, setArticleStatus, deleteArticle } from '@/lib/data/articles'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export type ActionState = { error?: string; errors?: Record<string, string[]> } | null

const ArticleFormSchema = z.object({
    title: z.string().min(3),
    slug: z.string().min(3).regex(/^[a-z0-9-]+$/, 'Slug must be kebab-case'),
    category: z.enum(['guides', 'process', 'countries', 'legal']),
    excerpt: z.string().min(10).max(300),
    content: z.string().min(20),
    coverImageUrl: z.string().optional(),
    coverImageAlt: z.string().optional(),
    coverImageCaption: z.string().optional(),
    faqQuestions: z.array(z.string()),
    faqAnswers: z.array(z.string()),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    authorName: z.string().optional(),
    featured: z.coerce.boolean(),
    status: z.enum(['draft', 'published', 'archived']),
})

export async function createArticleAction(prevState: ActionState, formData: FormData) {
    const session = await auth()
    if (!session?.user?.role || !['superadmin', 'editor'].includes(session.user.role)) {
        return { error: 'Unauthorized' }
    }

    // Helper to parse arrays from FormData (Next.js server actions handle repeated keys as multiple entries, but we need to structure them)
    // For FAQ, we assume the frontend sends arrays
    const questions = formData.getAll('faqQuestions') as string[]
    const answers = formData.getAll('faqAnswers') as string[]

    const validatedFields = ArticleFormSchema.safeParse({
        title: formData.get('title'),
        slug: formData.get('slug'),
        category: formData.get('category'),
        excerpt: formData.get('excerpt'),
        content: formData.get('content'),
        faqQuestions: questions,
        faqAnswers: answers,
        seoTitle: formData.get('seoTitle') || undefined,
        seoDescription: formData.get('seoDescription') || undefined,
        authorName: formData.get('authorName') || undefined,
        featured: formData.get('featured') === 'true' || formData.get('featured') === 'on',
        status: formData.get('status'),
        coverImageUrl: formData.get('coverImageUrl') || undefined,
        coverImageAlt: formData.get('coverImageAlt') || undefined,
        coverImageCaption: formData.get('coverImageCaption') || undefined,
    })

    if (!validatedFields.success) {
        return { error: 'Validation failed', errors: validatedFields.error.flatten().fieldErrors }
    }

    const { data } = validatedFields

    // Combine FAQ arrays into objects
    const faq = data.faqQuestions.map((q, i) => ({
        question: q,
        answer: data.faqAnswers[i] || ''
    })).filter(f => f.question && f.answer)

    try {
        const payload = {
            title: data.title,
            slug: data.slug,
            category: data.category,
            excerpt: data.excerpt,
            content: data.content,
            faq,
            featured: data.featured,
            seo: {
                title: data.seoTitle,
                description: data.seoDescription
            },
            authorName: data.authorName,
            status: data.status,
            coverImageUrl: data.coverImageUrl,
            coverImageAlt: data.coverImageAlt,
            coverImageCaption: data.coverImageCaption,
        }

        await createArticle(payload)
    } catch {
        return { error: 'Database Error: Failed to create article.' }
    }

    revalidatePath('/admin/knowledge')
    redirect('/admin/knowledge')
}

export async function updateArticleAction(id: string, prevState: ActionState, formData: FormData) {
    const session = await auth()
    if (!session?.user?.role || !['superadmin', 'editor'].includes(session.user.role)) {
        return { error: 'Unauthorized' }
    }

    // Helper to parse arrays
    const questions = formData.getAll('faqQuestions') as string[]
    const answers = formData.getAll('faqAnswers') as string[]

    const validatedFields = ArticleFormSchema.safeParse({
        title: formData.get('title'),
        slug: formData.get('slug'),
        category: formData.get('category'),
        excerpt: formData.get('excerpt'),
        content: formData.get('content'),
        faqQuestions: questions,
        faqAnswers: answers,
        seoTitle: formData.get('seoTitle') || undefined,
        seoDescription: formData.get('seoDescription') || undefined,
        authorName: formData.get('authorName') || undefined,
        featured: formData.get('featured') === 'true' || formData.get('featured') === 'on',
        status: formData.get('status'),
        coverImageUrl: formData.get('coverImageUrl') || undefined,
        coverImageAlt: formData.get('coverImageAlt') || undefined,
        coverImageCaption: formData.get('coverImageCaption') || undefined,
    })

    if (!validatedFields.success) {
        return { error: 'Validation failed', errors: validatedFields.error.flatten().fieldErrors }
    }

    const { data } = validatedFields

    const faq = data.faqQuestions.map((q, i) => ({
        question: q,
        answer: data.faqAnswers[i] || ''
    })).filter(f => f.question && f.answer)

    try {
        await updateArticle(id, {
            title: data.title,
            slug: data.slug,
            category: data.category,
            excerpt: data.excerpt,
            content: data.content,
            faq,
            featured: data.featured,
            seo: {
                title: data.seoTitle,
                description: data.seoDescription
            },
            authorName: data.authorName,
            status: data.status,
            coverImageUrl: data.coverImageUrl,
            coverImageAlt: data.coverImageAlt,
            coverImageCaption: data.coverImageCaption,
        })
    } catch {
        return { error: 'Database Error: Failed to update article.' }
    }

    revalidatePath('/admin/knowledge')
    revalidatePath(`/knowledge-center/${data.category}/${data.slug}`)
    redirect('/admin/knowledge')
}

export async function deleteArticleAction(id: string, _formData: FormData) {
    const session = await auth()
    if (!session?.user?.role || !['superadmin'].includes(session.user.role)) {
        return { error: 'Unauthorized' }
    }

    try {
        await deleteArticle(id)
        revalidatePath('/admin/knowledge')
    } catch {
        return { error: 'Failed to delete article' }
    }
}

import { NextResponse } from 'next/server'
import { createPublicEnquiry } from '@/lib/data/enquiries'
import { z } from 'zod'

// Simple in-memory rate limit (Reset on server restart, fine for Phase 9B)
const rateLimit = new Map<string, { count: number, lastTime: number }>()

const PublicEnquirySchema = z.object({
    fullName: z.string().min(2),
    phoneOrWhatsapp: z.string().min(5),
    email: z.string().optional().or(z.literal('')),
    preferredContactMethod: z.enum(['WhatsApp', 'Phone', 'Email']).optional(),
    interestedServiceId: z.string().optional().or(z.literal('')),
    countryId: z.string().optional().or(z.literal('')),
    message: z.string().min(10),
    consent: z.boolean().refine(v => v === true, { message: "Consent required" }),
    source: z.enum(['contact_page', 'knowledge_article', 'other']).default('contact_page')
})

export async function POST(request: Request) {
    try {
        // Rate Limit Check
        const ip = request.headers.get('x-forwarded-for') || 'unknown'
        const now = Date.now()
        const record = rateLimit.get(ip) || { count: 0, lastTime: now }

        if (now - record.lastTime > 60000) {
            record.count = 0
            record.lastTime = now
        }

        if (record.count >= 5) { // 5 requests per minute per IP
            return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
        }

        record.count++
        rateLimit.set(ip, record)

        // Parsing
        const body = await request.json()
        const validation = PublicEnquirySchema.safeParse(body)

        if (!validation.success) {
            return NextResponse.json({ error: 'Validation failed', details: validation.error.format() }, { status: 400 })
        }

        const { data } = validation

        // Prepare data for DAL
        // Convert empty strings to undefined for IDs so DAL handles them properly
        const dataToSave = {
            fullName: data.fullName,
            phoneOrWhatsapp: data.phoneOrWhatsapp,
            email: data.email || undefined,
            preferredContactMethod: data.preferredContactMethod || null,
            interestedServiceId: data.interestedServiceId || null,
            countryId: data.countryId || null,
            message: data.message,
            source: data.source
        }

        const id = await createPublicEnquiry(dataToSave)

        return NextResponse.json({ success: true, id }, { status: 201 })
    } catch (error: any) {
        console.error('Enquiry Submission Error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

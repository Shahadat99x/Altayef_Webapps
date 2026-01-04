import { NextResponse } from 'next/server'
import { createCountry } from '@/lib/data/countries'

export async function POST(req: Request) {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')
    const envToken = process.env.ADMIN_SETUP_TOKEN

    if (!envToken || token !== envToken) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const id = await createCountry({
            name: "Saudi Arabia",
            slug: "saudi-arabia",
            overview: "Expert visa processing services for the Kingdom of Saudi Arabia, ensuring a smooth and compliant journey for work, visit, or business.",
            content: `
### Visa Processing for Saudi Arabia

We specialize in processing visas for Saudi Arabia, covering all major categories. Our team ensures that your documents are prepared correctly and submitted to the embassy without delay.

#### Services Offered:
* **Work Visa:** For professionals and laborers joining companies in KSA.
* **Family Visit Visa:** For family members of residents.
* **Business Visit Visa:** For corporate visits and meetings.

We handle the attestation, translation, and submission process for you.
        `.trim(),
            supportedVisaTypes: ["Work Visa", "Family Visit Visa", "Business Visa", "Umrah Visa"],
            requirements: [
                "Original Passport (Valid for 6 months)",
                "2 Recent Photographs (White background)",
                "Electronic Visa Authorization (Wakala)",
                "Medical Report (Gamca)",
                "Police Clearance Certificate (if applicable)"
            ],
            processSteps: [
                "Consultation & Document Review",
                "Medical Check-up (Gamca)",
                "Visa Stamping at Embassy",
                "Manpower Clearance (BMET)",
                "Flight Booking"
            ],
            timelineText: "10-15 Working Days",
            feesDisclaimer: "Excludes government fees and medical costs",
            featured: true, // As requested to be highlighted
            status: "draft", // Start as draft to verify public hiding
            seo: {
                title: "Saudi Arabia Visa Processing from Bangladesh",
                description: "Reliable Saudi Arabia visa processing agency in Dhaka. Work visa, visit visa, and medical gamca services."
            }
        })

        return NextResponse.json({ ok: true, id, message: "Saudi Arabia seeded as Draft" })
    } catch {
        return NextResponse.json({ error: 'Failed to seed' }, { status: 500 })
    }
}

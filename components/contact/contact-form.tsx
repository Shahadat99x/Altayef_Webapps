'use client'

import { useState, FormEvent } from 'react'
import { z } from 'zod'
import { Service, Country } from '@/lib/models/schema'

const ContactFormSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    phoneOrWhatsapp: z.string().min(10, "Please enter a valid phone number"),
    email: z.string().email("Invalid email address").optional().or(z.literal('')),
    preferredContactMethod: z.enum(['WhatsApp', 'Phone', 'Email']).optional(),
    interestedServiceId: z.string().optional(),
    countryId: z.string().optional(),
    message: z.string().min(10, "Message must be at least 10 characters"),
    consent: z.boolean().refine(val => val === true, { message: "You must agree to be contacted" }),
})

type FormData = z.infer<typeof ContactFormSchema>

interface ContactFormProps {
    services: Service[]
    countries: Country[]
}

export default function ContactForm({ services, countries }: ContactFormProps) {
    const [submitting, setSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSubmitting(true)
        setErrors({})

        const formData = new FormData(e.currentTarget)
        const rawData: Record<string, any> = {
            fullName: formData.get('fullName'),
            phoneOrWhatsapp: formData.get('phoneOrWhatsapp'),
            email: formData.get('email'),
            preferredContactMethod: formData.get('preferredContactMethod'),
            interestedServiceId: formData.get('interestedServiceId'),
            countryId: formData.get('countryId'),
            message: formData.get('message'),
            consent: formData.get('consent') === 'on',
        }

        const result = ContactFormSchema.safeParse(rawData)

        if (!result.success) {
            const fieldErrors: Partial<Record<keyof FormData, string>> = {}
            result.error.issues.forEach(issue => {
                if (issue.path[0]) {
                    fieldErrors[issue.path[0] as keyof FormData] = issue.message
                }
            })
            setErrors(fieldErrors)
            setSubmitting(false)
            return
        }

        try {
            const response = await fetch('/api/enquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(rawData)
            })

            const resData = await response.json()

            if (!response.ok) {
                // If 429 (rate limit) or validation error
                if (response.status === 429) {
                    setErrors({ message: "You are sending too many requests. Please wait a moment." })
                } else if (resData.error && resData.details) {
                    // Try to map server validation errors back to fields if possible
                    // Ideally we already validated on client, so this is just failsafe
                    setErrors({ message: resData.error || "Submission failed" })
                } else {
                    setErrors({ message: resData.error || "Something went wrong" })
                }
                setSubmitting(false)
                return
            }

            setSuccess(true)
            setSubmitting(false)
        } catch (err) {
            setErrors({ message: "Network error. Please try again." })
            setSubmitting(false)
        }
    }

    if (success) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 text-3xl">
                    ✓
                </div>
                <h3 className="text-xl font-bold text-green-800">Message Received!</h3>
                <p className="text-green-700">
                    Thank you for reaching out. Submissions are temporarily in demo mode, but we are ready to assist you.
                </p>
                <div className="pt-4">
                    <a
                        href="https://wa.me/8801234567890?text=I%20just%20submitted%20a%20contact%20request"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition shadow-md font-medium"
                    >
                        <span>Chat on WhatsApp Now</span>
                    </a>
                </div>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                        name="fullName"
                        type="text"
                        className={`w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border ${errors.fullName ? 'border-red-300 bg-red-50' : ''}`}
                        placeholder="John Doe"
                    />
                    {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone or WhatsApp *</label>
                    <input
                        name="phoneOrWhatsapp"
                        type="tel"
                        className={`w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border ${errors.phoneOrWhatsapp ? 'border-red-300 bg-red-50' : ''}`}
                        placeholder="+880 1XXX XXXXXX"
                    />
                    {errors.phoneOrWhatsapp && <p className="mt-1 text-sm text-red-600">{errors.phoneOrWhatsapp}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address (Optional)</label>
                    <input
                        name="email"
                        type="email"
                        className={`w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border ${errors.email ? 'border-red-300 bg-red-50' : ''}`}
                        placeholder="you@example.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Contact Method</label>
                    <select
                        name="preferredContactMethod"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border"
                        defaultValue="WhatsApp"
                    >
                        <option value="WhatsApp">WhatsApp</option>
                        <option value="Phone">Phone Call</option>
                        <option value="Email">Email</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Interested Service</label>
                    <select
                        name="interestedServiceId"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border"
                    >
                        <option value="">-- Select a Service --</option>
                        {services.map(s => (
                            <option key={s._id?.toString()} value={s._id?.toString()}>{s.title}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Target Country</label>
                    <select
                        name="countryId"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border"
                    >
                        <option value="">-- Select a Country --</option>
                        {countries.map(c => (
                            <option key={c._id?.toString()} value={c._id?.toString()}>{c.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">How can we help? *</label>
                <textarea
                    name="message"
                    rows={4}
                    className={`w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border ${errors.message ? 'border-red-300 bg-red-50' : ''}`}
                    placeholder="Tell us about your visa requirements..."
                ></textarea>
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
            </div>

            <div className="flex items-start">
                <div className="flex h-5 items-center">
                    <input
                        id="consent"
                        name="consent"
                        type="checkbox"
                        className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${errors.consent ? 'border-red-300' : ''}`}
                    />
                </div>
                <div className="ml-3 text-sm">
                    <label htmlFor="consent" className="font-medium text-gray-700">I agree to be contacted</label>
                    <p className="text-gray-500">Altayef will respect your privacy and only contact you regarding this enquiry.</p>
                    {errors.consent && <p className="mt-1 text-sm text-red-600">{errors.consent}</p>}
                </div>
            </div>

            <div className="pt-2">
                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-blue-700 transition shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {submitting ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                        </>
                    ) : 'Send Message'}
                </button>
            </div>
        </form>
    )
}

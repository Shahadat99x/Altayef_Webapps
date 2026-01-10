'use client'

import { updateSiteSettingsAction } from '@/lib/actions/settings'
import { useFormState } from 'react-dom'
import { useEffect } from 'react'

const initialState = {
    success: false,
    message: '',
}

interface SettingsFormProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    defaults: any
}

export function SettingsForm({ defaults }: SettingsFormProps) {
    const [state, formAction] = useFormState(updateSiteSettingsAction, initialState)

    useEffect(() => {
        if (state.message) {
            if (state.success) {
                // Optional: toast.success(state.message)
            } else {
                // Optional: toast.error(state.message)
            }
        }
    }, [state])

    return (
        <form action={formAction} className="bg-white rounded-lg shadow border p-6 space-y-8">
            {state.message && (
                <div className={`p-4 rounded-md ${state.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {state.message}
                </div>
            )}

            {/* Identity */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold border-b pb-2">Identity</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">Site Name</label>
                        <input
                            type="text"
                            name="siteName"
                            id="siteName"
                            defaultValue={defaults.siteName}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="primaryCTA" className="block text-sm font-medium text-gray-700">Primary CTA Text</label>
                        <input
                            type="text"
                            name="primaryCTA"
                            id="primaryCTA"
                            defaultValue={defaults.primaryCTA}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label htmlFor="footerText" className="block text-sm font-medium text-gray-700">Footer Text</label>
                    <textarea
                        name="footerText"
                        id="footerText"
                        rows={2}
                        defaultValue={defaults.footerText}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                    />
                </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold border-b pb-2">Contact Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            defaultValue={defaults.phone}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">WhatsApp (Number or Link)</label>
                        <input
                            type="text"
                            name="whatsapp"
                            id="whatsapp"
                            defaultValue={defaults.whatsapp}
                            placeholder="e.g. +966..."
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            defaultValue={defaults.email}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Office Address</label>
                    <input
                        type="text"
                        name="address"
                        id="address"
                        defaultValue={defaults.address}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="mapUrl" className="block text-sm font-medium text-gray-700">Google Maps Embed URL</label>
                    <input
                        type="text"
                        name="mapUrl"
                        id="mapUrl"
                        defaultValue={defaults.mapUrl}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                    />
                </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold border-b pb-2">Social Profiles</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    {['facebook', 'instagram', 'youtube', 'tiktok', 'linkedin'].map((platform) => (
                        <div key={platform} className="space-y-2">
                            <label htmlFor={`social.${platform}`} className="block text-sm font-medium text-gray-700 capitalize">{platform}</label>
                            <input
                                type="url"
                                name={`social.${platform}`}
                                id={`social.${platform}`}
                                defaultValue={defaults.social[platform as keyof typeof defaults.social] || ''}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="pt-4 flex justify-end">
                <SubmitButton />
            </div>
        </form>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <button
            type="submit"
            disabled={pending}
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
            {pending ? 'Saving...' : 'Save Changes'}
        </button>
    )
}

import { useFormStatus } from 'react-dom'

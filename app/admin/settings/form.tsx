'use client'

import { updateSiteSettingsAction } from '@/lib/actions/settings'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
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
    const [state, formAction] = useActionState(updateSiteSettingsAction, initialState)

    useEffect(() => {
        if (state.message) {
            if (state.success) {
                // Optional: toast.success(state.message)
            } else {
                // Optional: toast.error(state.message)
            }
        }
    }, [state])

    const inputClasses = "block w-full rounded-md border border-slate-300 bg-white text-slate-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2.5 placeholder:text-slate-400"
    const labelClasses = "block text-sm font-medium text-slate-700 mb-1"

    return (
        <form action={formAction} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-8">
            {state.message && (
                <div className={`p-4 rounded-lg text-sm font-medium ${state.success ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                    {state.message}
                </div>
            )}

            {/* Identity */}
            <div className="space-y-4">
                <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">Identity</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="siteName" className={labelClasses}>Site Name</label>
                        <input
                            type="text"
                            name="siteName"
                            id="siteName"
                            defaultValue={defaults.siteName}
                            className={inputClasses}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="primaryCTA" className={labelClasses}>Primary CTA Text</label>
                        <input
                            type="text"
                            name="primaryCTA"
                            id="primaryCTA"
                            defaultValue={defaults.primaryCTA}
                            className={inputClasses}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="footerText" className={labelClasses}>Footer Text</label>
                    <textarea
                        name="footerText"
                        id="footerText"
                        rows={2}
                        defaultValue={defaults.footerText}
                        className={inputClasses}
                    />
                </div>
            </div>

            {/* Brand Assets */}
            <div className="space-y-4">
                <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">Brand Assets</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="logoMarkUrl" className={labelClasses}>Logo Mark URL (Optional)</label>
                        <input
                            type="text"
                            name="logoMarkUrl"
                            id="logoMarkUrl"
                            defaultValue={defaults.logoMarkUrl}
                            placeholder="/brand/logo-mark.png"
                            className={inputClasses}
                        />
                    </div>
                    <div>
                        <label htmlFor="logoLockupUrl" className={labelClasses}>Logo Lockup URL (Optional)</label>
                        <input
                            type="text"
                            name="logoLockupUrl"
                            id="logoLockupUrl"
                            defaultValue={defaults.logoLockupUrl}
                            placeholder="/brand/logo-lockup.png"
                            className={inputClasses}
                        />
                    </div>
                </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
                <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">Contact Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="phone" className={labelClasses}>Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            defaultValue={defaults.phone}
                            className={inputClasses}
                        />
                    </div>
                    <div>
                        <label htmlFor="whatsapp" className={labelClasses}>WhatsApp (Number or Link)</label>
                        <input
                            type="text"
                            name="whatsapp"
                            id="whatsapp"
                            defaultValue={defaults.whatsapp}
                            placeholder="e.g. +966..."
                            className={inputClasses}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className={labelClasses}>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            defaultValue={defaults.email}
                            className={inputClasses}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="address" className={labelClasses}>Office Address</label>
                    <input
                        type="text"
                        name="address"
                        id="address"
                        defaultValue={defaults.address}
                        className={inputClasses}
                    />
                </div>
                <div>
                    <label htmlFor="mapUrl" className={labelClasses}>Google Maps Embed URL</label>
                    <input
                        type="text"
                        name="mapUrl"
                        id="mapUrl"
                        defaultValue={defaults.mapUrl}
                        className={inputClasses}
                    />
                </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
                <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">Social Profiles</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    {['facebook', 'instagram', 'youtube', 'tiktok', 'linkedin'].map((platform) => (
                        <div key={platform}>
                            <label htmlFor={`social.${platform}`} className={`${labelClasses} capitalize`}>{platform}</label>
                            <input
                                type="url"
                                name={`social.${platform}`}
                                id={`social.${platform}`}
                                defaultValue={defaults.social[platform as keyof typeof defaults.social] || ''}
                                className={inputClasses}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="pt-4 flex justify-end border-t border-slate-200">
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
            className="inline-flex justify-center rounded-lg bg-blue-600 py-2.5 px-6 text-sm font-bold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
        >
            {pending ? 'Saving...' : 'Save Changes'}
        </button>
    )
}

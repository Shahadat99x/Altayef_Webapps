'use client'

import { updateCountryAction } from '@/lib/actions/countries'
import { Country } from '@/lib/models/schema'
import { useActionState } from 'react'

export default function EditCountryForm({ country }: { country: Country }) {
    const updateActionWithId = updateCountryAction.bind(null, country._id?.toString() || '')
    const [state, dispatch, isPending] = useActionState(updateActionWithId, null)

    return (
        <form action={dispatch} className="space-y-6 bg-white p-6 rounded shadow">

            {/* Name */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input name="name" type="text" defaultValue={country.name} className="mt-1 block w-full border border-gray-300 rounded md p-2" required />
                {state?.errors?.name && <p className="text-red-500 text-sm">{state.errors.name}</p>}
            </div>

            {/* Slug */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Slug (Auto-generated if empty)</label>
                <input name="slug" type="text" defaultValue={country.slug} className="mt-1 block w-full border border-gray-300 rounded md p-2" />
            </div>

            {/* Overview */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Overview (Short)</label>
                <textarea name="overview" rows={3} defaultValue={country.overview} className="mt-1 block w-full border border-gray-300 rounded md p-2" required />
            </div>

            {/* Content */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Long Description (Markdown/HTML)</label>
                <textarea name="content" rows={6} defaultValue={country.content} className="mt-1 block w-full border border-gray-300 rounded md p-2" />
            </div>

            {/* Arrays */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Supported Visa Types (Line separated)</label>
                    <textarea name="supportedVisaTypes" rows={4} defaultValue={country.supportedVisaTypes?.join('\n')} className="mt-1 block w-full border border-gray-300 rounded md p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Requirements (Line separated)</label>
                    <textarea name="requirements" rows={4} defaultValue={country.requirements?.join('\n')} className="mt-1 block w-full border border-gray-300 rounded md p-2" />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Process Steps (Ordered, Line separated)</label>
                <textarea name="processSteps" rows={5} defaultValue={country.processSteps?.join('\n')} className="mt-1 block w-full border border-gray-300 rounded md p-2" />
            </div>

            {/* Timeline & Fees */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Timeline Text</label>
                    <input name="timelineText" type="text" defaultValue={country.timelineText} className="mt-1 block w-full border border-gray-300 rounded md p-2" placeholder="e.g. 2-3 weeks" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Fees Disclaimer (Optional)</label>
                    <input name="feesDisclaimer" type="text" defaultValue={country.feesDisclaimer} className="mt-1 block w-full border border-gray-300 rounded md p-2" placeholder="e.g. Govt fees excluded" />
                </div>
            </div>

            {/* Featured */}
            <div className="flex items-center">
                <input name="featured" type="checkbox" defaultChecked={country.featured} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label className="ml-2 block text-sm text-gray-900">Featured Destination</label>
            </div>

            {/* Status */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select name="status" defaultValue={country.status} className="mt-1 block w-full border border-gray-300 rounded md p-2">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                </select>
            </div>

            {/* SEO */}
            <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-4">SEO Settings</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">SEO Title</label>
                        <input name="seoTitle" type="text" defaultValue={country.seo?.title} className="mt-1 block w-full border border-gray-300 rounded md p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">SEO Description</label>
                        <textarea name="seoDescription" rows={3} defaultValue={country.seo?.description} className="mt-1 block w-full border border-gray-300 rounded md p-2" />
                    </div>
                </div>
            </div>

            {state?.error && <p className="text-red-500">{state.error}</p>}

            <div className="flex justify-end">
                <button type="submit" disabled={isPending} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50">
                    {isPending ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </form>
    )
}

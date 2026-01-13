'use client'

import { updateCountryAction } from '@/lib/actions/countries'
import { Country } from '@/lib/models/schema'
import { useActionState, useState } from 'react'
import { ImageUploader } from '@/components/admin/ImageUploader'

export default function EditCountryForm({ country }: { country: Country }) {
    const updateActionWithId = updateCountryAction.bind(null, country._id?.toString() || '')
    const [state, dispatch, isPending] = useActionState(updateActionWithId, null)
    const [coverImageUrl, setCoverImageUrl] = useState(country.coverImageUrl || '')

    return (
        <form action={dispatch} className="space-y-6 bg-white p-6 rounded shadow">

            {/* Name */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input name="name" type="text" defaultValue={country.name} className="admin-input" required />
                {state?.errors?.name && <p className="text-red-500 text-sm">{state.errors.name}</p>}
            </div>

            {/* Slug */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Slug (Auto-generated if empty)</label>
                <input name="slug" type="text" defaultValue={country.slug} className="admin-input" />
            </div>

            {/* Overview */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Overview (Short)</label>
                <textarea name="overview" rows={3} defaultValue={country.overview} className="admin-input" required />
            </div>

            {/* Content */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Long Description (Markdown/HTML)</label>
                <textarea name="content" rows={6} defaultValue={country.content} className="admin-input" />
            </div>

            {/* Arrays */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Supported Visa Types (Line separated)</label>
                    <textarea name="supportedVisaTypes" rows={4} defaultValue={country.supportedVisaTypes?.join('\n')} className="admin-input" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Requirements (Line separated)</label>
                    <textarea name="requirements" rows={4} defaultValue={country.requirements?.join('\n')} className="admin-input" />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Process Steps (Ordered, Line separated)</label>
                <textarea name="processSteps" rows={5} defaultValue={country.processSteps?.join('\n')} className="admin-input" />
            </div>

            {/* Timeline & Fees */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Timeline Text</label>
                    <input name="timelineText" type="text" defaultValue={country.timelineText} className="admin-input" placeholder="e.g. 2-3 weeks" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Fees Disclaimer (Optional)</label>
                    <input name="feesDisclaimer" type="text" defaultValue={country.feesDisclaimer} className="admin-input" placeholder="e.g. Govt fees excluded" />
                </div>
            </div>

            {/* Cover Image */}
            <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-2">Cover Image</h3>
                <p className="text-sm text-gray-500 mb-4">Optional. If not provided, a placeholder will be shown.</p>
                <ImageUploader onUpload={(url) => setCoverImageUrl(url)} label="Upload Cover Image" />
                <input type="hidden" name="coverImageUrl" value={coverImageUrl} />
                <div className="mt-4 space-y-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Image URL</label>
                        <input
                            name="coverImageUrlDisplay"
                            type="url"
                            value={coverImageUrl}
                            onChange={(e) => setCoverImageUrl(e.target.value)}
                            className="admin-input"
                            placeholder="https://..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Alt Text (Recommended)</label>
                        <input name="coverImageAlt" type="text" defaultValue={country.coverImageAlt || ''} className="admin-input" placeholder="Describe the image" />
                    </div>
                    {coverImageUrl && (
                        <div className="mt-2">
                            <p className="text-sm text-gray-500 mb-1">Preview:</p>
                            <img src={coverImageUrl} alt="Preview" className="max-h-40 rounded border" />
                            <button
                                type="button"
                                onClick={() => setCoverImageUrl('')}
                                className="mt-2 text-red-600 text-sm hover:underline"
                            >
                                Remove image
                            </button>
                        </div>
                    )}
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
                <select name="status" defaultValue={country.status} className="admin-input">
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
                        <input name="seoTitle" type="text" defaultValue={country.seo?.title} className="admin-input" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">SEO Description</label>
                        <textarea name="seoDescription" rows={3} defaultValue={country.seo?.description} className="admin-input" />
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

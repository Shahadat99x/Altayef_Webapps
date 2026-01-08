'use client'

import { createTeamMemberAction, updateTeamMemberAction, deleteTeamMemberAction } from '@/lib/actions/team'
import { TeamMember } from '@/lib/models/schema'
import { useActionState, useState, ChangeEvent } from 'react'

function ImageUploader({ onUpload, existingUrl }: { onUpload: (url: string) => void, existingUrl?: string }) {
    const [uploading, setUploading] = useState(false)
    const [urlInput, setUrlInput] = useState('')
    const [preview, setPreview] = useState(existingUrl || '')

    const handleSuccess = (url: string) => {
        onUpload(url)
        setPreview(url)
    }

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        const formData = new FormData()
        formData.append('file', file)

        try {
            const res = await fetch('/api/admin/uploads/cloudinary', {
                method: 'POST',
                body: formData,
            })
            const data = await res.json()
            if (data.url) handleSuccess(data.url)
            else alert('Upload failed: ' + data.error)
        } catch {
            alert('Upload failed')
        } finally {
            setUploading(false)
        }
    }

    const handleUrlUpload = async () => {
        if (!urlInput) return
        setUploading(true)
        // Verify URL or just set it? For simplicity, we just set it, but we can also "upload" via API if needed.
        // The API supports sourceUrl upload.
        try {
            const res = await fetch('/api/admin/uploads/cloudinary', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sourceUrl: urlInput }),
            })
            const data = await res.json()
            if (data.url) handleSuccess(data.url)
            else alert('Upload failed: ' + data.error)
        } catch {
            alert('Upload failed')
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="bg-gray-50 p-4 rounded border space-y-4">
            {preview && (
                <div className="mb-2">
                    <img src={preview} alt="Preview" className="h-24 w-24 object-cover rounded-full border" />
                </div>
            )}
            <div>
                <label className="block text-sm font-medium text-gray-700">Upload Photo</label>
                <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
            </div>
            <div className="flex gap-2">
                <input
                    type="url"
                    placeholder="Or paste image URL"
                    value={urlInput}
                    onChange={e => setUrlInput(e.target.value)}
                    className="flex-1 border border-gray-300 rounded p-2 text-sm"
                />
                <button type="button" onClick={handleUrlUpload} disabled={uploading || !urlInput} className="bg-gray-200 px-4 py-2 rounded text-sm hover:bg-gray-300">
                    {uploading ? '...' : 'Use URL'}
                </button>
            </div>
        </div>
    )
}

export default function TeamForm({ member }: { member?: TeamMember }) {
    const action = member ? updateTeamMemberAction.bind(null, member._id?.toString() || '') : createTeamMemberAction
    const [state, dispatch, isPending] = useActionState(action, null)

    return (
        <div className="max-w-2xl mx-auto">
            <form action={dispatch} className="space-y-6 bg-white p-6 rounded shadow">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input name="name" defaultValue={member?.name} className="admin-input" required minLength={2} />
                        {state?.errors?.name && <p className="text-red-500 text-sm">{state.errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Role / Job Title</label>
                        <input name="role" defaultValue={member?.role} className="admin-input" required minLength={2} />
                        {state?.errors?.role && <p className="text-red-500 text-sm">{state.errors.role}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Bio (Optional)</label>
                        <textarea name="bio" rows={3} defaultValue={member?.bio} className="admin-input" />
                    </div>

                    <div>
                        <ImageUploader
                            existingUrl={member?.photoUrl || ''}
                            onUpload={(url) => {
                                const input = document.querySelector('input[name="photoUrl"]') as HTMLInputElement
                                if (input) input.value = url
                            }}
                        />
                        <input type="hidden" name="photoUrl" defaultValue={member?.photoUrl || ''} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Order (Sort Priority)</label>
                            <input type="number" name="order" defaultValue={member?.order || 0} className="admin-input" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Status</label>
                            <select name="status" defaultValue={member?.status || 'draft'} className="admin-input">
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                                <option value="archived">Archived</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <input type="checkbox" name="featured" id="featured" defaultChecked={member?.featured} className="h-4 w-4 text-blue-600 rounded" />
                        <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">Featured (Show first?)</label>
                    </div>
                </div>

                {state?.error && <div className="p-4 bg-red-100 text-red-700 rounded">{state.error}</div>}

                <div className="flex justify-end pt-4 border-t">
                    <button type="submit" disabled={isPending} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50">
                        {isPending ? 'Saving...' : (member ? 'Update Member' : 'Create Member')}
                    </button>
                </div>
            </form>

            {member && member._id && (
                <div className="mt-8 pt-8 border-t border-red-100">
                    <div className="flex justify-between items-center">
                        <p className="text-red-800 text-sm">Delete this team member?</p>
                        <button
                            onClick={async () => {
                                if (confirm('Permanently delete this team member?')) {
                                    await deleteTeamMemberAction(member._id!.toString())
                                }
                            }}
                            className="text-red-600 hover:text-red-800 text-sm underline"
                        >
                            Delete Permanently
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

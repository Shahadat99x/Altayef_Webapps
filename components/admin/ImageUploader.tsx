'use client'

import { useState, ChangeEvent } from 'react'

interface ImageUploaderProps {
    onUpload: (url: string) => void
    label?: string
}

/**
 * Reusable Cloudinary image uploader component.
 * Supports file upload and URL paste.
 */
export function ImageUploader({ onUpload, label = 'Upload Image' }: ImageUploaderProps) {
    const [uploading, setUploading] = useState(false)
    const [urlInput, setUrlInput] = useState('')
    const [successMsg, setSuccessMsg] = useState('')

    const handleSuccess = (url: string) => {
        onUpload(url)
        setSuccessMsg('Image ready!')
        setTimeout(() => setSuccessMsg(''), 3000)
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
        try {
            const res = await fetch('/api/admin/uploads/cloudinary', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sourceUrl: urlInput }),
            })
            const data = await res.json()
            if (data.url) {
                handleSuccess(data.url)
                setUrlInput('')
            } else {
                alert('Upload failed: ' + data.error)
            }
        } catch {
            alert('Upload failed')
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded border dark:border-slate-700 space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={uploading}
                    className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-slate-700 dark:file:text-slate-200"
                />
            </div>
            <div className="flex gap-2">
                <input
                    type="url"
                    placeholder="Or paste image URL"
                    value={urlInput}
                    onChange={e => setUrlInput(e.target.value)}
                    className="flex-1 border border-gray-300 dark:border-slate-700 rounded p-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                />
                <button
                    type="button"
                    onClick={handleUrlUpload}
                    disabled={uploading || !urlInput}
                    className="bg-gray-200 dark:bg-slate-700 px-4 py-2 rounded text-sm hover:bg-gray-300 dark:hover:bg-slate-600 text-slate-900 dark:text-slate-100 disabled:opacity-50"
                >
                    {uploading ? 'Uploading...' : 'Upload URL'}
                </button>
            </div>
            {successMsg && <p className="text-green-600 dark:text-green-400 text-sm font-medium">{successMsg}</p>}
        </div>
    )
}

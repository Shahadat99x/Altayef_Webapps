'use client'

import { useState, ChangeEvent } from 'react'

interface ImageUploaderProps {
    onUpload: (url: string) => void
    label?: string
}

/**
 * Reusable ImageUploader component for admin forms.
 * Supports file upload and URL paste with Cloudinary integration.
 */
export function ImageUploader({ onUpload, label = 'Upload Image' }: ImageUploaderProps) {
    const [uploading, setUploading] = useState(false)
    const [urlInput, setUrlInput] = useState('')
    const [successMsg, setSuccessMsg] = useState('')

    const handleSuccess = (url: string) => {
        onUpload(url)
        setSuccessMsg('Image uploaded successfully!')
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
            if (data.url) handleSuccess(data.url)
            else alert('Upload failed: ' + data.error)
        } catch {
            alert('Upload failed')
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4">
            <p className="text-sm font-medium text-gray-700 mb-2">{label}</p>

            {/* File Upload */}
            <div>
                <label className="block text-sm text-gray-600 mb-1">Upload from computer</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={uploading}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
                />
            </div>

            {/* URL Upload */}
            <div>
                <label className="block text-sm text-gray-600 mb-1">Or paste image URL</label>
                <div className="flex gap-2">
                    <input
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        value={urlInput}
                        onChange={e => setUrlInput(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                        type="button"
                        onClick={handleUrlUpload}
                        disabled={uploading || !urlInput}
                        className="bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {uploading ? 'Uploading...' : 'Upload'}
                    </button>
                </div>
            </div>

            {successMsg && <p className="text-green-600 text-sm font-medium">{successMsg}</p>}
        </div>
    )
}

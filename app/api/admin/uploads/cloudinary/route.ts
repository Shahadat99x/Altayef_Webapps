import { auth } from '@/auth'
import { v2 as cloudinary } from 'cloudinary'
import { NextResponse } from 'next/server'

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: Request) {
    try {
        const session = await auth()
        if (!session?.user?.role || !['superadmin', 'editor'].includes(session.user.role)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const contentType = request.headers.get('content-type') || ''

        let uploadResult

        if (contentType.includes('multipart/form-data')) {
            const formData = await request.formData()
            const file = formData.get('file') as File | null

            if (!file) {
                return NextResponse.json({ error: 'No file provided' }, { status: 400 })
            }

            const arrayBuffer = await file.arrayBuffer()
            const buffer = Buffer.from(arrayBuffer)

            uploadResult = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: 'knowledge-center' },
                    (error, result) => {
                        if (error) reject(error)
                        else resolve(result)
                    }
                ).end(buffer)
            })
        } else if (contentType.includes('application/json')) {
            const body = await request.json()
            if (!body.sourceUrl) {
                return NextResponse.json({ error: 'No sourceUrl provided' }, { status: 400 })
            }

            uploadResult = await cloudinary.uploader.upload(body.sourceUrl, {
                folder: 'knowledge-center'
            })
        } else {
            return NextResponse.json({ error: 'Unsupported content type' }, { status: 400 })
        }

        const result = uploadResult as { secure_url: string; width: number; height: number; public_id: string }
        const { secure_url, width, height, public_id } = result

        return NextResponse.json({
            url: secure_url,
            width,
            height,
            publicId: public_id
        })

    } catch (error) {
        console.error('Upload Error:', error)
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
    }
}

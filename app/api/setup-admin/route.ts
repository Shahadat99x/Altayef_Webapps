import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import clientPromise from '@/lib/db/mongodb'

export async function GET() {
    try {
        const client = await clientPromise
        const db = client.db(process.env.DB_NAME || 'test')

        const email = 'admin@altayef.com'
        const password = 'password123'
        const hashedPassword = await bcrypt.hash(password, 10)

        await db.collection('admins').updateOne(
            { email },
            {
                $set: {
                    email,
                    passwordHash: hashedPassword,
                    role: 'superadmin',
                    updatedAt: new Date()
                },
                $setOnInsert: {
                    createdAt: new Date()
                }
            },
            { upsert: true }
        )

        return NextResponse.json({
            success: true,
            message: 'Admin account created/reset successfully.',
            credentials: {
                email,
                password
            },
            instruction: 'Please verify login and then DELETE this file (app/api/setup-admin/route.ts) immediately.'
        })
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}

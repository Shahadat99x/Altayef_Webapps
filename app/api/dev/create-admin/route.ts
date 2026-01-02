import { NextResponse } from 'next/server'
import { createAdmin, getAdminByEmail } from '@/lib/data'
import bcrypt from 'bcryptjs'

// Helper to check permission (Shared with seed route concept, likely reusable but keeping isolated for now)
const checkPermission = (req: Request) => {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token')
  const envToken = process.env.ADMIN_SETUP_TOKEN // Different token for admin creation just in case
  const isDev = process.env.NODE_ENV === 'development'

  // Only allow if token matches, or in dev explicitly if policy allows (preferring token even in dev for safety)
  if (isDev && !envToken) return true // If no token set in dev, allow.
  if (envToken && token === envToken) return true
  return false
}

export async function POST(req: Request) {
  if (!checkPermission(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password required' },
        { status: 400 }
      )
    }

    const existing = await getAdminByEmail(email)
    if (existing) {
      return NextResponse.json(
        { error: 'Admin already exists' },
        { status: 409 }
      )
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const adminId = await createAdmin({
      email,
      passwordHash,
      role: 'superadmin',
    })

    return NextResponse.json({
      ok: true,
      adminId,
      message: 'Admin created successfully',
    })
  } catch (error) {
    console.error('Admin creation failed:', error)
    return NextResponse.json(
      { ok: false, error: 'Creation failed' },
      { status: 500 }
    )
  }
}

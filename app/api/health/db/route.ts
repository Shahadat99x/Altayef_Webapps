import { NextResponse } from 'next/server'
import clientPromise from '@/lib/db/mongodb'

export async function GET() {
  try {
    const client = await clientPromise
    // Perform a lightweight operation to check connectivity
    await client.db('admin').command({ ping: 1 })

    return NextResponse.json({
      ok: true,
      status: 'connected',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Database connection failed:', error)
    return NextResponse.json(
      {
        ok: false,
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}

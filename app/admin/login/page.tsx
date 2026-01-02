'use client'

import { useActionState } from 'react'
import { authenticate } from '@/lib/actions'

export default function LoginPage() {
  const [errorMessage, dispatch, isPending] = useActionState(
    authenticate,
    undefined
  )

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Admin Login
        </h1>
        <form action={dispatch} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              name="email"
              placeholder="admin@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              name="password"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>
          <div aria-live="polite" aria-atomic="true">
            {errorMessage && (
              <p className="text-sm text-red-500">{errorMessage}</p>
            )}
          </div>
          <button
            className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            aria-disabled={isPending}
            disabled={isPending}
          >
            {isPending ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

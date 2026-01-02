import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isAdminPage = nextUrl.pathname.startsWith('/admin')

      // Allow access to login page
      if (nextUrl.pathname === '/admin/login') {
        if (isLoggedIn) return Response.redirect(new URL('/admin', nextUrl))
        return true
      }

      if (isAdminPage) {
        if (isLoggedIn) return true
        return false // Redirect to login
      }
      return true
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role as string
      }
      return session
    },
    jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
  },
  providers: [], // Configured in auth.ts
} satisfies NextAuthConfig

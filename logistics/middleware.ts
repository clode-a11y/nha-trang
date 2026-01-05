import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAdmin = token?.role === 'admin'
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
    const isAccountRoute = req.nextUrl.pathname.startsWith('/account')

    // Protect admin routes
    if (isAdminRoute && !isAdmin) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // Protect account routes (any authenticated user)
    if (isAccountRoute && !token) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
        const isAccountRoute = req.nextUrl.pathname.startsWith('/account')

        if (isAdminRoute) {
          return token?.role === 'admin'
        }

        if (isAccountRoute) {
          return !!token
        }

        return true
      },
    },
  }
)

export const config = {
  matcher: ['/admin/:path*', '/account/:path*'],
}

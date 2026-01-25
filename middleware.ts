import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
    // 1. Get token from header or cookie
    const authHeader = request.headers.get('authorization')
    let token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null

    if (!token) {
        token = request.cookies.get('auth_token')?.value || null
    }

    const loginUrl = process.env.NEXT_PUBLIC_LOGIN_URL || '/auth/login'

    // Helper to redirect to login
    const redirectToLogin = () => {
        // If loginUrl is external, we need a full URL, otherwise relative works
        if (loginUrl.startsWith('http')) {
            return NextResponse.redirect(new URL(loginUrl))
        }
        return NextResponse.redirect(new URL(loginUrl, request.url))
    }

    // 2. Verify Token
    const path = request.nextUrl.pathname
    const isProtected = path.startsWith('/course-player') || path.startsWith('/admin')

    if (!token) {
        if (isProtected) {
            return redirectToLogin()
        }
        return NextResponse.next()
    }

    try {
        const secretStr = process.env.EXTERNAL_JWT_SECRET
        if (!secretStr) {
            console.error('CRITICAL: EXTERNAL_JWT_SECRET is not defined in environment variables.')
            if (isProtected) {
                return redirectToLogin()
            }
            return NextResponse.next()
        }

        const secret = new TextEncoder().encode(secretStr)
        const { payload } = await jwtVerify(token, secret)

        // 3. Extract Claims
        const username = payload.username as string
        const labid = payload.labid as string
        const role = payload.role as string

        // 4. RBAC
        const path = request.nextUrl.pathname

        // "Only allow role: 'instructor' or role: 'admin' to access management features."
        // Assuming "management features" means /admin routes?
        if (path.startsWith('/admin') && role !== 'instructor' && role !== 'admin') {
            // Unauthorized for this role
            return NextResponse.redirect(new URL('/', request.url)) // Or a 403 page
        }

        // 5. Pass headers
        const requestHeaders = new Headers(request.headers)
        requestHeaders.set('x-user-name', username || '')
        requestHeaders.set('x-lab-id', labid || '')
        requestHeaders.set('x-user-role', role || '') // Adding role for convenience

        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        })

    } catch (error) {
        console.error('JWT Verification failed:', error)
        // If token invalid, and we are on protected route, redirect.
        // If we are on public route, maybe just clear headers? 
        // "If the token is missing or invalid, redirect the user back..."
        // I'll assume if they provided a token and it failed, they should re-login.
        return redirectToLogin()
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (images etc)
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}

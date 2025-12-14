import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
    let response = await updateSession(request)
    
    // Protect portal and admin routes - require authentication
    const { pathname } = request.nextUrl
    
    // Public routes that don't require auth
    const publicRoutes = [
        '/',
        '/assessment',
        '/manifesto',
        '/signin',
        '/unlock',
        '/forgot-password',
        '/reset-password'
    ]
    
    // Check if route is public
    const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith('/_next'))
    
    // If accessing portal or admin routes, check authentication
    if ((pathname.startsWith('/portal') || pathname.startsWith('/admin')) && !isPublicRoute) {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        
        if (supabaseUrl && supabaseAnonKey && supabaseAnonKey !== 'your-anon-key-here') {
            const supabase = createServerClient(
                supabaseUrl,
                supabaseAnonKey,
                {
                    cookies: {
                        getAll() {
                            return request.cookies.getAll()
                        },
                        setAll(cookiesToSet) {
                            cookiesToSet.forEach(({ name, value }) =>
                                request.cookies.set(name, value)
                            )
                            response = NextResponse.next({
                                request: {
                                    headers: request.headers,
                                },
                            })
                            cookiesToSet.forEach(({ name, value, options }) =>
                                response.cookies.set(name, value, options)
                            )
                        },
                    },
                }
            )
            
            const { data: { user } } = await supabase.auth.getUser()
            
            // If not authenticated, redirect to signin
            if (!user) {
                const signInUrl = new URL('/signin', request.url)
                signInUrl.searchParams.set('redirect', pathname)
                return NextResponse.redirect(signInUrl)
            }
        }
    }
    
    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}

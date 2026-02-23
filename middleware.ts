import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const isProtectedStudent = pathname.startsWith('/student')
  const isProtectedAdvisor = pathname.startsWith('/advisor')

  if (!isProtectedStudent && !isProtectedAdvisor) {
    return NextResponse.next()
  }

  const sessionCookie = req.cookies.get('edupath_session')?.value

  if (!sessionCookie) {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  try {
    const session = JSON.parse(sessionCookie) as {
      role?: string
    }

    if (isProtectedStudent && session.role !== 'student') {
      const url = req.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }

    if (isProtectedAdvisor && session.role !== 'advisor' && session.role !== 'admin') {
      const url = req.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
  } catch {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/student/:path*', '/advisor/:path*'],
}


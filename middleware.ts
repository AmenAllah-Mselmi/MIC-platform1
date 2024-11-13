import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isAuthenticated, getUserRole } from '@/utils/Auth'

const protectedRoutes = {
  member: ['/Member /' ,'/Member/assignments', '/Member/sessions'],
  instructor: [
    '/Instructor/assignments',
    '/Instructor/sessions',
    '/Instructor/create'
  ],
  superAdmin: ['/SuperAdmin/Add']
}

export default async function middleware(req: NextRequest) {
  const isAuth = isAuthenticated(req)
  const userRole = isAuth ? await getUserRole(req) : null
  const { pathname } = req.nextUrl

   console.log('Middleware executed')
   console.log('isAuth:', isAuth)
   console.log('userRole:', userRole)
   console.log('pathname:', pathname)

  // Redirect authenticated users away from the login page
  if (isAuth && pathname === '/login') {
    return NextResponse.redirect(new URL('/', req.nextUrl.origin))
  }

  // Redirect unauthorized users to the "Unauthorized" page
  if (isAuth) {
    if (protectedRoutes.member.includes(pathname) && userRole !== 'member') {
      return NextResponse.redirect(new URL('/unauthorized', req.nextUrl.origin))
    }
    if (
      protectedRoutes.instructor.includes(pathname) &&
      userRole !== 'instructor'
    ) {
      return NextResponse.redirect(new URL('/unauthorized', req.nextUrl.origin))
    }
    if (
      protectedRoutes.superAdmin.includes(pathname) &&
      userRole !== 'superAdmin'
    ) {
      return NextResponse.redirect(new URL('/unauthorized', req.nextUrl.origin))
    }
  } else if (Object.values(protectedRoutes).flat().includes(pathname)) {
    return NextResponse.redirect(new URL('/login', req.nextUrl.origin))
  }

  return NextResponse.next()
}

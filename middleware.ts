import { isAuthenticated } from '@/utils/Auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedRoutes = [
  '/Member/assignments',
  '/Member/sessions',
  '/Instructor/assignments',
  '/Instructor/sessions',
  '/Instructor/create',
  '/SuperAdmin/Add'
]

export default function middleware(req: NextRequest) {
  console.log('Is Authenticated:', isAuthenticated(req));

  if (!isAuthenticated(req) && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL('/login', req.nextUrl.origin)
    return NextResponse.redirect(absoluteURL.toString())
  }
  return NextResponse.next()
}

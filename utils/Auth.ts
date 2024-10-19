import { NextRequest } from 'next/server'
import { RequestCookies } from 'next/dist/server/web/spec-extension/cookies'

export function isAuthenticated(req: NextRequest): boolean {
  const cookies = new RequestCookies(req.headers)
  const tokenCookie = cookies.get('token')
  const token = tokenCookie?.value || ''
  console.log('Token:', token)
  return !!token // Returns true if token exists, false otherwise
}

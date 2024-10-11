import { type NextRequest, NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
  const { country } = request.geo ?? {}
  console.log(request.geo)
  const response = NextResponse.next()
  response.headers.set('User-Country', country ?? 'Canada')
  return response
}

export const config = {
  matcher: ['/'],
}

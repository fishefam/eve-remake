import { DateTime } from 'luxon'
import { type NextRequest, NextResponse } from 'next/server'
import timezoneLookup from 'tz-lookup'

export default async function middleware(request: NextRequest) {
  const { latitude = '43.351330', longitude = '-79.799380' } = request.geo ?? {}
  const timezone = timezoneLookup(parseFloat(latitude), parseFloat(longitude))
  const { hour } = DateTime.now().setZone(timezone)
  const response = NextResponse.next()
  response.headers.set('Hour', hour + '')
  return response
}

export const config = {
  matcher: ['/'],
}

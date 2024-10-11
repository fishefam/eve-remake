import { type NextRequest } from 'next/server'
import { findTimezoneByCityName } from 'node-location-timezone'

export default function middleware(request: NextRequest) {
  const { city = 'Toronto', country = 'CA' } = request.geo ?? {}
  const tz = findTimezoneByCityName(city) ?? ''
  console.log(country, city, tz)
  // const time = DateTime.now().setZone('America/New_York').toISOTime({ suppressMilliseconds: true })
  // console.log(time)
}

export const config = {
  matcher: ['/'],
}

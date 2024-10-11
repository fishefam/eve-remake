import { type NextRequest } from 'next/server'

export default function middleware(_request: NextRequest) {
  // const { city = 'Toronto', country = 'CA' } = request.geo ?? {}
  // const tz = findTimezoneByCityName(city) ?? ''
  console.log(process.env.TIMEZONEDB)
}

export const config = {
  matcher: ['/'],
}

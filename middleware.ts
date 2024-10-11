import { lookupViaCity } from 'city-timezones'
import { type NextRequest } from 'next/server'

export default function middleware(request: NextRequest) {
  const { city = 'Toronto', country = 'CA' } = request.geo ?? {}
  const cityData = lookupViaCity(city) ?? {}
  const timezones = cityData.map(({ timezone }) => timezone)
  console.log(country, city, timezones)
  // const time = DateTime.now().setZone('America/New_York').toISOTime({ suppressMilliseconds: true })
  // console.log(time)
}

export const config = {
  matcher: ['/'],
}

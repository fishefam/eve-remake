import { getCountry } from 'countries-and-timezones'
import { type NextRequest } from 'next/server'

export default function middleware(request: NextRequest) {
  const { country = 'CA' } = request.geo ?? {}
  const { timezones = ['Canada/Eastern'] } = getCountry(country) ?? {}
  console.log(timezones)
  // const time = DateTime.now().setZone('America/New_York').toISOTime({ suppressMilliseconds: true })
  // console.log(time)
}

export const config = {
  matcher: ['/'],
}

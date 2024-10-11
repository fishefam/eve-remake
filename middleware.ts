import { find } from 'geo-tz'
import { DateTime } from 'luxon'
import { type NextRequest } from 'next/server'

export default function middleware(request: NextRequest) {
  const latitude = parseFloat(request.geo?.latitude ?? '0')
  const longitude = parseFloat(request.geo?.longitude ?? '0')
  const [tz] = find(latitude, longitude)
  const time = DateTime.now().setZone(tz).toISOTime({ suppressMilliseconds: true })
  console.log(time)
}

export const config = {
  matcher: ['/'],
}

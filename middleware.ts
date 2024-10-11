import { type NextRequest } from 'next/server'
import { getSunset } from 'sunrise-sunset-js'

export default function middleware(request: NextRequest) {
  const { latitude = '0', longitude = '0' } = request.geo ?? {}
  const sunset = getSunset(parseFloat(latitude), parseFloat(longitude))
  console.log(sunset)
}

export const config = {
  matcher: ['/'],
}

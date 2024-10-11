import { type NextRequest } from 'next/server'

export default async function middleware(request: NextRequest) {
  const { latitude = '43.351330', longitude = '-79.799380' } = request.geo ?? {}
  const response = await fetch(
    `https://api.timezonedb.com/v2.1/get-time-zone?key=${process.env.TIMEZONEDB}&format=json&by=position&lat=${parseFloat(latitude)}&lng=${parseFloat(longitude)}`,
  )
  const { formatted } = JSON.parse(await response.text()) as { formatted: string }
  const currentHour = new Date(formatted).getHours()
  console.log('current hour: ', currentHour)
}

export const config = {
  matcher: ['/'],
}

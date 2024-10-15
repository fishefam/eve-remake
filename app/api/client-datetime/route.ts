import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, response: NextResponse) {
  console.log(request.geo)
  return NextResponse.json({ r: request.geo })
}

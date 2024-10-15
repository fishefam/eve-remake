import type { NextRequest } from 'next/server'

import { NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { geo } = request
  console.log(geo)
  return NextResponse.json({ geo })
}

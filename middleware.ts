import { DateTime } from 'luxon'
import { type NextRequest, NextResponse } from 'next/server'
import timezoneLookup from 'tz-lookup'

import { getItem } from './lib/utils'

type HelperParams = { request: NextRequest; response: NextResponse }

export const config = {
  matcher: ['/', '/about', '/solutions(/?.*)', '/industries', '/case-studies', '/resources(/?.*)', '/contact'],
}

export default async function middleware(request: NextRequest) {
  const helperParams: HelperParams = { request, response: NextResponse.next() }
  setHourHeaders(helperParams)
  setPathHeaders(helperParams)
  setArticleHeaders(helperParams)
  return helperParams.response
}

function setHourHeaders({ request, response }: HelperParams) {
  const { geo } = request ?? {}
  const { latitude = '43.351330', longitude = '-79.799380' } = geo ?? {}
  const timezone = timezoneLookup(parseFloat(latitude), parseFloat(longitude))
  const { hour } = DateTime.now().setZone(timezone)
  response.headers.set('Hour', hour + '')
}

function setPathHeaders({ request, response }: HelperParams) {
  response.headers.set('Path', request.nextUrl.pathname)
}

function setArticleHeaders({ request, response }: HelperParams) {
  const hostname = 'https://evenica.com'
  const { pathname } = request.nextUrl
  const articlePathMap = { 'case-studies': 'case_studies', 'resources': 'resource' }
  const [rootPath, ...restPaths] = pathname.split('/').filter((value) => value)
  if (Object.keys(articlePathMap).includes(rootPath)) {
    const article = getItem(restPaths, -1)
    response.headers.set('Legacy-Path', `${hostname}/${articlePathMap[rootPath as 'resources']}/${article}`)
  }
}

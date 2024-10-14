import type { ResolvingMetadata } from 'next'

import { MainContainer } from '@/components/utils'
import { createTitle } from '@/lib/utils'
import { minify } from 'html-minifier-terser'
import { JSDOM } from 'jsdom'
import { headers as getHeaders } from 'next/headers'

export async function generateMetadata(_: object, parent: ResolvingMetadata) {
  const metadata = await parent
  return { description: 'Article', title: createTitle('Article | Case Study', metadata) }
}

export default async function Page(_: { params: { resource: string } }) {
  const { article } = await getData()
  return (
    <MainContainer>
      <article className="case-study-article" dangerouslySetInnerHTML={{ __html: article }}></article>
    </MainContainer>
  )
}

async function getData() {
  const legacyPath = getHeaders().get('Legacy-Path')!
  const response = await fetch(legacyPath)
  const html = await response.text()
  const { body, title } = new JSDOM(html).window.document
  const container = body.querySelector('#main-content .et_builder_inner_content')
  const article = container?.innerHTML ?? ''
  const minifiedArticle = (await minify(article, { collapseWhitespace: true })).replace(
    /(style|srcset|fetchpriority|decoding|sizes)="[^"]*"/gi,
    '',
  )
  return { article: minifiedArticle, title }
}

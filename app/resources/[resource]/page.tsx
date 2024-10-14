import type { ResolvingMetadata } from 'next'

import { MainContainer } from '@/components/utils'
import { createTitle } from '@/lib/utils'
import { minify } from 'html-minifier-terser'
import { JSDOM } from 'jsdom'
import { headers as getHeaders } from 'next/headers'

export async function generateMetadata(_: object, parent: ResolvingMetadata) {
  const metadata = await parent
  const { article, title } = await getData()
  articleContent = article
  return { description: title, title: createTitle(title, metadata) }
}

export default async function Page(_: { params: { resource: string } }) {
  return (
    <MainContainer>
      <article className="mapped-article" dangerouslySetInnerHTML={{ __html: articleContent }}></article>
    </MainContainer>
  )
}

async function getData() {
  const legacyPath = getHeaders().get('Legacy-Path')!
  const response = await fetch(legacyPath)
  const html = await response.text()
  const { body, title } = new JSDOM(html).window.document
  const article = body.querySelector('.et_pb_column_0_tb_body')?.innerHTML ?? ''
  const minifiedArticle = (await minify(article, { collapseWhitespace: true })).replace(
    /(class|style|srcset|fetchpriority|decoding|sizes)="[^"]*"/gi,
    '',
  )
  return { article: minifiedArticle, title }
}

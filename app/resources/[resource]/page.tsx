import type { ResolvingMetadata } from 'next'

import { MainContainer } from '@/components/utils'
import { createTitle } from '@/lib/utils'
import { minify } from 'html-minifier-terser'
import { JSDOM } from 'jsdom'
import { headers as getHeaders } from 'next/headers'

export async function generateMetadata(_: object, parent: ResolvingMetadata) {
  const metadata = await parent
  return { description: 'Article', title: createTitle('Article | Resource', metadata) }
}

export default async function Page(_: { params: { resource: string } }) {
  const { article } = await getData()
  return (
    <MainContainer>
      <article className="resource-article" dangerouslySetInnerHTML={{ __html: article }}></article>
    </MainContainer>
  )
}

async function getData() {
  const legacyPath = getHeaders().get('Legacy-Path')!
  const response = await fetch(legacyPath)
  const html = await response.text()
  const { body, title } = new JSDOM(html).window.document
  const container = body.querySelector('.et_pb_column_0_tb_body')
  const lastParagraph = body.querySelector('.et_pb_column_0_tb_body > div:last-child > p:last-of-type')
  const actionLink = body.querySelector('.et_pb_column_0_tb_body > div:last-child > p:last-of-type a')
  const lastParagraphText = Array.from(lastParagraph?.childNodes ?? []).reduce(
    (a, b) => a + (b.nodeType === 3 ? b.textContent : ''),
    '',
  )
  if (!lastParagraphText.length && actionLink) {
    const element = body.querySelector('.et_pb_column_0_tb_body > div:last-child > p:last-of-type a')
    if (element) {
      element.classList.add('eve-action-link')
      element.textContent = element?.textContent?.toLowerCase() ?? ''
    }
  }
  const article = container?.innerHTML ?? ''
  const minifiedArticle = (await minify(article, { collapseWhitespace: true })).replace(
    /(style|srcset|fetchpriority|decoding|sizes)="[^"]*"/gi,
    '',
  )
  return { article: minifiedArticle, title }
}

import type { ResolvingMetadata } from 'next'

import Intro from '@/components/intro'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { ConditionalRender, MainContainer } from '@/components/utils'
import { createTitle } from '@/lib/utils'
import { Download, Eye } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import PDFViewer from './pdf'
import theRaiderImageData from './the-raider-image.study.json'

export async function generateMetadata(_: object, parent: ResolvingMetadata) {
  const metadata = await parent
  return { description: 'Article', title: createTitle('Article | Case Study', metadata) }
}

export default async function Page(_: { params: { resource: string } }) {
  // const { article } = await getData()
  const { heroImage, intro, logos, pdfUrl, sections, title } = theRaiderImageData
  return (
    <MainContainer className="space-y-16">
      <Intro description={intro} title={title} />
      <section className="mb-12 flex justify-center space-x-8">
        {logos.map(({ alt, url }) => (
          <Image alt={alt} className="w-48 dark:invert" height={720} key={url} src={url} width={1280} />
        ))}
      </section>
      <section>
        <Image alt={heroImage.alt} className="rounded-lg object-cover" height={706} src={heroImage.url} width={3087} />
      </section>
      <section className="mt-12 text-center">
        <Button asChild className="rounded-full" size="lg">
          <Link download href={pdfUrl}>
            <Download className="mr-2 size-5" /> Download Case Study PDF
          </Link>
        </Button>
      </section>
      <section className="grid gap-12">
        {sections.map(({ paragraphs, subtitle, title }) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
              <ConditionalRender show={!!subtitle}>
                <p className="italic">{subtitle}</p>
              </ConditionalRender>
            </CardHeader>
            <CardContent>
              {paragraphs.map(({ isQuote, text }) => {
                const Tag = isQuote ? 'blockquote' : 'p'
                return (
                  <Tag className={isQuote ? 'mb-4 border-l-4 border-primary pl-4 italic' : 'mb-4'} key={text}>
                    {text}
                  </Tag>
                )
              })}
            </CardContent>
          </Card>
        ))}
      </section>
      <section className="mt-12 text-center">
        <div className="inline-flex rounded-full shadow">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="rounded-l-full px-4 py-2 text-white focus:outline-none dark:text-gray-700" size="lg">
                <Eye className="mr-2 size-5" /> View Case Study PDF
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90%] max-w-[90%] overflow-auto bg-[rgb(238,242,255)] dark:bg-gray-800">
              <PDFViewer file={pdfUrl} />
            </DialogContent>
          </Dialog>
          <Button
            className="rounded-r-full bg-gray-700 px-4 py-2 text-white focus:outline-none hover:dark:bg-gray-800"
            size="lg"
          >
            <a download href={pdfUrl}>
              <Download className="mr-2 size-5" />
              <p className="sr-only">Download Case Study PDF</p>
            </a>
          </Button>
        </div>
      </section>

      {/* <article className="case-study-article" dangerouslySetInnerHTML={{ __html: article }}></article> */}
    </MainContainer>
  )
}

// async function getData() {
//   const legacyPath = getHeaders().get('Legacy-Path')!
//   const response = await fetch(legacyPath)
//   const html = await response.text()
//   const { body, title } = new JSDOM(html).window.document
//   const container = body.querySelector('#main-content .et_builder_inner_content')
//   const article = container?.innerHTML ?? ''
//   const minifiedArticle = (await minify(article, { collapseWhitespace: true })).replace(
//     /(style|srcset|fetchpriority|decoding|sizes)="[^"]*"/gi,
//     '',
//   )
//   return { article: minifiedArticle, title }
// }

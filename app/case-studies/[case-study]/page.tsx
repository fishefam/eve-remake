import type { ResolvingMetadata } from 'next'

import Intro from '@/components/intro'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ConditionalRender, MainContainer } from '@/components/utils'
import { cn, createTitle } from '@/lib/utils'
import { Download, Eye } from 'lucide-react'
import Image from 'next/image'

import PDFViewer from '../../../components/pdf'
import kaiData from './kai-usa-ltd.study.json'
import kaskoData from './kasco.study.json'
import theRaiderImageData from './the-raider-image.study.json'

export async function generateMetadata(_: object, parent: ResolvingMetadata) {
  const metadata = await parent
  return { description: 'Article', title: createTitle('Article | Case Study', metadata) }
}

export default async function Page({ params }: { params: { 'case-study': string } }) {
  const caseStudyPath = params['case-study'] as CaseStudyPath
  const studyData: Record<CaseStudyPath, typeof theRaiderImageData> = {
    'kai-case-study': kaiData,
    'kasco-case-study': kaskoData,
    'the-raider-image-case-study': theRaiderImageData,
  }
  const { heroImage, intro, logos, pdfUrl, sections, title } = studyData[caseStudyPath]
  return (
    <MainContainer className="space-y-16">
      <Intro description={intro} title={title} />
      <section className="mb-12 flex justify-center space-x-8">
        {logos.map(({ alt, url }) => (
          <Image
            alt={alt}
            className={cn('dark:invert', caseStudyPath === 'kasco-case-study' ? 'w-auto' : 'w-48')}
            height={1080}
            key={url}
            priority
            src={url}
            width={1920}
          />
        ))}
      </section>
      <section>
        <Image
          alt={heroImage.alt}
          className="max-h-80 rounded-lg object-cover"
          height={706}
          priority
          src={heroImage.url}
          width={3087}
        />
      </section>
      <DownloadButton pdfUrl={pdfUrl} />
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
      <DownloadButton pdfUrl={pdfUrl} />
    </MainContainer>
  )
}

function DownloadButton({ pdfUrl }: { pdfUrl: string }) {
  return (
    <section className="mt-12 text-center">
      <div className="inline-flex rounded-full shadow">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-l-full px-4 py-2 text-white focus:outline-none dark:text-gray-700" size="lg">
              <Eye className="mr-2 size-5" /> View Case Study PDF
            </Button>
          </DialogTrigger>
          <DialogContent className="grid h-[90%] max-w-[70%] place-items-center overflow-auto bg-[rgb(238,242,255)] dark:bg-gray-800">
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
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
  )
}

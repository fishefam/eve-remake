import type { CaseStudies as TCaseStudies } from '@/components/case-study-grid'
import type { Filters as TFilters } from '@/components/filter'
import type { ResolvingMetadata } from 'next'

import CaseStudyGrid from '@/components/case-study-grid'
import Filters from '@/components/filter'
import Highlight from '@/components/highlight'
import Intro from '@/components/intro'
import { MainContainer } from '@/components/utils'
import { capFirstChar, createTitle } from '@/lib/utils'
import { JSDOM } from 'jsdom'

export async function generateMetadata(_: object, parent: ResolvingMetadata) {
  const metadata = await parent
  return { title: createTitle('Case Studies', metadata) }
}

export default async function CaseStudies() {
  const { caseStudies, filters } = await getData()
  return (
    <MainContainer>
      <Intro
        description="Discover how Evenica has helped businesses transform their e-commerce experiences."
        title="Case Studies"
      />
      <Filters filters={filters}>
        <CaseStudyGrid caseStudies={caseStudies} />
      </Filters>
      <Highlight />
    </MainContainer>
  )
}

async function getData() {
  const data: { caseStudies: TCaseStudies; filters: TFilters } = {
    caseStudies: [],
    filters: [],
  }
  try {
    const response = await fetch(process.env.CASE_STUDIES_URL ?? 'https://evenica.com/case-studies/')
    const html = await response.text()
    const { body } = new JSDOM(html).window.document
    data.filters = Array.from(body.querySelectorAll('select')).map(({ options }) => ({
      name: options[0].text.toLowerCase(),
      options: Array.from(options).map(({ text, value }, i, array) => ({
        text: i === 0 ? `All ${capFirstChar(text)}` : text,
        value:
          i === 0
            ? array
                .filter(({ value }) => value)
                .map(({ value }) => value)
                .join(' ')
            : value,
      })),
    }))
    data.caseStudies = Array.from(body.querySelectorAll('.case_studies-list > div')).map((item) => {
      const getValue = (selector: string, attr: 'alt' | 'href' | 'src' | 'textContent'): string =>
        item.querySelector(selector)?.[attr as 'textContent']?.trim() ?? ''
      return {
        description: getValue('p', 'textContent'),
        href: getValue('a', 'href'),
        imgAlt: getValue('img', 'alt'),
        imgUrl: getValue('img', 'src'),
        tags: Array.from(item.classList).filter((value) => value !== 'grid-item'),
        title: getValue('h3', 'textContent'),
      }
    })
  } catch {
    data.caseStudies = []
    data.filters = []
  }
  return data
}

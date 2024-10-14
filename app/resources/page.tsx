import type { TContentGrid } from '@/components/content-grid'
import type { TFilters } from '@/components/filter'
import type { ResolvingMetadata } from 'next'

import ContentWithFilter from '@/components/content-with-filter'
import Highlight from '@/components/highlight'
import Intro from '@/components/intro'
import { MainContainer } from '@/components/utils'
import { capFirstChar, createTitle } from '@/lib/utils'
import { JSDOM } from 'jsdom'

export async function generateMetadata(_: object, parent: ResolvingMetadata) {
  const metadata = await parent
  return {
    description:
      'Explore how Evenica transforms businesses with cutting-edge e-commerce solutions. Browse case studies across industries showcasing real-world success with Microsoft Dynamics 365 Commerce and more.',
    title: createTitle('Resources', metadata),
  }
}

export default async function Page() {
  const { filters, resources } = await getData()
  return (
    <MainContainer>
      <Intro
        description="Discover insights, guides, and tools to enhance your e-commerce strategy."
        title="Resources"
      />
      <ContentWithFilter
        contents={resources}
        filters={filters}
        legacyPath="https://evenica.com/resource"
        path="/resources"
      />
      <Highlight />
    </MainContainer>
  )
}

async function getData() {
  const data: { filters: TFilters; resources: TContentGrid } = {
    filters: [],
    resources: [],
  }
  try {
    const response = await fetch(process.env.RESOURCES_URL ?? 'https://evenica.com/resources/')
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
    data.resources = Array.from(body.querySelectorAll('.resource-list > div')).map((item) => {
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
    data.resources = []
    data.filters = []
  }
  return data
}

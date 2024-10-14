import type { ResolvingMetadata } from 'next'

import ComingSoon from '@/components/coming-soon'
import Intro from '@/components/intro'
import { ConditionalRender, MainContainer } from '@/components/utils'
import { createTitle } from '@/lib/utils'
import { notFound } from 'next/navigation'

import CommerceImplementation from './commerce-implementation'

const solutions: {
  description: string
  hasContent?: boolean
  path: SolutionPath
  title: string
}[] = [
  {
    description:
      'With decades of experience in e-commerce implementation, Evenica uses a refined implementation methodology to offer rapid turnaround and dependable value.',
    hasContent: true,
    path: 'd365-commerce',
    title: 'E-commerce Implementation',
  },
  {
    description:
      'A powerful library of functional and independent building blocks designed to enhance the capabilities of Microsoft Dynamics 365 Commerce for both B2C and B2B companies.',
    path: 'e4-dynamics',
    title: 'e4Dynamics',
  },
  {
    description:
      'Designed to meet the diverse needs of modern e-commerce businesses, e4Platform enables businesses to scale efficiently while addressing complex use cases.',
    path: 'e4-platform',
    title: 'e4Platform',
  },
]

export async function generateMetadata({ params }: { params: { solution: SolutionPath } }, parent: ResolvingMetadata) {
  const metadata = await parent
  const [{ description, title }] = solutions.filter(({ path }) => path === params.solution)
  return { description, title: createTitle(title, metadata) }
}

export default function Page({ params }: { params: { solution: SolutionPath } }) {
  if (!solutions.map(({ path }) => path).includes(params.solution)) notFound()
  const [{ description, hasContent, title }] = solutions.filter(({ path }) => path === params.solution)
  const is = (path: SolutionPath) => params.solution === path
  return (
    <MainContainer>
      <ConditionalRender show={!hasContent}>
        <ComingSoon />
      </ConditionalRender>
      <ConditionalRender show={!!hasContent}>
        <Intro description={description} title={title} />
        <ConditionalRender show={is('d365-commerce')}>
          <CommerceImplementation />
        </ConditionalRender>
      </ConditionalRender>
    </MainContainer>
  )
}

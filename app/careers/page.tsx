import type { ResolvingMetadata } from 'next'

import CareerForm from '@/components/career-form'
import { LeavingArrow } from '@/components/icons'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ConditionalRender, MainContainer } from '@/components/utils'
import { createTitle } from '@/lib/utils'
import { JSDOM } from 'jsdom'
import { BriefcaseIcon, GraduationCapIcon, HeartIcon, HomeIcon, SmileIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export async function generateMetadata(_: object, parent: ResolvingMetadata) {
  const metadata = await parent
  return { title: createTitle('Careers', metadata) }
}

export default function Page() {
  return (
    <MainContainer className="space-y-16">
      <h1 className="mb-12 text-center text-4xl font-bold text-gray-900 dark:text-white">Join Our Team</h1>
      <Welcome />
      <JobOpenings />
      <CareerForm />
    </MainContainer>
  )
}

function Welcome() {
  return (
    <div className="mb-12 grid gap-12 md:grid-cols-2">
      <div>
        <h2 className="mb-4 text-2xl font-semibold">Life At Evenica</h2>
        <p className="mb-6 text-gray-700 dark:text-white">
          At Evenica we&#39;re always interested in people who are ambitious, dedicated and love what they do. We have a
          mindset of growth and a culture of collaboration, passion and innovation. Our goal is to deliver exceptional
          user experiences within complex technology environments using the latest in a fun and dynamic way. We are
          excited to foster a workplace that allows people to meet challenges and provides the opportunity to make an
          impact in a growing business.
        </p>
        <h3 className="mb-4 text-xl font-semibold">We&#39;re proud to offer:</h3>
        <ul className="space-y-4">
          <li className="flex items-center">
            <HomeIcon className="mr-2 size-6 text-primary" />
            <span>Flexible Work Options</span>
          </li>
          <li className="flex items-center">
            <GraduationCapIcon className="mr-2 size-6 text-primary" />
            <span>Formal Training & Career Development</span>
          </li>
          <li className="flex items-center">
            <HeartIcon className="mr-2 size-6 text-primary" />
            <span>Employer Paid Benefits</span>
          </li>
          <li className="flex items-center">
            <SmileIcon className="mr-2 size-6 text-primary" />
            <span>Casual Dress Code</span>
          </li>
          <li className="flex items-center">
            <BriefcaseIcon className="mr-2 size-6 text-primary" />
            <span>Supportive Environment</span>
          </li>
        </ul>
      </div>
      <div className="relative aspect-video overflow-hidden rounded-lg">
        <Image alt="Team working together" height={3000} priority src="/images/careers.png" width={2400} />
      </div>
    </div>
  )
}

async function JobOpenings() {
  const jobs = await getData()
  return (
    <Card className="mb-12">
      <CardHeader>
        <CardTitle>Current Openings</CardTitle>
      </CardHeader>
      <CardContent>
        <ConditionalRender show={!!jobs.length}>
          {jobs.map(({ href, textContent }) => (
            <ul className="space-y-2" key={href}>
              <li>
                <Link className="flex items-center gap-1 text-indigo-500 hover:underline" href={href} target="_blank">
                  {textContent} <LeavingArrow />
                </Link>
              </li>
            </ul>
          ))}
        </ConditionalRender>
        <ConditionalRender show={!jobs.length}>
          We don&#39;t have any vacancy at the moment. Check back soon for more information.
        </ConditionalRender>
      </CardContent>
    </Card>
  )
}

async function getData() {
  const response = await fetch('https://evenica.com/careers/')
  const html = await response.text()
  const { body } = new JSDOM(html).window.document
  const jobElements = Array.from(body.querySelectorAll<HTMLAnchorElement>('.et_pb_section_2 li a'))
  return jobElements.map(({ href, textContent }) => ({ href, textContent: textContent ?? '' }))
}

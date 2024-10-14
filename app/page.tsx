import type { ResolvingMetadata } from 'next/types'

import Acknowledgement from '@/components/acknowledgement'
import CaseStudy from '@/components/case-study'
import ClientCarousel from '@/components/client-carousel'
import ClientLink from '@/components/client-link'
import Intro from '@/components/intro'
import { Button } from '@/components/ui/button'
import { MainContainer } from '@/components/utils'
import { createTitle } from '@/lib/utils'
import { ArrowRight, CheckCircle } from 'lucide-react'
import Image from 'next/image'

export async function generateMetadata(_: object, parent: ResolvingMetadata) {
  const metadata = await parent
  return { title: createTitle('Home', metadata) }
}

export default function Page() {
  return (
    <MainContainer>
      <Intro
        description="Innovative commerce experiences start with Evenica. Trust one of the longest standing and most experienced commerce solution providers within the Microsoft channel to elevate your brand."
        href="about"
        title={
          <>
            Commerce Exists Where
            <br />
            Transaction Meets Interaction
          </>
        }
      />
      <MicrosoftParter />
      <ClientCarousel />
      <D365Commerce />
      <CaseStudy
        alt="Raider Image"
        description="Discover how The Raider Image is using Evenica&#039;s ePlatform and eIntegrate to create a connected commerce solution with seamless integration capabilities."
        href="case-studies/the-raider-image-case-study"
        image="/images/the-raider-image.png"
        title="Kicking Off an Integrated E-Commerce Experience for The Raider Image"
      />
      <Acknowledgement />
      <Testimonial />
    </MainContainer>
  )
}

function MicrosoftParter() {
  return (
    <section className="mb-20 rounded-lg bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-700 px-6 py-14 text-center text-white shadow-lg">
      <h2 className="mb-4 text-3xl font-bold">Microsoft Partner of the Year Finalist</h2>
      <p className="mb-6 text-xl">
        Evenica is honoured to be named a finalist for the Dynamics 365 Commerce 2022 Microsoft Partner of the Year
        Award. This award recognizes partners that excel at providing innovative and unique customer solutions centered
        on Microsoft Dynamics 365 Commerce.
      </p>
    </section>
  )
}

function D365Commerce() {
  const components = [
    'Product Information Enrichment',
    'Product and Service Eligibility',
    'Advanced Search Capabilities',
  ]
  const features = ['Unified Commerce', 'Product Information Management', 'Advanced Search']
  return (
    <section className="mb-20">
      <h2 className="mb-20 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-center text-3xl font-bold text-transparent dark:from-indigo-400 dark:to-purple-400">
        Innovative Commerce Solutions
      </h2>
      <div className="grid gap-20 md:grid-cols-2">
        <div className="mx-auto space-y-8 rounded-lg bg-[#EAEAEA] p-3 shadow-lg sm:p-8">
          <div className="grid grid-cols-3 gap-4">
            {components.map((title) => (
              <div
                className="overflow-hidden rounded-lg bg-blue-500 px-1 py-4 text-center text-xs font-semibold text-white shadow-md transition-shadow duration-300 hover:shadow-lg md:p-4 lg:text-sm"
                key={title}
              >
                {title}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center space-x-4">
            <div className="h-px grow bg-gray-300"></div>
            <div className="whitespace-nowrap text-center text-sm text-gray-500">sample micro-apps</div>
            <div className="h-px grow bg-gray-300"></div>
          </div>
          <div className="rounded-lg bg-blue-600 p-6 text-white shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <div className="flex items-center justify-center space-x-4">
              <div className="flex size-12 min-w-12 items-center justify-center rounded-full bg-white text-xl font-bold text-blue-600">
                e4
              </div>
              <h2 className="text-2xl font-bold">Evenica&#039;s e4Platform</h2>
            </div>
          </div>
          <div className="rounded-lg bg-blue-800 p-6 text-white shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <div className="flex items-center justify-center space-x-4">
              <div className="flex size-12 items-center justify-center">
                <Image
                  alt="Dynamics 365 Commerce"
                  className="h-auto min-w-12"
                  height={0}
                  sizes="48px"
                  src="svgs/commerce-icon.svg"
                  width={0}
                />
              </div>
              <h2 className="text-2xl font-bold">Microsoft Dynamics 365 Commerce</h2>
            </div>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">Microsoft Dynamics 365 Commerce</h3>
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            Microsoft Dynamics 365 Commerce implementations, enhanced with Evenica&#039;s e4Platform. Choose from a wide
            range of modules to extend and amplify the capabilities of Commerce – designed with industry solutions in
            mind. Evenica has robust solutions for customers in all major industries – including retail, manufacturing,
            public sector, healthcare and more.
          </p>
          <ul className="mb-6 space-y-2">
            {features.map((feature) => (
              <li className="flex items-center" key={feature}>
                <CheckCircle className="mr-2 text-indigo-500 dark:text-indigo-400" />
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
          <Button
            asChild
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white transition-colors hover:from-indigo-600 hover:to-purple-700"
            size="lg"
          >
            <ClientLink href="solutions">
              Learn More <ArrowRight className="ml-2 size-4" />
            </ClientLink>
          </Button>
        </div>
      </div>
    </section>
  )
}

function Testimonial() {
  return (
    <section className="mb-20 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 p-12 text-white dark:from-indigo-600 dark:to-purple-700">
      <blockquote className="text-center text-2xl font-light italic">
        &#34;Working with Evenica has been fantastic. There&#39;s a cultural fit of keeping things exciting and fun.
        Your team is more than just a platform implementer, you&#39;re really a marketing partner and that&#39;s the
        exact kind of partner that we&#39;re looking for.&#34;
      </blockquote>
      <p className="mt-4 text-center font-semibold">- Jake Howard, IT Director at KASCO</p>
    </section>
  )
}

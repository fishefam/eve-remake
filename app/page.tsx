import type { ResolvingMetadata } from 'next/types'

import ClientCarousel from '@/components/client-carousel'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createTitle } from '@/lib/utils'
import { ArrowRight, CheckCircle, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export async function generateMetadata(_: object, parent: ResolvingMetadata) {
  const metadata = await parent
  return { title: createTitle('Home', metadata) }
}

export default function Home() {
  return (
    <div className="[&>*:not(.ignore-eve-container)]:eve-container space-y-40">
      <Intro />
      <MicrosoftParter />
      <ClientCarousel />
      <D365Commerce />
      <CaseStudy />
      <Acknowledgement />
      <Testimonial />
    </div>
  )
}

function Intro() {
  return (
    <section className="text-center">
      <h1 className="mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent dark:from-indigo-400 dark:to-purple-400 md:text-6xl">
        Commerce Exists Where
        <br />
        Transaction Meets Interaction
      </h1>
      <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-700 dark:text-gray-300">
        Innovative commerce experiences start with Evenica. Trust one of the longest standing and most experienced
        commerce solution providers within the Microsoft channel to elevate your brand.
      </p>
      <Button
        asChild
        className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white transition-colors hover:from-indigo-600 hover:to-purple-700"
        size="lg"
      >
        <Link href="about">
          Learn More <ArrowRight className="ml-2 size-4" />
        </Link>
      </Button>
    </section>
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
  return (
    <section className="mb-20">
      <h2 className="mb-20 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-center text-3xl font-bold text-transparent dark:from-indigo-400 dark:to-purple-400">
        Innovative Commerce Solutions
      </h2>
      <div className="grid gap-20 md:grid-cols-2">
        <div className="mx-auto space-y-8 rounded-lg bg-[#EAEAEA] p-3 shadow-lg sm:p-8">
          <div className="grid grid-cols-3 gap-4">
            {['Product Information Enrichment', 'Product and Service Eligibility', 'Advanced Search Capabilities'].map(
              (title) => (
                <div
                  className="overflow-hidden rounded-lg bg-blue-500 px-1 py-4 text-center text-xs font-semibold text-white shadow-md transition-shadow duration-300 hover:shadow-lg md:p-4 lg:text-sm"
                  key={title}
                >
                  {title}
                </div>
              ),
            )}
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
                  className="min-w-12"
                  height={48}
                  src="http://dynamicssolution.com/wp-content/uploads/2020/08/Commerce.svg"
                  width={48}
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
            {['Unified Commerce', 'Product Information Management', 'Advanced Search'].map((feature) => (
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
            <Link href="solutions">
              Learn More <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function CaseStudy() {
  return (
    <section className="mb-20">
      <Card className="overflow-hidden dark:bg-gray-800">
        <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white dark:from-indigo-600 dark:to-purple-700">
          <CardTitle className="text-2xl font-bold">Featured Case Study</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6 p-6 md:flex-row">
          <Image
            alt="Raider Image"
            className="size-32 rounded-full border-4 border-indigo-500 object-contain p-2 dark:border-indigo-400 dark:invert"
            height={180}
            src="/RaiderImage-Official-PMS.png"
            width={180}
          />
          <div>
            <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
              Kicking Off an Integrated E-Commerce Experience for The Raider Image
            </h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Discover how The Raider Image is using Evenica&#039;s ePlatform and eIntegrate to create a connected
              commerce solution with seamless integration capabilities.
            </p>
            <Button
              asChild
              className="border-none bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700"
              variant="outline"
            >
              <Link href="case_studies/the-raider-image-case-study/">
                Read More <ChevronRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

function Acknowledgement() {
  const items = [
    {
      alt: 'Microsoft Partner',
      height: 553,
      img: '/Finalist-Logo.png',
      text: 'Evenica is honoured to be named a finalist for the Dynamics 365 Commerce 2022 Microsoft Partner of the Year Award. This award recognizes partners that excel at providing innovative and unique customer solutions centered on Microsoft Dynamics 365 Commerce.',
      title: 'Partner of the Year Finalist',
      width: 1321,
    },
    {
      alt: 'Deloitte Fast 50',
      height: 515,
      img: '/Deloitte.png',
      text: 'Evenica was presented the Deloitte Technology Fast 50TM program award in 2020 for our rapid revenue growth, entrepreneurial spirit and bold innovation. The program recognizes technology companies with the highest revenue-growth percentage over the past four years. Evenica earned this recognition with 420% revenue growth from 2016 and 2019.',
      title: 'Recognized For Our Rapid Growth',
      width: 1590,
    },
  ] as const
  return (
    <section className="mb-20 grid gap-12 md:grid-cols-2">
      {items.map(({ alt, height, img, text, title, width }) => (
        <div key={title}>
          <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">{title}</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">{text}</p>
          <Image
            alt={alt}
            className="w-2/3 rounded bg-white object-cover shadow"
            height={height}
            src={img}
            width={width}
          />
        </div>
      ))}
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

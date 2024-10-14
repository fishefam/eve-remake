import type { ResolvingMetadata } from 'next'

import Acknowledgement from '@/components/acknowledgement'
import ClientCarousel from '@/components/client-carousel'
import Highlight from '@/components/highlight'
import Intro from '@/components/intro'
import Story from '@/components/story'
import { Card, CardContent } from '@/components/ui/card'
import { MainContainer } from '@/components/utils'
import { createTitle } from '@/lib/utils'
import Image from 'next/image'

export async function generateMetadata(_: object, parent: ResolvingMetadata) {
  const metadata = await parent
  return {
    description:
      'Learn about Evenica, a Microsoft Gold Partner and leader in e-commerce solutions. With over 20 years of experience, we deliver innovative digital solutions for top brands through expertise in Microsoft Dynamics 365 Commerce.',
    title: createTitle('About', metadata),
  }
}

export default function Page() {
  return (
    <MainContainer>
      <Intro
        className={{ description: 'max-w-4xl' }}
        description="Evenica is an independent software vendor and system integrator developing e-commerce solutions for brands that envision the most demanding and sophisticated digital experiences. A Microsoft Gold Partner recognized as the longest tenured and most experienced e-commerce partner in the Microsoft ecosystem."
        title="About Evenica"
      />
      <Story
        classNames={{ image: 'lg:object-[0_-150px]' }}
        image="/images/about.png"
        imagePriority
        quality={10}
        texts={[
          'Evenica was founded in 2014 by Mike Bolton and Sadek Ali after two decades of technology and e-commerce experience led to an undeniable quench for innovation. They wanted to create a company that delivered exceptional customer service and was tenacious enough to solve even the most complex e-commerce challenges. Above all, Mike and Sadek wanted to create a work environment that allowed employees to have freedom of expression and the courage to seek out unique e-commerce solutions.',
          'Evenica relies on over 20 years of experience and a perfected methodology to provide direct and quick e-commerce implementation. We’re able to give our customers ‘white glove’ concierge services to ensure business value is optimally achieved. Our culture of earnest is a shared success with our customers, and we employ staff that are forward thinkers who actively seek creative solutions. We’re able to offer high value services through honed efficiencies, deep experience and our own portfolio of respected software.',
        ]}
        title="Our Story"
      />
      <ClientCarousel />
      <MicrosoftAlliance />
      <Acknowledgement />
      <Highlight />
    </MainContainer>
  )
}

function MicrosoftAlliance() {
  return (
    <section className="mb-20">
      <Card className="overflow-hidden dark:bg-gray-800">
        <CardContent className="flex flex-col gap-6 p-6 md:flex-row">
          <div className="w-1/2 rounded bg-white">
            <Image
              alt="Microsoft Partner"
              className="object-cover object-center"
              height={518}
              src="/images/ms-partner.png"
              width={1018}
            />
          </div>
          <div>
            <h3 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">Microsoft Alliance</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Through an uncompromising commitment to our customers&#39; success, Evenica is widely recognized as one of
              the most experienced e-commerce partners within the Microsoft channel. Evenica leverages partnerships with
              an end goal of providing exceptional customer experiences and driving mutual growth. We utilize each
              other&#39;s strong technical capabilities to complement our individual strengths. We believe that
              long-term alignment with our partners is the engine to innovation and growth.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

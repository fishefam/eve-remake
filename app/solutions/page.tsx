import CaseStudy from '@/components/case-study'
import Intro from '@/components/intro'
import Story from '@/components/story'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MainContainer } from '@/components/utils'
import { ArrowRight } from 'lucide-react'

export default function Solutions() {
  return (
    <MainContainer>
      <Intro
        description="Innovative Digital Commerce Experiences tailored for your business needs."
        title="E-Commerce Solutions"
      />
      <Story
        image="/Evenica_Solutions.png"
        texts={[
          'With decades of e-commerce mastery under our belt, Evenica is the premiere Microsoft Gold Partner to lead your e-commerce implementation and evolution. Our proven methodology ensures a rapid turnaround and adaptable e-commerce strategy that grows with your needs.',
          "We differentiate ourselves through our commitment to long-term success. We value long-term partnerships, where we can become integrated members of our customers' teams to maximize results and benefits. Evenica encourages smart independence and permits freedom of creativity and exploration from our staff, which leads to high-value innovation.",
        ]}
        title="Innovative Digital Commerce Experiences"
      />
      <CommerceSolutions />
      <CommerceEvolution />
      <PhasesAccordion />
      <CaseStudy
        alt="KASCO"
        description="Learn how KASCO is using Microsoft D365 Commerce as a foundation for business growth. By leveraging Evenica's Quick Start Methodology we delivered time to value, with future strategic initiatives in mind."
        href="case_studies/kasco-case-study"
        image="/KASCO.png"
        title="A CUTTING EDGE E-COMMERCE EXPERIENCE FOR KASCO"
      />
    </MainContainer>
  )
}

function CommerceSolutions() {
  return (
    <section className="mb-20">
      <h2 className="mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-center text-3xl font-bold text-transparent dark:from-indigo-400 dark:to-purple-400">
        Digital Commerce Solutions
      </h2>
      <div className="grid gap-8 md:grid-cols-3">
        {[
          {
            description:
              'Evenica is one of the leading implementers of Microsoft Dynamics 365 Commerce. We execute through our proven methodology, including discovery workshops, process mapping, and solution design.',
            title: 'D365 COMMERCE',
          },
          {
            description:
              "Evenica's e4Dynamics is a library of functional and independent building blocks to enhance current Microsoft Dynamics 365 Commerce capabilities for both B2B and B2C scenarios.",
            title: 'E4DYNAMICS',
          },
          {
            description:
              "Evenica's e4Platform is an integrated commerce platform that provides a core e-commerce framework with the option to incorporate custom apps that provide additional functionality.",
            title: 'E4PLATFORM',
          },
        ].map((solution) => (
          <div key={solution.title}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{solution.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-700 dark:text-gray-300">{solution.description}</p>
                <Button className="w-full" variant="outline">
                  Explore Further <ArrowRight className="ml-2 size-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  )
}

function CommerceEvolution() {
  return (
    <section className="mb-20">
      <h2 className="mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-center text-3xl font-bold text-transparent dark:from-indigo-400 dark:to-purple-400">
        The Evolution of E-commerce
      </h2>
      <p className="mx-auto mb-8 max-w-3xl text-center text-gray-700 dark:text-gray-300">
        Evenica recognizes that your brand will evolve through many e-commerce phases. Increasing consumer expectations
        for rewarding experiences within the increasingly sophisticated technology landscape requires a trusted
        e-commerce partner that can go far beyond the point-and-click deployment. Through each phase of your e-commerce
        evolution, Evenica is able to inspire, lead and implement solutions - we become your trusted e-commerce partner
        that is equally invested in your long-term success as you are.
      </p>
      <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
        {[
          'Evolve E-commerce',
          'Automate E-commerce',
          'Personalize Digital Experience',
          'Total Experience Innovation',
        ].map((phase, index) => (
          <div className="flex items-center" key={phase}>
            <div className="rounded-lg bg-indigo-600 px-4 py-2 text-white">{phase}</div>
            {index < 3 && <ArrowRight className="mx-2 text-indigo-600" />}
          </div>
        ))}
      </div>
    </section>
  )
}

function PhasesAccordion() {
  return (
    <section className="mb-20">
      <Tabs className="w-full" defaultValue="phase1">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="phase1">Phase 1: Inspired Practitioner</TabsTrigger>
          <TabsTrigger value="phase2">Phase 2: Premium Seller</TabsTrigger>
          <TabsTrigger value="phase3">Phase 3: Brand Builder</TabsTrigger>
          <TabsTrigger value="phase4">Phase 4: Market Leader</TabsTrigger>
        </TabsList>
        {[
          {
            content: {
              evenicaApproach:
                "Evenica's tailored e-commerce implementation methodology, focusing on enterprise-grade e-commerce solutions that can grow with your needs.",
              howYouEvolve:
                'By focusing on commerce operations and leveraging data insights to evolve your e-commerce solution.',
              whatYouWant:
                'You want to go beyond e-commerce and provide a seamless omnichannel experience for your customers.',
              whoYouAre:
                "You're a brand with an established e-commerce presence seeking to optimize your current e-commerce brand presence.",
            },
            title: 'Inspired Practitioner',
            value: 'phase1',
          },
          {
            content: {
              evenicaApproach:
                "E-commerce Integration: Leverage Evenica's data integration and automation expertise with our automation platform - e4Integrate.",
              howYouEvolve:
                'Create a Seamless Selling Experience: Transition to seamless selling by implementing automated workflows and connecting technology solutions.',
              whatYouWant:
                'Automation to streamline operations and provide a seamless customer experience that delights and satisfies across customer touchpoints.',
              whoYouAre: "You're a brand with a scalable e-commerce presence seeking more intelligent automation.",
            },
            title: 'Premium Seller',
            value: 'phase2',
          },
          {
            content: {
              evenicaApproach:
                'Digital Experience: Personalize your digital channel using e4Content - our digital experience platform.',
              howYouEvolve:
                'Personalize The Selling Experience: Create a personalized e-commerce experience by leveraging customer insights and providing contextualized recommendations.',
              whatYouWant:
                'Personalization: You want to leverage customer data & insights for advertising, campaigns, promotions, events, loyalty programs, and customer management.',
              whoYouAre: "You're looking to build a digital commerce platform with depth to increase customer loyalty.",
            },
            title: 'Brand Builder',
            value: 'phase3',
          },
          {
            content: {
              evenicaApproach:
                "Total Experience: Utilize Evenica's thought leadership and innovative mindset to develop a one-of-a-kind experience.",
              howYouEvolve:
                'Innovate a Memorable Experience: Push the boundaries to truly differentiate your brand in an authentic and compelling way.',
              whatYouWant:
                'Innovation: You want to apply business acumen and data to form a unique digital experience that helps your brand become memorable.',
              whoYouAre:
                "You're a brand that provides a personalized omnichannel experience and want to accelerate your brand through an innovative total experience.",
            },
            title: 'Market Leader',
            value: 'phase4',
          },
        ].map((phase) => (
          <TabsContent key={phase.value} value={phase.value}>
            <Card>
              <CardHeader>
                <CardTitle>{phase.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="mb-2 font-semibold">Who You Are</h4>
                    <p className="text-gray-700 dark:text-gray-300">{phase.content.whoYouAre}</p>
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold">What You Want</h4>
                    <p className="text-gray-700 dark:text-gray-300">{phase.content.whatYouWant}</p>
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold">How You Evolve</h4>
                    <p className="text-gray-700 dark:text-gray-300">{phase.content.howYouEvolve}</p>
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold">Evenica Approach</h4>
                    <p className="text-gray-700 dark:text-gray-300">{phase.content.evenicaApproach}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}

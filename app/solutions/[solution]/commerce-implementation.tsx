import Highlight from '@/components/highlight'
import Story from '@/components/story'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function CommerceImplementation() {
  const features = [
    {
      text: 'With decades of e-commerce experience under our belt, Evenica is the premiere partner to lead your e-commerce implementation and evolution.',
      title: 'EXPERIENCE',
    },
    {
      text: 'We consider ourselves a member of your team – long- term partners committed to your success and always ready to roll up our sleeves.',
      title: 'COMMITMENT',
    },
    {
      text: 'Our perfected Evenica Methodology ensures a rapid turnaround and adaptable e-commerce strategy that grows with your needs. ',
      title: 'RAPID TURNAROUND',
    },
  ]
  return (
    <>
      <Story
        image="/images/e-commerce-implementation.png"
        imagePriority
        reversedContents
        texts={[
          'Evenica helps implement e-commerce solutions wrapped around your business needs, creating a seamless connected commerce environment. All implementation services include discovery workshops, strategizing, deployment and training.',
          'Evenica is one of the leading implementers of Microsoft Dynamics 365 Commerce. We follow a proven methodology that ensures successful project execution from start to finish. Our approach includes comprehensive discovery workshops, thorough strategizing, efficient deployment, and ongoing support, ensuring your e-commerce platform is robust, scalable, and tailored to your business needs.',
        ]}
        title="Proven Implementation Methodology"
      />
      <section className="mb-20">
        <div className="grid gap-8 md:grid-cols-3">
          {features.map(({ text, title }) => (
            <div key={title}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">{text}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>
      <Story
        additionalTextContent={
          <Button asChild className="bg-blue-600 text-white hover:bg-blue-700">
            <Link href="https://dynamics.microsoft.com/en-us/commerce/overview/">
              LEARN MORE <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        }
        classNames={{ image: 'p-8' }}
        image="/images/commerce-fabrikam.png"
        imagePriority
        texts={[
          'Evenica is the leading implementor of Microsoft Dynamics 365 Commerce and an early adopter of this robust platform. We’re trusted by some of the world’s most respected brands with implementation through our experienced team using our rapid time to value deployment. Evenica is a Microsoft Gold Partner and recognized as e-commerce experts within the Microsoft channel.',
          'We offer a revolutionary ‘Quick Start’ program to begin the B2C/B2B journey in a short period of time, that includes e-commerce strategy consulting, solution road mapping and implementation of the D365 Commerce platform.',
        ]}
        title="Microsoft Dynamics 365 Commerce
"
      />
      <Highlight />
    </>
  )
}

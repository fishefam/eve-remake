import type { ResolvingMetadata } from 'next'

import ContactForm from '@/components/contact-form'
import Intro from '@/components/intro'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MainContainer } from '@/components/utils'
import { createTitle } from '@/lib/utils'
import { MapPin, Phone } from 'lucide-react'
import Link from 'next/link'

export async function generateMetadata(_: object, parent: ResolvingMetadata) {
  const metadata = await parent
  return { title: createTitle('Contact', metadata) }
}

export default function Contact() {
  return (
    <MainContainer>
      <Intro
        className={{ description: 'max-w-4xl' }}
        description="Fill out the form and we'll respond shortly. We're here to help with all your e-commerce needs."
        title="Get in Touch"
      />
      <MainSection />
    </MainContainer>
  )
}

function MainSection() {
  return (
    <section className="mb-20">
      <div className="grid gap-14 md:grid-cols-2 lg:gap-32">
        <ContactForm />
        <ContactTiles />
      </div>
    </section>
  )
}

function ContactTiles() {
  const contacts: ({ Icon: typeof MapPin } & Record<'href' | 'label' | 'line1' | 'line2' | 'title', string>)[] = [
    {
      href: 'tel:+18442270453',
      Icon: MapPin,
      label: '+1 844 227 0453',
      line1: '3050 Harvester Rd, Unit 208',
      line2: 'Burlington, ON L7N 3J1 Canada',
      title: 'Head Office',
    },
    {
      href: 'mailto:info@evenica.com',
      Icon: Phone,
      label: 'info@evenica.com',
      line1: "We'd love to do business with you.",
      line2: 'Email or contact us anytime.',
      title: 'Sales & Inquiries',
    },
    {
      href: 'https://evenica.atlassian.net/servicedesk/customer',
      Icon: MapPin,
      label: 'Access Support Desk',
      line1: "We're really good at what we do!",
      line2: 'Let us help.',
      title: 'Technical Support',
    },
  ]
  return (
    <div className="space-y-6">
      {contacts.map(({ href, Icon, label, line1, line2, title }) => (
        <Card key={title}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Icon className="mr-2 size-5 text-indigo-500" />
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{line1}</p>
            <p>{line2}</p>
            <Link className="text-indigo-600 hover:underline dark:text-indigo-400" href={href}>
              {label}
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

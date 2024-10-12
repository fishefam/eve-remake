import type { ResolvingMetadata } from 'next/types'

import { Button } from '@/components/ui/button'
import { createTitle } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export async function generateMetadata(_: object, parent: ResolvingMetadata) {
  const metadata = await parent
  return { title: createTitle('Home', metadata) }
}

export default function Home() {
  return (
    <div className="space-y-20">
      <Intro />
      <MicrosoftParter />
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
        commerce solution providers within the Microsoft channel.
      </p>
      <Button
        asChild
        className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700"
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
    <section className="mb-20 rounded-lg bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600 px-6 py-8 text-center text-white shadow-lg dark:from-yellow-600 dark:via-amber-600 dark:to-orange-700">
      <h2 className="mb-4 text-3xl font-bold">Microsoft Gold Partner</h2>
      <p className="mb-6 text-xl">
        Evenica is proud to be a Microsoft Gold Partner, recognized for our expertise and innovation in Microsoft
        Dynamics 365 Commerce solutions.
      </p>
    </section>
  )
}

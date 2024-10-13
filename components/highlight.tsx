import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { Button } from './ui/button'

export default function Highlight() {
  return (
    <section className="mb-20 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 p-12 text-white dark:from-indigo-600 dark:to-purple-700">
      <h2 className="mb-4 text-center text-3xl font-bold">Innovative Experiences Start With Evenica</h2>
      <p className="mb-6 text-center text-xl">
        Evenica supports brands by providing the most demanding and sophisticated digital experiences through e-commerce
        solutions.
      </p>
      <div className="flex justify-center">
        <Button asChild className="bg-white text-indigo-600 hover:bg-gray-100" size="lg">
          <Link href="/contact">
            Get Started <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
}

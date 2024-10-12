import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

import ClientLink from './client-link'
import { Button } from './ui/button'
import { ConditionalRender } from './utils'

export default function Intro({
  className,
  description,
  href,
  title,
}: {
  className?: { [key in 'description' | 'link' | 'title']?: string }
  description: string
  href?: string
  title: ReactNode
}) {
  return (
    <section className="text-center">
      <h1
        className={cn(
          'mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent dark:from-indigo-400 dark:to-purple-400 md:text-6xl',
          className?.title,
        )}
      >
        {title}
      </h1>
      <p className={cn('mx-auto mb-8 max-w-2xl text-xl text-gray-700 dark:text-gray-300', className?.description)}>
        {description}
      </p>
      <ConditionalRender show={!!href}>
        <Button
          asChild
          className={cn(
            'bg-gradient-to-r from-indigo-500 to-purple-600 text-white transition-colors hover:from-indigo-600 hover:to-purple-700',
            className?.link,
          )}
          size="lg"
        >
          <ClientLink href="/about">
            Learn More <ArrowRight className="ml-2 size-4" />
          </ClientLink>
        </Button>
      </ConditionalRender>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { useFilterContext } from './filter'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'

export type CaseStudies = {
  description: string
  href: string
  imgAlt: string
  imgUrl: string
  tags: string[]
  title: string
}[]

export default function CaseStudyGrid({ caseStudies }: { caseStudies: CaseStudies }) {
  const selectedTags = useFilterContext()
  const shouldKeep = (tags: string[], selectedTags: string[][]) => {
    const checks = selectedTags.map(() => false)
    for (let i = 0; i < checks.length; i++) {
      const refTags = selectedTags[i]
      const hasValue = refTags.some((value) => tags.includes(value))
      if (hasValue) checks[i] = true
    }
    return checks.every((value) => value)
  }

  return (
    <section className="mb-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {caseStudies
        .filter(({ tags }) => shouldKeep(tags, selectedTags))
        .map(({ description, href, imgAlt, imgUrl, tags, title }, index) => (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            key={href}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card className="flex h-full flex-col">
              <CardHeader className="p-0">
                <Image
                  alt={imgAlt}
                  className="h-48 w-full rounded-t-lg object-cover"
                  height={205}
                  priority
                  src={imgUrl}
                  width={330}
                />
              </CardHeader>
              <CardContent className="grow p-6">
                <CardTitle className="mb-2 text-xl">{title}</CardTitle>
                <p className="text-gray-700 dark:text-gray-300">{description}</p>
                <p className="mt-5 text-xs text-gray-500">
                  <span>Tags: </span>
                  {tags.map((tag) => (
                    <span className="italic" key={tag}>
                      #{tag}{' '}
                    </span>
                  ))}
                </p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild className="w-full" variant="outline">
                  <Link href={href}>
                    Read More <ChevronRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
    </section>
  )
}

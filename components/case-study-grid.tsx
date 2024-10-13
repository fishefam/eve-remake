'use client'

import { motion } from 'framer-motion'
import { ChevronRight, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { useFilterContext } from './filter'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { ConditionalRender } from './utils'

export type CaseStudies = {
  description: string
  href: string
  imgAlt: string
  imgUrl: string
  tags: string[]
  title: string
}[]

export default function CaseStudyGrid({ caseStudies }: { caseStudies: CaseStudies }) {
  const { selectedTags } = useFilterContext()
  const filteredStudies = filterStudies(caseStudies, selectedTags)
  return (
    <>
      <ConditionalRender show={!filteredStudies.length}>
        <NoStudyFound byFiltering={!!caseStudies.length} />
      </ConditionalRender>
      <ConditionalRender show={!!filteredStudies.length}>
        <section className="mb-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <CaseStudies studies={filteredStudies} />
        </section>
      </ConditionalRender>
    </>
  )
}

function CaseStudies({ studies }: { studies: CaseStudies }) {
  const { defaultSelectedTags, setSelectedTags } = useFilterContext()
  const setTag = (tag: string) =>
    setSelectedTags((state) => {
      const _state = [...state]
      for (let i = 0; i < _state.length; i++)
        if (defaultSelectedTags[i].includes(tag)) _state[i] = defaultSelectedTags[i].filter((v) => v === tag)
      return _state
    })
  return studies.map(({ description, href, imgAlt, imgUrl, tags, title }, index) => (
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
              <a className="cursor-pointer italic text-blue-500 hover:underline" key={tag} onClick={() => setTag(tag)}>
                #{tag}{' '}
              </a>
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
  ))
}

function NoStudyFound({ byFiltering }: { byFiltering: boolean }) {
  const { defaultSelectedTags, setSelectedTags } = useFilterContext()
  const selectAllTags = () => setSelectedTags(defaultSelectedTags)
  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="py-16 text-center"
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <Search className="mx-auto mb-4 size-16 text-gray-400" />
      <h2 className="mb-2 text-2xl font-bold text-gray-700 dark:text-gray-300">No Case Studies Found</h2>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        We couldn&#39;t find any case studies matching your current filters. Try adjusting your selection or browse all
        of our case studies.
      </p>
      <ConditionalRender show={byFiltering}>
        <Button
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700"
          onClick={selectAllTags}
        >
          View All Case Studies
        </Button>
      </ConditionalRender>
    </motion.section>
  )
}

function filterStudies(caseStudies: CaseStudies, selectedTags: string[][]) {
  const shouldKeep = (tags: string[], selectedTags: string[][]) => {
    const checks = selectedTags.map(() => false)
    for (let i = 0; i < checks.length; i++) {
      const refTags = selectedTags[i]
      const hasValue = refTags.some((value) => tags.includes(value))
      if (hasValue) checks[i] = true
    }
    return checks.every((value) => value)
  }
  return caseStudies.filter(({ tags }) => shouldKeep(tags, selectedTags))
}

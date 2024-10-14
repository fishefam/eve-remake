'use client'

import type { SetState } from '@/lib/types'
import type { MouseEvent } from 'react'

import { motion } from 'framer-motion'
import { ChevronRight, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { chunk, isEqual } from 'underscore'

import { useContentWithFilterContext } from './content-with-filter'
import { useFilterContext } from './filter'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination'
import { ConditionalRender } from './utils'

export type TContentGrid<T = object> = ({
  description: string
  href: string
  imgAlt: string
  imgUrl: string
  tags: string[]
  title: string
} & T)[]

export default function ContentGrid({ contents }: { contents: TContentGrid }) {
  const { contentsPerPage, currentPage, setCurrentPage, totalPages } = useContentWithFilterContext()
  const { defaultSelectedTags, selectedTags } = useFilterContext()
  const filteredContents = filterContents(contents, selectedTags)
  const chunkFilteredContents = chunk(filteredContents, contentsPerPage)
  const pagedContents = chunkFilteredContents[currentPage]
  return (
    <>
      <ConditionalRender show={!pagedContents.length}>
        <NoContentFound byFiltering={!!contents.length} />
      </ConditionalRender>
      <ConditionalRender show={!!pagedContents.length}>
        <section className="mb-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Contents contents={pagedContents} />
        </section>
      </ConditionalRender>
      <ConditionalRender show={totalPages > 1}>
        <ContentPagination
          currentPage={currentPage}
          filteredTotalPages={!isEqual(defaultSelectedTags, selectedTags) ? chunkFilteredContents.length : undefined}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </ConditionalRender>
    </>
  )
}

function Contents({ contents }: { contents: TContentGrid }) {
  const { legacyPath, path, setCurrentPage } = useContentWithFilterContext()
  const { defaultSelectedTags, setSelectedTags } = useFilterContext()
  const setTag = (tag: string) => {
    setCurrentPage(0)
    setSelectedTags((state) => {
      const _state = [...state]
      for (let i = 0; i < _state.length; i++)
        if (defaultSelectedTags[i].includes(tag)) _state[i] = defaultSelectedTags[i].filter((v) => v === tag)
      return _state
    })
  }
  return contents.map(({ description, href, imgAlt, imgUrl, tags, title }, index) => (
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
          <h1 className="mb-2 text-xl font-semibold leading-none tracking-tight">{title}</h1>
          <p className="text-gray-700 dark:text-gray-300">{description}</p>
          <p className="mt-5 text-xs text-gray-500">
            <span>Tags: </span>
            {tags.map((tag) => (
              <button
                className="mr-1 cursor-pointer italic text-blue-600 hover:underline"
                key={tag}
                onClick={() => setTag(tag)}
              >
                #{tag}
              </button>
            ))}
          </p>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button asChild className="w-full" variant="outline">
            <Link href={`${path}${href.replace(legacyPath, '')}`}>
              Read More <ChevronRight className="ml-2 size-4" />
              <span className="sr-only">{title}</span>
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  ))
}

function NoContentFound({ byFiltering }: { byFiltering: boolean }) {
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

function ContentPagination({
  currentPage,
  filteredTotalPages,
  setCurrentPage,
  totalPages,
}: {
  currentPage: number
  filteredTotalPages?: number
  setCurrentPage: SetState<number>
  totalPages: number
}) {
  const goPrevPage = (event: MouseEvent) => {
    event.preventDefault()
    setCurrentPage((state) => state - (state > 0 ? 1 : 0))
  }
  const goNextPage = (event: MouseEvent) => {
    event.preventDefault()
    setCurrentPage((state) => state + (state < totalPages - 1 ? 1 : 0))
  }
  const goToPage = (event: MouseEvent, pageIndex: number) => {
    event.preventDefault()
    setCurrentPage(pageIndex)
  }
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="" onClick={goPrevPage} />
        </PaginationItem>
        {new Array(filteredTotalPages ?? totalPages).fill(0).map((_, i) => (
          <PaginationItem key={i}>
            <PaginationLink href="" isActive={i === currentPage} onClick={(event) => goToPage(event, i)}>
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext href="" onClick={goNextPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

function filterContents(contents: TContentGrid, selectedTags: string[][]) {
  const shouldKeep = (tags: string[], selectedTags: string[][]) => {
    const checks = selectedTags.map(() => false)
    for (let i = 0; i < checks.length; i++) {
      const refTags = selectedTags[i]
      const hasValue = refTags.some((value) => tags.includes(value))
      if (hasValue) checks[i] = true
    }
    return checks.every((value) => value)
  }
  return contents.filter(({ tags }) => shouldKeep(tags, selectedTags))
}

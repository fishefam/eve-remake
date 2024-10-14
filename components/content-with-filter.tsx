'use client'

import type { SetState } from '@/lib/types'

import { createContext, useContext, useState } from 'react'

import type { TContentGrid } from './content-grid'
import type { TFilters } from './filter'

import ContentGrid from './content-grid'
import Filters from './filter'

const ContentWithFilterContext = createContext<{
  contentsPerPage: number
  currentPage: number
  legacyPath: string
  path: string
  setCurrentPage: SetState<number>
  totalPages: number
}>({
  contentsPerPage: 10,
  currentPage: 0,
  legacyPath: '',
  path: '',
  setCurrentPage: () => {},
  totalPages: 0,
})

export function useContentWithFilterContext() {
  return useContext(ContentWithFilterContext)
}

export default function ContentWithFilter({
  contents,
  filters,
  legacyPath,
  path,
}: {
  contents: TContentGrid
  filters: TFilters
  legacyPath: string
  path: string
}) {
  const contentsPerPage = 9
  const totalPages = Math.ceil(contents.length / contentsPerPage)
  const [currentPage, setCurrentPage] = useState(0)
  return (
    <ContentWithFilterContext.Provider
      value={{ contentsPerPage, currentPage, legacyPath, path, setCurrentPage, totalPages }}
    >
      <Filters filters={filters}>
        <ContentGrid contents={contents} />
      </Filters>
    </ContentWithFilterContext.Provider>
  )
}

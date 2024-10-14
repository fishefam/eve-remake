'use client'

import type { SetState } from '@/lib/types'

import { capFirstChar, cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { createContext, type ReactNode, useContext, useState } from 'react'
import { isEqual } from 'underscore'

import { useContentWithFilterContext } from './content-with-filter'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { ConditionalRender } from './utils'

export type TFilters = { name: string; options: { text: string; value: string }[] }[]

export const FilterContext = createContext<{
  defaultSelectedTags: string[][]
  selectedTags: string[][]
  setSelectedTags: SetState<string[][]>
}>({
  defaultSelectedTags: [],
  selectedTags: [],
  setSelectedTags: () => {},
})

export function useFilterContext() {
  return useContext(FilterContext)
}

export default function Filters({ children, filters }: { children: ReactNode; filters: TFilters }) {
  const defaultSelectedTags = filters.map(({ options }) => options[0].value.split(' '))
  const { setCurrentPage } = useContentWithFilterContext()
  const [selectedTags, setSelectedTags] = useState(defaultSelectedTags)
  const resetSelectedTags = () => setSelectedTags(defaultSelectedTags)
  const handleSelect = (value: string, i: number) => {
    setCurrentPage(0)
    setSelectedTags((state) => {
      const filters = [...state]
      filters[i] = value.split(' ')
      return filters
    })
  }
  return (
    <section className="space-y-12">
      <ConditionalRender show={!!filters.length}>
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Filter By:</p>
          {filters.map(({ name, options }, i) => (
            <Select key={i} onValueChange={(value) => handleSelect(value, i)} value={selectedTags[i].join(' ')}>
              <SelectTrigger aria-label={name} className="w-full dark:bg-black dark:text-white sm:w-2/3 md:w-60">
                <SelectValue placeholder={capFirstChar(name)} />
              </SelectTrigger>
              <SelectContent>
                {options.map(({ text, value }) => (
                  <SelectItem key={value} value={value}>
                    {text}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
          <Button
            aria-label="Reset filter"
            className={cn(
              'hidden border-none bg-transparent text-gray-700 shadow-none hover:from-indigo-600 hover:to-purple-700 dark:text-white md:inline-flex',
            )}
            disabled={isEqual(selectedTags, defaultSelectedTags)}
            onClick={resetSelectedTags}
            variant="outline"
          >
            <X />
          </Button>
        </div>
      </ConditionalRender>
      <FilterContext.Provider value={{ defaultSelectedTags, selectedTags, setSelectedTags }}>
        {children}
      </FilterContext.Provider>
    </section>
  )
}

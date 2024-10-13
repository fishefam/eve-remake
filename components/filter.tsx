'use client'

import type { SetState } from '@/lib/types'

import { capFirstChar } from '@/lib/utils'
import { createContext, type ReactNode, useContext, useState } from 'react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { ConditionalRender } from './utils'

export type Filters = { name: string; options: { text: string; value: string }[] }[]

export const FilterContext = createContext<{
  defaultSelectedTags: string[][]
  selectedTags: string[][]
  setSelectedTags: SetState<string[][]>
}>({
  defaultSelectedTags: [],
  selectedTags: [],
  setSelectedTags: () => {},
})
export const useFilterContext = () => useContext(FilterContext)

export default function Filters({ children, filters }: { children: ReactNode; filters: Filters }) {
  const defaultSelectedTags = filters.map(({ options }) => options[0].value.split(' '))
  const [selectedTags, setSelectedTags] = useState(defaultSelectedTags)
  const handleSelect = (value: string, i: number) =>
    setSelectedTags((state) => {
      const filters = [...state]
      filters[i] = value.split(' ')
      return filters
    })
  return (
    <section className="space-y-12">
      <ConditionalRender show={!!filters.length}>
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Filter By:</p>
          {filters.map(({ name, options }, i) => (
            <Select key={i} onValueChange={(value) => handleSelect(value, i)} value={selectedTags[i].join(' ')}>
              <SelectTrigger className="w-full dark:bg-black dark:text-white sm:w-2/3 md:w-60">
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
        </div>
      </ConditionalRender>
      <FilterContext.Provider value={{ defaultSelectedTags, selectedTags, setSelectedTags }}>
        {children}
      </FilterContext.Provider>
    </section>
  )
}

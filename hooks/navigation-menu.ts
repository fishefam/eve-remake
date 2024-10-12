import type { SetState } from '@/lib/types'

import { select } from '@/lib/dom'
import { useEffect, useRef, useState } from 'react'

export function useOutsideClick(setIsOpen: SetState<boolean>) {
  const container = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const ref = container.current
      if (ref && !ref.contains(event.target as Node)) setIsOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [setIsOpen])
  return container
}

export function useHeader() {
  const [y, setY] = useState(-10000)
  useEffect(() => {
    const isInit = y === -10000
    const handleScroll = () => setY(scrollY)
    const header = select('header')!
    const className = 'sticky top-0 z-[2] transition-all duration-200 '
    const className1 = 'bg-white/70 dark:bg-gray-900/70 backdrop-blur shadow-md py-2'
    const className2 = 'bg-transparent py-6'
    addEventListener('scroll', handleScroll)
    if (!isInit && y > 50) header.className = className + className1
    if (!isInit && y <= 50) header.className = className + className2
    return () => removeEventListener('scroll', handleScroll)
  }, [y])
}

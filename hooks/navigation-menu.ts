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

export function useHeader(isOpen: boolean) {
  const [y, setY] = useState(-10000)
  useEffect(() => {
    const isInit = y === -10000
    const handleScroll = () => setY(scrollY)
    const header = select('header')!
    const className = 'sticky top-0 z-[2] transition-all duration-200 '
    const className1 = 'bg-white/80 dark:bg-gray-900/80 backdrop-blur shadow-md py-2'
    const className2 = 'bg-transparent py-6'
    addEventListener('scroll', handleScroll)
    if (!isInit && !isOpen && y > 50) header.className = className + className1
    if (!isInit && !isOpen && y <= 50) header.className = className + className2
    return () => removeEventListener('scroll', handleScroll)
  }, [isOpen, y])
}

export function useMobileHeader(isOpen: boolean) {
  useEffect(() => {
    if (isOpen) {
      const { classList } = select('header')!
      if (!classList.contains('sticky')) classList.add('sticky')
      classList.remove('bg-white/80', 'dark:bg-gray-900/80', 'backdrop-blur', 'shadow-md', 'py-2')
      classList.add('py-6')
      console.log(classList)
    }
  }, [isOpen])
}

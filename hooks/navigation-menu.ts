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

export function useHeaderScroll(isOpen: boolean) {
  const [isScrolled, setIsScrolled] = useState(false)
  useEffect(() => {
    const handleScroll = () => setIsScrolled(scrollY > 50)
    addEventListener('scroll', handleScroll)
    return () => removeEventListener('scroll', handleScroll)
  }, [])
  useEffect(() => {
    const header = select<HTMLElement>('header')
    const isDark = document.documentElement.classList.contains('dark')
    const classList1 = [isDark ? '!dark:bg-gray-900/80' : '!bg-white/80', 'backdrop-blur', 'shadow-md']
    const classList2 = ['!bg-transparent', '!py-6']
    if (header && !isOpen && isScrolled) {
      for (const add of classList1) header.classList.add(add)
      for (const remove of classList2) header.classList.remove(remove)
    }
    if (header && !isOpen && !isScrolled) {
      for (const add of classList2) header.classList.add(add)
      for (const remove of classList1) header.classList.remove(remove)
    }
  }, [isOpen, isScrolled])
}

import type { ResolvedMetadata } from 'next'

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isClient() {
  return typeof globalThis.innerWidth === 'number'
}

export function isMobile() {
  return isClient() && innerWidth <= 768
}

export function createTitle(title: string, metadata: ResolvedMetadata, delimeter = '|') {
  const { title: baseTitle } = metadata
  return `${title} ${delimeter} ${baseTitle?.absolute ?? ''}`
}

export function isDark() {
  return matchMedia('(prefers-color-scheme: dark)').matches
}

import type { Theme } from '@/hooks/theme'
import type { ResolvedMetadata } from 'next'
import type { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers'
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'

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

export function getBaseTheme(headers: ReadonlyHeaders, cookies: ReadonlyRequestCookies) {
  const { value: cookieTheme } = (cookies.get('theme') as { value: Theme } | undefined) ?? {}
  const clientHintTheme = headers.get('Sec-CH-Prefers-Color-Scheme') as null | Theme
  const hour = parseInt(headers.get('Hour') ?? '0')
  const hourTheme = hour < 18 ? 'light' : 'dark'
  return cookieTheme ?? clientHintTheme ?? hourTheme
}

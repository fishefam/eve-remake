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
  const clientHintTheme = getHeader<Theme>('Sec-CH-Prefers-Color-Scheme', headers)
  const hour = parseInt(getHeader('Hour', headers) ?? '0')
  const hourTheme = hour < 18 ? 'light' : 'dark'
  return cookieTheme ?? clientHintTheme ?? hourTheme
}

export async function getBaseThemeAsync() {
  const { cookies: getCookies, headers: getHeaders } = await import('next/headers')
  const headers = getHeaders()
  const cookies = getCookies()
  const { value: cookieTheme } = (cookies.get('theme') as { value: Theme } | undefined) ?? {}
  const clientHintTheme = getHeader<Theme>('Sec-CH-Prefers-Color-Scheme', headers)
  const hour = parseInt(getHeader('Hour', headers) ?? '0')
  const hourTheme = hour < 18 ? 'light' : 'dark'
  return cookieTheme ?? clientHintTheme ?? hourTheme
}

export function getHeader<T extends object | string = string>(
  key: string,
  headers: ReadonlyHeaders,
  parseJSON = false,
) {
  const value = headers.get(key)
  if (parseJSON && value) return JSON.parse(value) as T
  if (value) return value as T
  return null
}

export async function getHeaderAsync<T extends object | string = string>(key: string, parseJSON = false) {
  const { headers: getHeaders } = await import('next/headers')
  const value = getHeaders().get(key)
  if (parseJSON && value) return JSON.parse(value) as T
  if (value) return value as T
  return null
}

export function isSamePath(href1?: null | string, href2?: null | string) {
  return href1?.replace(/^\//, '') === href2?.replace(/^\//, '')
}

export function capFirstChar(value: string) {
  return value.charAt(0).toUpperCase().concat(value.slice(1))
}

export function getItem<T>(array: T[], index: number) {
  return array[index >= 0 ? index : array.length + index]
}

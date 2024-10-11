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

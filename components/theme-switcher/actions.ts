'use server'

import type { Theme } from '@/hooks/theme'

import { cookies } from 'next/headers'

export async function setThemeCookie(theme: Theme) {
  cookies().set('theme', theme)
}

import type { UseStateReturn } from '@/lib/types'

import { isDark } from '@/lib/utils'
import { useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'

export function useTheme(): UseStateReturn<Theme | undefined> {
  const [theme, setTheme] = useState<Theme>()
  useEffect(() => setTheme(isDark() ? 'dark' : 'light'), [])
  useEffect(() => {
    if (theme) {
      let canSet = true
      const { classList } = document.documentElement
      if (canSet && theme === 'light') {
        classList.add('light')
        classList.remove('dark')
        canSet = false
      }
      if (canSet && theme === 'dark') {
        classList.add('dark')
        classList.remove('light')
      }
    }
  }, [theme])
  return [theme, setTheme]
}

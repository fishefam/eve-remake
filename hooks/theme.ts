import type { UseStateReturn } from '@/lib/types'

import { useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'

export function useTheme(baseTheme: Theme): UseStateReturn<Theme> {
  const [theme, setTheme] = useState(baseTheme)
  useEffect(() => {
    let flag = true
    if (theme === 'light') {
      document.documentElement.className = 'light'
      flag = false
    }
    if (flag && theme === 'dark') document.documentElement.className = 'dark'
  }, [theme])
  return [theme, setTheme]
}

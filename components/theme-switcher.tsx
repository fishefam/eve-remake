'use client'

import type { UseStateReturn } from '@/lib/types'

import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from './ui/button'

type Theme = 'dark' | 'light'

export default function ThemeSwitcher() {
  const [theme, setTheme] = useTheme()
  const handleTheme = () => setTheme((state) => (state === 'dark' ? 'light' : 'dark'))
  const Icon = theme === 'dark' ? Moon : Sun
  return (
    <Button onClick={handleTheme} size="icon" variant="ghost">
      <Icon className="size-5" />
    </Button>
  )
}

function useTheme(): UseStateReturn<Theme | undefined> {
  const [theme, setTheme] = useState<Theme>()
  useEffect(() => setTheme(matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'), [])
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

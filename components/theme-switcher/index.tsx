'use client'

import type { Theme } from '@/hooks/theme'

import { useTheme } from '@/hooks/theme'
import { Moon, Sun } from 'lucide-react'

import { Button } from '../ui/button'
import { setThemeCookie } from './actions'

export default function ThemeSwitcher({ baseTheme }: { baseTheme: Theme }) {
  const [theme, setTheme] = useTheme(baseTheme)
  const handleTheme = () => {
    setThemeCookie(theme === 'dark' ? 'light' : 'dark')
    setTheme((state) => (state === 'dark' ? 'light' : 'dark'))
  }
  const Icon = theme === 'dark' ? Moon : Sun
  return (
    <Button onClick={handleTheme} size="icon" variant="ghost">
      <Icon className="size-5" />
      <p className="sr-only">Theme Switcher</p>
    </Button>
  )
}

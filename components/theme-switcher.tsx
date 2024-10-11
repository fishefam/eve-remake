'use client'

import { useTheme } from '@/hooks/theme'
import { Moon, Sun } from 'lucide-react'

import { Button } from './ui/button'

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

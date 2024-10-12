import type { Theme } from '@/hooks/theme'

import Link from 'next/link'

import ThemeSwitcher from '../theme-switcher'
import { Button } from '../ui/button'
import MainNav from './main-nav'
import MobileNav from './mobile-nav'

export const links = [
  { href: 'about', label: 'About' },
  { href: 'solutions', label: 'Solutions' },
  { href: 'case-studies', label: 'Case Studies' },
  { href: 'industries', label: 'Industries' },
  { href: 'resources', label: 'Resources' },
] as const

export default function Nav({ baseTheme }: { baseTheme: Theme }) {
  return (
    <div className="eve-container flex items-center justify-between">
      <div className="flex items-center">
        <Link
          className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-2xl font-bold text-transparent dark:from-indigo-400 dark:to-purple-500"
          href={'/'}
        >
          Evenica
        </Link>
      </div>
      <MainNav />
      <div className="flex items-center space-x-4">
        <Button
          asChild
          className="hidden border-none bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 hover:text-white md:inline-flex"
        >
          <Link href={'/contact'}>Contact</Link>
        </Button>
        <ThemeSwitcher baseTheme={baseTheme} />
        <MobileNav />
      </div>
    </div>
  )
}

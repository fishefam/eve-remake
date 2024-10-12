import { getBaseThemeAsync, getHeaderAsync } from '@/lib/utils'

import ClientLink from '../client-link'
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

export default async function Nav() {
  const [baseTheme, currentHref] = await Promise.all([getBaseThemeAsync(), getHeaderAsync('Path')])
  return (
    <div className="eve-container flex items-center justify-between">
      <div className="flex items-center">
        <ClientLink
          className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-2xl font-bold text-transparent dark:from-indigo-400 dark:to-purple-500"
          href={'/'}
        >
          Evenica
        </ClientLink>
      </div>
      <MainNav currentHref={currentHref} />
      <div className="flex items-center space-x-4">
        <Button
          asChild
          className="hidden border-none bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 hover:text-white md:inline-flex"
        >
          <ClientLink href={'/contact'}>Contact</ClientLink>
        </Button>
        <ThemeSwitcher baseTheme={baseTheme} />
        <MobileNav />
      </div>
    </div>
  )
}

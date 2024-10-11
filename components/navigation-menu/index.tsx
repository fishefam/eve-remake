import Link from 'next/link'

import ThemeSwitcher from '../theme-switcher'
import { Button } from '../ui/button'
import MobileNav from './mobile'

export const links = [
  { href: 'solutions', label: 'Solutions' },
  { href: 'about', label: 'About' },
  { href: 'case-studies', label: 'Case Studies' },
  { href: 'resources', label: 'Resources' },
] as const

export default function NavigationMenu() {
  return (
    <header className="sticky left-0 top-0 z-[2] bg-white py-2 transition-all duration-200 dark:bg-gray-900">
      <div className="eve-container flex items-center justify-between">
        <div className="flex items-center">
          <Link
            className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-2xl font-bold text-transparent dark:from-indigo-400 dark:to-purple-500"
            href={'/'}
          >
            Evenica
          </Link>
        </div>
        <nav className="hidden md:block">
          <ul className="flex space-x-6 text-gray-700 dark:text-gray-300">
            {links.map(({ href, label }) => (
              <li key={label}>
                <Link className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400" href={href}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <Button
            asChild
            className="hidden border-none bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 hover:text-white md:inline-flex"
          >
            <Link href={'/contact'}>Contact</Link>
          </Button>
          <ThemeSwitcher />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

import type { Theme } from '@/hooks/theme'

import Nav from './nav'

export default function Header({ baseTheme }: { baseTheme: Theme }) {
  return (
    <header className="top-0 z-[2] py-6 transition-all duration-200">
      <Nav baseTheme={baseTheme} />
    </header>
  )
}

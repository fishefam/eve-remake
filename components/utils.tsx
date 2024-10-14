import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { createPortal } from 'react-dom'

export function ConditionalRender({ children, show }: { children: ReactNode; show: boolean }) {
  return show ? children : null
}

export function Portal({ children, container }: { children: ReactNode; container: HTMLElement | null | undefined }) {
  return container ? createPortal(children, container) : null
}

export function MainContainer({ children, className }: Readonly<{ children: ReactNode; className?: string }>) {
  return <div className={cn('[&>*:not(.ignore-eve-container)]:eve-container space-y-40', className)}>{children}</div>
}

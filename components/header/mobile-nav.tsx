'use client'

import type { SetState } from '@/lib/types'

import { Portal } from '@/components/utils'
import { useOutsideClick } from '@/hooks/navigation-menu'
import { isMobile } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { Button } from '../ui/button'
import { links } from './nav'

type Props = { isOpen: boolean; setIsOpen: SetState<boolean> }

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const props = { isOpen, setIsOpen }
  return (
    <>
      <Toggler {...props} />
      <Portal container={isMobile() ? document.body : null}>
        <NavigationMenu {...props} />
      </Portal>
    </>
  )
}

function NavigationMenu({ isOpen, setIsOpen }: Props) {
  const container = useOutsideClick(setIsOpen)
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 z-[1] h-fit rounded-b-2xl pb-12 pt-20 dark:bg-gray-900 md:hidden"
          exit={{ opacity: 0, y: -20 }}
          initial={{ opacity: 0, y: -20 }}
          ref={container}
          transition={{ duration: 0.1 }}
        >
          <nav className="container mx-auto px-4">
            <ul className="space-y-4 text-lg">
              {links.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    className="block py-2 text-gray-700 transition-colors hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
                    href={href}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Button
                  asChild
                  className="mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700"
                >
                  <Link href="/contact">Contact</Link>
                </Button>
              </li>
            </ul>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Toggler({ isOpen, setIsOpen }: Props) {
  // useHeader(isOpen)
  return (
    <Button className="md:hidden" onClick={() => setIsOpen((state) => !state)} size="icon" variant="ghost">
      {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
    </Button>
  )
}

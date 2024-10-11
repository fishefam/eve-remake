import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import NavigationMenu from '@/components/navigation-menu'
import { Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({ display: 'swap', preload: true, subsets: ['latin'] })

export const metadata: Metadata = { title: 'Evenica' }

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <NavigationMenu />
        {children}
      </body>
    </html>
  )
}

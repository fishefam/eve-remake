import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import Footer from '@/components/footer'
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
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

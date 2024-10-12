import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import Footer from '@/components/footer'
import Header from '@/components/header'
import ScrollToTop from '@/components/scroll-to-top'
import { getBaseTheme } from '@/lib/utils'
import { Inter } from 'next/font/google'
import { cookies as getCookies, headers as getHeaders } from 'next/headers'

import './globals.css'

const inter = Inter({ display: 'swap', preload: true, subsets: ['latin'] })

export const metadata: Metadata = { title: 'Evenica' }

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const headers = getHeaders()
  const cookies = getCookies()
  const baseTheme = getBaseTheme(headers, cookies)
  return (
    <html className={baseTheme} lang="en">
      <body className={`${inter.className} antialiased`}>
        <Header baseTheme={baseTheme} />
        <main className="mb-56 mt-20">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  )
}

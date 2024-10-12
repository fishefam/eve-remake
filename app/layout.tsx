import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import Footer from '@/components/footer'
import Header from '@/components/header'
import ScrollToTop from '@/components/scroll-to-top'
import { getBaseThemeAsync } from '@/lib/utils'
import { Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({ display: 'swap', preload: true, subsets: ['latin'] })

export const metadata: Metadata = { title: 'Evenica' }

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html className={await getBaseThemeAsync()} lang="en">
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main className="mb-56 mt-20">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  )
}

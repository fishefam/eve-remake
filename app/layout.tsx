import type { Theme } from '@/hooks/theme'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import Footer from '@/components/footer'
import Header from '@/components/header'
import { Inter } from 'next/font/google'
import { headers as getHeaders } from 'next/headers'

import './globals.css'

const inter = Inter({ display: 'swap', preload: true, subsets: ['latin'] })

export const metadata: Metadata = { title: 'Evenica' }

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const headers = getHeaders()
  const colorScheme = headers.get('Sec-CH-Prefers-Color-Scheme') as null | Theme
  const _country = headers.get('User-Country')
  return (
    <html lang="en" {...(colorScheme ? { className: colorScheme } : {})}>
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main>
          <div className="eve-container flex items-center justify-between">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  )
}

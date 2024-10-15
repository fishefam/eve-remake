import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import './globals.css'

export const metadata: Metadata = { title: 'Evenica' }

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <main className="mb-56 mt-20">{children}</main>
      </body>
    </html>
  )
}

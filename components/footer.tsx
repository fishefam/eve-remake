import Link from 'next/link'

import ClientLink from './client-link'
import { Facebook, Instagram, LinkedIn, Pinterest, X } from './icons'

const categories = [
  {
    category: 'Company',
    links: [
      { href: 'about', label: 'About' },
      { href: 'careers', label: 'Careers' },
      { href: 'contact', label: 'Contact' },
    ],
  },
  {
    category: 'Solutions',
    links: [
      { href: 'solutions/d365-commerce', label: 'E-Commerce' },
      { href: 'solutions/e4-dynamics', label: 'e4Dynamics' },
      { href: 'solutions/e4-platform', label: 'e4Platform' },
    ] as { href: `solutions/${SolutionPath}`; label: string }[],
  },
  {
    category: 'Resources',
    links: [
      { href: '#', label: 'Blog' },
      { href: '#', label: 'Case Studies' },
      { href: '#', label: 'Webinars' },
    ],
  },
] as const

const connects = [
  { href: 'https://linkedin.com/company/evenica/', Icon: LinkedIn, label: 'LinkedIn' },
  { href: 'https://facebook.com/Evenica-105051155109644/', Icon: Facebook, label: 'Facebook' },
  { href: 'https://x.com/evenicacorp', Icon: X, label: 'X' },
  { href: 'https://instagram.com/evenicacorp/', Icon: Instagram, label: 'Instagram' },
  { href: 'https://pinterest.ca/evenicacorp/', Icon: Pinterest, label: 'Pinterest' },
] as const

export default function Footer() {
  return (
    <footer className="bg-gray-800 py-12 text-white dark:bg-gray-900">
      <div className="eve-container">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {categories.map(({ category, links }) => (
            <div key={category}>
              <h1 className="mb-4 text-lg font-semibold">{category}</h1>
              <ul className="space-y-2">
                {links.map(({ href, label }, i) => (
                  <li key={i}>
                    <ClientLink className="transition-colors hover:text-indigo-400" href={href}>
                      {label}
                    </ClientLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h1 className="mb-4 text-lg font-semibold">Connect</h1>
            <div className="flex flex-wrap space-x-4 [row-gap:16px]">
              {connects.map(({ href, Icon, label }) => (
                <Link
                  aria-label={label}
                  className="text-white transition-colors hover:text-indigo-400"
                  href={href}
                  key={href}
                >
                  <Icon />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Evenica. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

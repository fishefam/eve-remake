import Link from 'next/link'

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
      { href: '#', label: 'E-Commerce' },
      { href: '#', label: 'Dynamics 365' },
      { href: '#', label: 'Integration' },
    ],
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
  { href: 'https://linkedin.com/company/evenica/', Icon: LinkedIn },
  { href: 'https://facebook.com/Evenica-105051155109644/', Icon: Facebook },
  { href: 'https://x.com/evenicacorp', Icon: X },
  { href: 'https://instagram.com/evenicacorp/', Icon: Instagram },
  { href: 'https://pinterest.ca/evenicacorp/', Icon: Pinterest },
] as const

export default function Footer() {
  return (
    <footer className="bg-gray-800 py-12 text-white dark:bg-gray-900">
      <div className="eve-container">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {categories.map(({ category, links }) => (
            <div key={category}>
              <h3 className="mb-4 text-lg font-semibold">{category}</h3>
              <ul className="space-y-2">
                {links.map(({ href, label }, i) => (
                  <li key={i}>
                    <Link className="transition-colors hover:text-indigo-400" href={href}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Connect</h3>
            <div className="flex flex-wrap space-x-4 [row-gap:16px]">
              {connects.map(({ href, Icon }) => (
                <Link className="text-white transition-colors hover:text-indigo-400" href={href} key={href}>
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

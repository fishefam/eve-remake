'use client'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import * as React from 'react'

import { ConditionalRender } from '../utils'

export const links: {
  href: string
  label: string
  subLinks?: { description?: string; href: string; label: string }[]
}[] = [
  { href: 'about', label: 'About' },
  { href: 'solutions', label: 'Solutions' },
  { href: 'case-studies', label: 'Case Studies' },
  {
    href: 'industries',
    label: 'Industries',
    subLinks: [
      {
        description: 'Empowers B2C and B2C retailers to transact and interact online',
        href: 'retail',
        label: 'Retail',
      },
      {
        description: 'Empowers healthcare providers to transact and interact with ease',
        href: 'healthcare',
        label: 'Healthcare',
      },
      {
        description: 'Empowers municipalities and local governments to transact and interact online',
        href: 'municipalities',
        label: 'Municipalities',
      },
      {
        description: 'Empowers self-service portals, field sales and digital client engagement',
        href: 'manufacturing',
        label: 'Manufacturing',
      },
      {
        description:
          'Utilizes Commerce as a portal to create a client dashboard that facilitates transactions and interactions',
        href: 'financial-services',
        label: 'Financial Services',
      },
      {
        description: 'Empowers retailers to transact and interact online',
        href: 'beverage-canabis',
        label: 'Beverage & Canabis',
      },
    ],
  },
  { href: 'resources', label: 'Resources' },
]

export default function MainNav() {
  return (
    <NavigationMenu className="hidden md:block">
      <NavigationMenuList>
        {links.map(({ href, label, subLinks }) => (
          <NavigationMenuItem key={label}>
            <NavigationMenuTrigger className="bg-transparent" withIcon={!!subLinks}>
              <Link href={href}>{label}</Link>
            </NavigationMenuTrigger>
            <ConditionalRender show={!!subLinks}>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  {subLinks?.map((item) => (
                    <ListItem href={item.href} key={item.label} title={item.label}>
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </ConditionalRender>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ children, className, href, title }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className,
            )}
            href={href ?? '/#'}
            ref={ref}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </Link>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = 'ListItem'

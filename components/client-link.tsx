'use client'

import Link from 'next/link'

export default function ClientLink({ refresh = true, ...props }: { refresh?: boolean } & Parameters<typeof Link>[0]) {
  const href = typeof props.href === 'string' ? props.href : props.href.href
  return <Link {...props} onClick={refresh ? () => (location.href = href ?? '/#') : undefined} />
}

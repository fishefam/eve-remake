import type { HTMLAttributes, SVGAttributes } from 'react'

export function select<T extends HTMLElement>(selector: string) {
  return document.querySelector<T>(selector)
}

export function selectAll<T extends HTMLElement>(selector: string) {
  const elements = Array.from(document.querySelectorAll<T>(selector))
  return elements.length ? elements : null
}

export function createElement<
  T extends keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap,
  U extends T extends keyof SVGElementTagNameMap ? SVGAttributes<SVGElement> : HTMLAttributes<HTMLElement>,
>(
  tag: T,
  options?: {
    attributes?: Partial<Record<`data-${string}`, number | object | string>> & U
    innerHTML?: string
    parent?: HTMLElement | string
  } & Partial<Record<'className' | 'id', string>>,
) {
  const element = document.createElement(tag)
  const { attributes, className, id, innerHTML, parent } = options ?? {}
  if (attributes)
    for (const [key, value] of Object.entries(attributes)) {
      if (['number', 'string'].includes(typeof value)) element.setAttribute(key, value)
      if (key.startsWith('on')) (element as unknown as Record<string, unknown>)[key.toLocaleLowerCase()] = value
    }
  if (id) element.id = id
  if (className) element.className = className
  if (innerHTML) element.innerHTML = innerHTML
  if (parent && typeof parent === 'string') select(parent)?.appendChild(element)
  if (parent && typeof parent !== 'string') parent.appendChild(element)
  return element
}

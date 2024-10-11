export function select<T extends HTMLElement>(selector: string) {
  return document.querySelector<T>(selector)
}

export function selectAll<T extends HTMLElement>(selector: string) {
  const elements = Array.from(document.querySelectorAll<T>(selector))
  return elements.length ? elements : null
}

export function select<T extends Element>(selector: string) {
  return document.querySelector<T>(selector)
}

export function selectAll<T extends Element>(selector: string) {
  const elements = Array.from(document.querySelectorAll<T>(selector))
  return elements.length ? elements : null
}

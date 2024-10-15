export default function Page() {
  console.log((globalThis as any).__incrementalCache.requestHeaders)
  return <>hello</>
}

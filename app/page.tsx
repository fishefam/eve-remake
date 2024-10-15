export default function Page() {
  const { __incrementalCache } = globalThis as unknown as { __incrementalCache: Record<string, string> }
  const { requestHeaders } = __incrementalCache
  console.log(requestHeaders)
  return <>hello</>
}

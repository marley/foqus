/**
 * Whether `url` matches any hostname in `storedUrls` (plain host or full URL).
 * Hostnames are compared case-sensitively as returned by the URL API (usually lower case).
 */
export function urlMatchesPatterns(url, storedUrls) {
  try {
    const { hostname } = new URL(url)
    return storedUrls.some((storedUrl) => {
      try {
        const normalized = storedUrl.includes('://') ? storedUrl : `https://${storedUrl}`
        const { hostname: storedHost } = new URL(normalized)
        return hostname === storedHost
      } catch {
        return false
      }
    })
  } catch {
    return false
  }
}

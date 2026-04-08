import { describe, it, expect } from 'vitest'
import { urlMatchesPatterns } from './urlMatchesPatterns.js'

describe('urlMatchesPatterns', () => {
  it('returns false for an empty pattern list', () => {
    expect(urlMatchesPatterns('https://twitter.com/home', [])).toBe(false)
  })

  it('matches when tab hostname equals a plain host pattern', () => {
    expect(urlMatchesPatterns('https://twitter.com/home', ['twitter.com'])).toBe(
      true,
    )
  })

  it('matches when tab hostname equals a pattern with protocol', () => {
    expect(
      urlMatchesPatterns('https://reddit.com/r/all', ['https://reddit.com']),
    ).toBe(true)
  })

  it('does not match a different hostname', () => {
    expect(urlMatchesPatterns('https://facebook.com', ['twitter.com'])).toBe(
      false,
    )
  })

  it('matches if any pattern matches', () => {
    const patterns = ['twitter.com', 'facebook.com', 'reddit.com']
    expect(urlMatchesPatterns('https://reddit.com/wiki', patterns)).toBe(true)
  })

  it('does not treat www as the apex host (exact hostname match only)', () => {
    expect(
      urlMatchesPatterns('https://www.facebook.com/groups', ['facebook.com']),
    ).toBe(false)
  })

  it('matches www when the pattern includes www', () => {
    expect(
      urlMatchesPatterns('https://www.facebook.com/', ['www.facebook.com']),
    ).toBe(true)
  })

  it('ignores invalid pattern entries', () => {
    expect(
      urlMatchesPatterns('https://ok.com/', [':::not-a-url', 'ok.com']),
    ).toBe(true)
  })

  it('returns false for an invalid tab URL', () => {
    expect(urlMatchesPatterns('not-a-url', ['example.com'])).toBe(false)
  })

  it('matches localhost with port (hostname is localhost)', () => {
    expect(
      urlMatchesPatterns('http://localhost:5173/path', ['localhost']),
    ).toBe(true)
  })
})

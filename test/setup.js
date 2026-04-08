import { afterEach, beforeEach, vi } from 'vitest'
import { createChromeMock } from './mocks/chrome.js'

beforeEach(() => {
  globalThis.chrome = createChromeMock()
})

afterEach(() => {
  vi.clearAllMocks()
})

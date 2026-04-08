import { afterEach, beforeEach, vi } from 'vitest'

/** In-memory chrome.storage.local for the default global mock. */
function createChromeMock() {
  const localStore = Object.create(null)

  const storageOnChanged = {
    listeners: [],
    addListener(fn) {
      this.listeners.push(fn)
    },
    removeListener(fn) {
      const i = this.listeners.indexOf(fn)
      if (i !== -1) this.listeners.splice(i, 1)
    },
    _emit(changes, areaName = 'local') {
      for (const fn of this.listeners) {
        try {
          fn(changes, areaName)
        } catch {
          /* ignore listener errors in tests */
        }
      }
    },
  }

  return {
    storage: {
      onChanged: storageOnChanged,
      local: {
        get(keys, cb) {
          const result = {}
          if (keys == null) {
            Object.assign(result, localStore)
          } else if (typeof keys === 'string') {
            if (localStore[keys] !== undefined) result[keys] = localStore[keys]
          } else if (Array.isArray(keys)) {
            for (const k of keys) {
              if (localStore[k] !== undefined) result[k] = localStore[k]
            }
          }
          const callback = typeof cb === 'function' ? cb : () => {}
          queueMicrotask(() => callback(result))
        },
        set(items, cb) {
          if (items && typeof items === 'object') {
            const changes = {}
            for (const [k, v] of Object.entries(items)) {
              const oldValue = localStore[k]
              localStore[k] = v
              changes[k] = { oldValue, newValue: v }
            }
            queueMicrotask(() => {
              storageOnChanged._emit(changes, 'local')
              if (typeof cb === 'function') cb()
            })
          } else if (typeof cb === 'function') {
            queueMicrotask(() => cb())
          }
        },
        remove(keys, cb) {
          const keyList = typeof keys === 'string' ? [keys] : Array.isArray(keys) ? keys : []
          const changes = {}
          for (const k of keyList) {
            if (k in localStore) {
              changes[k] = { oldValue: localStore[k], newValue: undefined }
              delete localStore[k]
            }
          }
          queueMicrotask(() => {
            if (Object.keys(changes).length) storageOnChanged._emit(changes, 'local')
            if (typeof cb === 'function') cb()
          })
        },
        clear(cb) {
          const changes = {}
          for (const k of Object.keys(localStore)) {
            changes[k] = { oldValue: localStore[k], newValue: undefined }
          }
          for (const k of Object.keys(localStore)) delete localStore[k]
          queueMicrotask(() => {
            storageOnChanged._emit(changes, 'local')
            if (typeof cb === 'function') cb()
          })
        },
      },
    },
    runtime: {
      sendMessage: vi.fn(),
      lastError: null,
      getManifest: vi.fn(() => ({ manifest_version: 3 })),
      id: 'test-extension-id',
      onMessage: {
        addListener: vi.fn(),
        removeListener: vi.fn(),
      },
    },
    tabs: {
      query: vi.fn((_q, cb) => queueMicrotask(() => cb?.([]))),
      get: vi.fn(),
      update: vi.fn(),
      onUpdated: { addListener: vi.fn(), removeListener: vi.fn() },
      onRemoved: { addListener: vi.fn(), removeListener: vi.fn() },
    },
    scripting: {
      insertCSS: vi.fn(),
      executeScript: vi.fn(),
    },
    management: {
      getSelf: vi.fn(),
    },
  }
}

beforeEach(() => {
  globalThis.chrome = createChromeMock()
})

afterEach(() => {
  vi.clearAllMocks()
})

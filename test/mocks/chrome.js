import { vi } from 'vitest'

/**
 * `chrome.storage.onChanged` — matches MV3: listeners receive (changes, areaName).
 * Use `_emit(changes, areaName)` in tests to simulate external updates.
 */
export function createStorageOnChangedMock() {
  return {
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
}

/**
 * In-memory `chrome.storage.local` that notifies `onChanged` on set/remove/clear.
 * @param {Record<string, unknown>} backing — mutable key bag (use Object.create(null))
 * @param {ReturnType<typeof createStorageOnChangedMock>} onChangedApi
 */
export function createStorageLocalMock(backing, onChangedApi) {
  const emit = onChangedApi._emit.bind(onChangedApi)

  return {
    get(keys, cb) {
      const result = {}
      if (keys == null) {
        Object.assign(result, backing)
      } else if (typeof keys === 'string') {
        if (backing[keys] !== undefined) result[keys] = backing[keys]
      } else if (Array.isArray(keys)) {
        for (const k of keys) {
          if (backing[k] !== undefined) result[k] = backing[k]
        }
      }
      const callback = typeof cb === 'function' ? cb : () => {}
      queueMicrotask(() => callback(result))
    },
    set(items, cb) {
      if (items && typeof items === 'object') {
        const changes = {}
        for (const [k, v] of Object.entries(items)) {
          const oldValue = backing[k]
          backing[k] = v
          changes[k] = { oldValue, newValue: v }
        }
        queueMicrotask(() => {
          emit(changes, 'local')
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
        if (k in backing) {
          changes[k] = { oldValue: backing[k], newValue: undefined }
          delete backing[k]
        }
      }
      queueMicrotask(() => {
        if (Object.keys(changes).length) emit(changes, 'local')
        if (typeof cb === 'function') cb()
      })
    },
    clear(cb) {
      const changes = {}
      for (const k of Object.keys(backing)) {
        changes[k] = { oldValue: backing[k], newValue: undefined }
      }
      for (const k of Object.keys(backing)) delete backing[k]
      queueMicrotask(() => {
        emit(changes, 'local')
        if (typeof cb === 'function') cb()
      })
    },
  }
}

/**
 * Spy-friendly storage.local: same callbacks as the real API, but `get`/`set` are `vi.fn`.
 * Backing store is shared with the stub implementation.
 */
export function createSpiedStorageLocalMock(backing, onChangedApi) {
  const impl = createStorageLocalMock(backing, onChangedApi)
  return {
    get: vi.fn(impl.get),
    set: vi.fn(impl.set),
    remove: vi.fn(impl.remove),
    clear: vi.fn(impl.clear),
  }
}

export function createRuntimeMock() {
  return {
    sendMessage: vi.fn(),
    lastError: null,
    getManifest: vi.fn(() => ({ manifest_version: 3 })),
    id: 'test-extension-id',
    onMessage: {
      addListener: vi.fn(),
      removeListener: vi.fn(),
    },
  }
}

export function createTabsMock() {
  return {
    query: vi.fn((_q, cb) => queueMicrotask(() => cb?.([]))),
    get: vi.fn(),
    update: vi.fn(),
    onUpdated: { addListener: vi.fn(), removeListener: vi.fn() },
    onRemoved: { addListener: vi.fn(), removeListener: vi.fn() },
  }
}

export function createScriptingMock() {
  return {
    insertCSS: vi.fn(),
    executeScript: vi.fn(),
  }
}

export function createManagementMock() {
  return {
    getSelf: vi.fn(),
  }
}

/**
 * Full default `chrome` tree for unit tests (popup / composables / background-style code).
 *
 * @param {object} [options]
 * @param {Record<string, unknown>} [options.backing] — shared in-memory bag for `storage.local` (default: fresh object)
 * @param {ReturnType<typeof createStorageOnChangedMock>} [options.storageOnChanged]
 * @param {boolean} [options.spyStorage] — wrap local get/set/remove/clear with `vi.fn`
 * @param {ReturnType<typeof createRuntimeMock>} [options.runtime]
 * @param {ReturnType<typeof createTabsMock>} [options.tabs]
 */
export function createChromeMock(options = {}) {
  const backing = options.backing ?? Object.create(null)
  const onChanged =
    options.storageOnChanged ?? createStorageOnChangedMock()
  const local =
    options.spyStorage === true
      ? createSpiedStorageLocalMock(backing, onChanged)
      : createStorageLocalMock(backing, onChanged)

  return {
    storage: {
      onChanged,
      local,
    },
    runtime: options.runtime ?? createRuntimeMock(),
    tabs: options.tabs ?? createTabsMock(),
    scripting: options.scripting ?? createScriptingMock(),
    management: options.management ?? createManagementMock(),
  }
}

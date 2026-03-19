import { ref, onUnmounted } from 'vue'

const DEFAULTS = {
  avoid: [],
  visit: [],
  overrideUntilByHost: {},
  overrideLimitMinutes: 5,
  customOverlayTitle: '',
  preferReducedMotion: false,
  darkMode: false,
  descriptionBannerDismissed: false,
}

/**
 * Reactive wrapper for chrome.storage.local.
 * Use in Vue components to read/write extension storage with automatic sync across contexts.
 *
 * @param {string[]} keys - Storage keys to track (default: all known keys)
 * @returns {Object} Reactive refs for each key + set, remove, refresh helpers
 */
export function useStorage(keys = Object.keys(DEFAULTS)) {
  const result = {}
  for (const key of keys) {
    result[key] = ref(DEFAULTS[key] ?? null)
  }

  function load() {
    chrome.storage.local.get(keys, (data) => {
      for (const key of keys) {
        if (key in data) {
          result[key].value = data[key]
        } else {
          result[key].value = DEFAULTS[key] ?? null
        }
      }
    })
  }

  function listener(changes, areaName) {
    if (areaName !== 'local') return
    for (const key of keys) {
      if (changes[key]) {
        result[key].value = changes[key].newValue ?? DEFAULTS[key] ?? null
      }
    }
  }

  load()
  chrome.storage.onChanged.addListener(listener)

  onUnmounted(() => {
    chrome.storage.onChanged.removeListener(listener)
  })

  async function set(updates) {
    await chrome.storage.local.set(updates)
  }

  async function remove(keyOrKeys) {
    const keysToRemove = Array.isArray(keyOrKeys) ? keyOrKeys : [keyOrKeys]
    await chrome.storage.local.remove(keysToRemove)
  }

  return { ...result, set, remove, refresh: load }
}

export { DEFAULTS }

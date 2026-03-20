/**
 * Event tracking for Foqus — append-only log stored in chrome.storage.local.
 * Events are pruned to a 90-day rolling window on each write.
 *
 * Event shape: { type, host, ts, ?meta }
 * Types: 'overlay_shown' | 'intention_kept' | 'unblock'
 */

const STORAGE_KEY = 'foqusEvents'
const RETENTION_DAYS = 90

function pruneOldEvents(events) {
  const cutoff = Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000
  return events.filter((e) => e.ts >= cutoff)
}

async function getEvents() {
  const data = await chrome.storage.local.get(STORAGE_KEY)
  return data[STORAGE_KEY] || []
}

async function recordEvent(type, host, meta) {
  const events = await getEvents()
  const event = { type, host, ts: Date.now() }
  if (meta) event.meta = meta
  events.push(event)
  const pruned = pruneOldEvents(events)
  await chrome.storage.local.set({ [STORAGE_KEY]: pruned })
  return event
}

export function useTracker() {
  return {
    overlayShown(host) {
      return recordEvent('overlay_shown', host)
    },
    intentionKept(host) {
      return recordEvent('intention_kept', host)
    },
    unblock(host, minutes) {
      return recordEvent('unblock', host, { minutes })
    },
    getEvents,
  }
}

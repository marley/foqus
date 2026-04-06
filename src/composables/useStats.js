import { ref, onUnmounted } from 'vue'

const STORAGE_KEY = 'foqusEvents'

function toDateStr(ts) {
  return new Date(ts).toLocaleDateString('en-CA') // YYYY-MM-DD
}

function todayStr() {
  return toDateStr(Date.now())
}

/** Calendar-day difference: laterStr minus earlierStr (YYYY-MM-DD). */
function calendarDaysDiff(earlierStr, laterStr) {
  const a = new Date(`${earlierStr}T12:00:00`).getTime()
  const b = new Date(`${laterStr}T12:00:00`).getTime()
  return Math.round((b - a) / (24 * 60 * 60 * 1000))
}

function countByHostDesc(events, type, countKey) {
  const map = new Map()
  for (const e of events) {
    if (e.type !== type || !e.host) continue
    map.set(e.host, (map.get(e.host) || 0) + 1)
  }
  return [...map.entries()]
    .map(([site, n]) => ({ site, [countKey]: n }))
    .sort((a, b) => b[countKey] - a[countKey])
}

/** Days without unblocking avoid sites: current and longest (calendar-day based). */
function computeStreaks(events) {
  const today = todayStr()
  if (!events.length) return { current: 0, longest: 0 }

  const firstEventDay = toDateStr(Math.min(...events.map((e) => e.ts)))
  const unblockDays = [
    ...new Set(events.filter((e) => e.type === 'unblock').map((e) => toDateStr(e.ts))),
  ].sort()

  if (!unblockDays.length) {
    const current = calendarDaysDiff(firstEventDay, today)
    return { current, longest: current }
  }

  const lastU = unblockDays[unblockDays.length - 1]
  const current = lastU === today ? 0 : calendarDaysDiff(lastU, today)

  const candidates = [calendarDaysDiff(firstEventDay, unblockDays[0])]
  for (let i = 0; i < unblockDays.length - 1; i++) {
    candidates.push(calendarDaysDiff(unblockDays[i], unblockDays[i + 1]) - 1)
  }
  candidates.push(current)

  return { current, longest: Math.max(...candidates) }
}

/**
 * Structured summary for data export (not the raw event log).
 */
export function computeExportSummary(events) {
  const habits_broken = countByHostDesc(events, 'unblock', 'unblocks')
  const intentions_built = countByHostDesc(events, 'visit_site_clicked', 'visits')
  const { current: current_streak, longest: longest_streak } = computeStreaks(events)

  return {
    current_streak,
    longest_streak,
    habits_broken,
    intentions_built,
  }
}

function computeStats(events) {
  const now = Date.now()
  const today = todayStr()
  const weekAgo = now - 7 * 24 * 60 * 60 * 1000
  const twoWeeksAgo = now - 14 * 24 * 60 * 60 * 1000

  // Intentions kept — total and today
  const allKept = events.filter((e) => e.type === 'intention_kept')
  const keptToday = allKept.filter((e) => toDateStr(e.ts) === today).length
  const intentionsKept = allKept.length

  // Unblocks — total and today
  const allUnblocks = events.filter((e) => e.type === 'unblock')
  const unblocksToday = allUnblocks.filter((e) => toDateStr(e.ts) === today).length

  const { current: streak } = computeStreaks(events)

  // Weekly trend — compare this week's unblocks to last week's
  const thisWeekUnblocks = allUnblocks.filter((e) => e.ts >= weekAgo).length
  const lastWeekUnblocks = allUnblocks.filter((e) => e.ts >= twoWeeksAgo && e.ts < weekAgo).length
  let weeklyTrend = null
  if (lastWeekUnblocks > 0) {
    const change = Math.round(((thisWeekUnblocks - lastWeekUnblocks) / lastWeekUnblocks) * 100)
    weeklyTrend = { thisWeek: thisWeekUnblocks, lastWeek: lastWeekUnblocks, change }
  }

  return { intentionsKept, keptToday, unblocksToday, streak, weeklyTrend }
}

/**
 * Reactive stats computed from the event log.
 * Auto-updates when chrome.storage changes.
 */
export function useStats() {
  const stats = ref({
    intentionsKept: 0,
    keptToday: 0,
    unblocksToday: 0,
    streak: 0,
    weeklyTrend: null,
  })

  function load() {
    chrome.storage.local.get(STORAGE_KEY, (data) => {
      stats.value = computeStats(data[STORAGE_KEY] || [])
    })
  }

  function listener(changes, areaName) {
    if (areaName === 'local' && changes[STORAGE_KEY]) {
      stats.value = computeStats(changes[STORAGE_KEY].newValue || [])
    }
  }

  load()
  chrome.storage.onChanged.addListener(listener)
  onUnmounted(() => chrome.storage.onChanged.removeListener(listener))

  return { stats, refresh: load }
}

/**
 * Load events and return structured export summary (not the raw log).
 */
export async function getExportSummary() {
  const data = await chrome.storage.local.get(STORAGE_KEY)
  return computeExportSummary(data[STORAGE_KEY] || [])
}

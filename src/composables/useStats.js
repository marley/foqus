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
 * Consecutive calendar days with at least one visit_site_clicked for this host.
 * Current streak is 0 if neither today nor yesterday was visited (missed a day).
 */
function computeVisitStreakForHost(events, host) {
  const today = todayStr()
  const yesterday = toDateStr(Date.now() - 24 * 60 * 60 * 1000)
  const visitDays = [
    ...new Set(
      events
        .filter((e) => e.type === 'visit_site_clicked' && e.host === host)
        .map((e) => toDateStr(e.ts)),
    ),
  ].sort()

  if (!visitDays.length) return { current: 0, longest: 0 }

  const visitSet = new Set(visitDays)
  const anchor = visitSet.has(today) ? today : visitSet.has(yesterday) ? yesterday : null
  let current = 0
  if (anchor) {
    const d = new Date(`${anchor}T12:00:00`)
    while (visitSet.has(toDateStr(d.getTime()))) {
      current++
      d.setDate(d.getDate() - 1)
    }
  }

  let longest = 1
  let run = 1
  for (let i = 1; i < visitDays.length; i++) {
    if (calendarDaysDiff(visitDays[i - 1], visitDays[i]) === 1) {
      run++
    } else {
      longest = Math.max(longest, run)
      run = 1
    }
  }
  longest = Math.max(longest, run)

  return { current, longest }
}

/**
 * Structured summary for data export (not the raw event log).
 * Per-site streaks: avoid list = days without unblocking that host; visit list = consecutive visit days.
 */
export function computeExportSummary(events, avoidList = [], visitList = []) {
  const { current: current_streak, longest: longest_streak } = computeStreaks(events)

  const by_url_avoid = avoidList.map((host) => {
    const hostEvents = events.filter((e) => e.host === host)
    const { current, longest } = computeStreaks(hostEvents)
    return { site: host, current_streak: current, longest_streak: longest }
  })

  const by_url_visit = visitList.map((host) => {
    const { current, longest } = computeVisitStreakForHost(events, host)
    return { site: host, current_streak: current, longest_streak: longest }
  })

  return {
    current_streak,
    longest_streak,
    by_url_avoid,
    by_url_visit,
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
  const data = await chrome.storage.local.get([STORAGE_KEY, 'avoid', 'visit'])
  return computeExportSummary(data[STORAGE_KEY] || [], data.avoid || [], data.visit || [])
}

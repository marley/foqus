import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  computeStreaks,
  computeVisitStreakForHost,
  computeExportSummary,
} from './useStats.js'

/** Fixed instant so `toLocaleDateString('en-CA')` is stable with `TZ=UTC` in vitest.config. */
function utcNoon(y, month, day) {
  return new Date(Date.UTC(y, month - 1, day, 12, 0, 0))
}

describe('computeStreaks', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns 0 for empty events', () => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(utcNoon(2026, 4, 8))
    expect(computeStreaks([])).toEqual({ current: 0, longest: 0 })
  })

  it('current streak is 0 if unblocked today', () => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(utcNoon(2026, 4, 8))
    const events = [
      { type: 'unblock', ts: utcNoon(2026, 4, 8).getTime(), host: 'example.com' },
    ]
    expect(computeStreaks(events).current).toBe(0)
  })

  it('counts calendar days since first event when there is no unblock', () => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(utcNoon(2026, 4, 10))
    const events = [
      { type: 'overlay_shown', ts: utcNoon(2026, 4, 8).getTime(), host: 'example.com' },
    ]
    const { current, longest } = computeStreaks(events)
    expect(current).toBe(2)
    expect(longest).toBe(2)
  })

  it('current streak is days since last unblock when last unblock is not today', () => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(utcNoon(2026, 4, 10))
    const events = [
      { type: 'unblock', ts: utcNoon(2026, 4, 6).getTime(), host: 'example.com' },
      { type: 'overlay_shown', ts: utcNoon(2026, 4, 10).getTime(), host: 'example.com' },
    ]
    expect(computeStreaks(events).current).toBe(4)
  })

  it('longest run is max gap between unblocks and trailing streak', () => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(utcNoon(2026, 4, 20))
    const events = [
      { type: 'unblock', ts: utcNoon(2026, 4, 10).getTime(), host: 'a.com' },
      { type: 'unblock', ts: utcNoon(2026, 4, 15).getTime(), host: 'a.com' },
      { type: 'overlay_shown', ts: utcNoon(2026, 4, 20).getTime(), host: 'a.com' },
    ]
    const { current, longest } = computeStreaks(events)
    expect(current).toBe(5)
    expect(longest).toBe(5)
  })

  it('treats multiple unblocks on the same calendar day as one unblock day', () => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(utcNoon(2026, 4, 10))
    const morning = utcNoon(2026, 4, 8).getTime()
    const evening = morning + 6 * 60 * 60 * 1000
    const events = [
      { type: 'unblock', ts: morning, host: 'x.com' },
      { type: 'unblock', ts: evening, host: 'x.com' },
    ]
    expect(computeStreaks(events).current).toBe(2)
  })
})

describe('computeVisitStreakForHost', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns 0 for no visits', () => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(utcNoon(2026, 4, 8))
    expect(computeVisitStreakForHost([], 'example.com')).toEqual({
      current: 0,
      longest: 0,
    })
  })

  it('counts consecutive days with visits ending today', () => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(utcNoon(2026, 4, 10))
    const events = [
      { type: 'visit_site_clicked', ts: utcNoon(2026, 4, 10).getTime(), host: 'good.com' },
      { type: 'visit_site_clicked', ts: utcNoon(2026, 4, 9).getTime(), host: 'good.com' },
    ]
    expect(computeVisitStreakForHost(events, 'good.com').current).toBe(2)
  })

  it('anchors on yesterday when today has no visit but yesterday does', () => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(utcNoon(2026, 4, 10))
    const events = [
      { type: 'visit_site_clicked', ts: utcNoon(2026, 4, 9).getTime(), host: 'good.com' },
      { type: 'visit_site_clicked', ts: utcNoon(2026, 4, 8).getTime(), host: 'good.com' },
    ]
    expect(computeVisitStreakForHost(events, 'good.com').current).toBe(2)
  })

  it('current is 0 when neither today nor yesterday was visited', () => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(utcNoon(2026, 4, 10))
    const events = [
      { type: 'visit_site_clicked', ts: utcNoon(2026, 4, 5).getTime(), host: 'good.com' },
    ]
    expect(computeVisitStreakForHost(events, 'good.com').current).toBe(0)
  })

  it('breaks current run when a day in the streak is missing', () => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(utcNoon(2026, 4, 10))
    const events = [
      { type: 'visit_site_clicked', ts: utcNoon(2026, 4, 10).getTime(), host: 'good.com' },
      { type: 'visit_site_clicked', ts: utcNoon(2026, 4, 8).getTime(), host: 'good.com' },
    ]
    expect(computeVisitStreakForHost(events, 'good.com').current).toBe(1)
  })

  it('computes longest consecutive visit run', () => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(utcNoon(2026, 4, 20))
    const events = [
      { type: 'visit_site_clicked', ts: utcNoon(2026, 4, 1).getTime(), host: 'good.com' },
      { type: 'visit_site_clicked', ts: utcNoon(2026, 4, 2).getTime(), host: 'good.com' },
      { type: 'visit_site_clicked', ts: utcNoon(2026, 4, 3).getTime(), host: 'good.com' },
      { type: 'visit_site_clicked', ts: utcNoon(2026, 4, 10).getTime(), host: 'good.com' },
    ]
    expect(computeVisitStreakForHost(events, 'good.com').longest).toBe(3)
  })
})

describe('computeExportSummary', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('aggregates global and per-list streaks', () => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(utcNoon(2026, 4, 10))
    const events = [
      { type: 'unblock', ts: utcNoon(2026, 4, 6).getTime(), host: 'bad.com' },
      { type: 'visit_site_clicked', ts: utcNoon(2026, 4, 9).getTime(), host: 'good.com' },
      { type: 'visit_site_clicked', ts: utcNoon(2026, 4, 10).getTime(), host: 'good.com' },
    ]
    const summary = computeExportSummary(events, ['bad.com'], ['good.com'])
    expect(summary.current_streak).toBe(4)
    expect(summary.by_url_avoid).toHaveLength(1)
    expect(summary.by_url_avoid[0].site).toBe('bad.com')
    expect(summary.by_url_visit).toHaveLength(1)
    expect(summary.by_url_visit[0].site).toBe('good.com')
    expect(summary.by_url_visit[0].current_streak).toBe(2)
  })
})

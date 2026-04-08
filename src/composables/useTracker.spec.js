import { describe, it, expect, afterEach, vi } from 'vitest'
import { useTracker } from './useTracker.js'
import { createChromeMock } from '../../test/mocks/chrome.js'

const STORAGE_KEY = 'foqusEvents'

describe('useTracker', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('getEvents resolves to empty array when log is missing', async () => {
    const tracker = useTracker()
    const events = await tracker.getEvents()
    expect(events).toEqual([])
  })

  it('overlayShown appends overlay_shown with host and ts', async () => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date('2026-05-01T12:00:00Z'))
    const tracker = useTracker()
    await tracker.overlayShown('example.com')

    const events = await tracker.getEvents()
    expect(events).toHaveLength(1)
    expect(events[0]).toMatchObject({
      type: 'overlay_shown',
      host: 'example.com',
      ts: new Date('2026-05-01T12:00:00Z').getTime(),
    })
    expect(events[0].meta).toBeUndefined()
  })

  it('intentionKept appends intention_kept', async () => {
    const tracker = useTracker()
    await tracker.intentionKept('a.com')

    const events = await tracker.getEvents()
    expect(events[0].type).toBe('intention_kept')
    expect(events[0].host).toBe('a.com')
  })

  it('unblock appends unblock with meta.minutes', async () => {
    const tracker = useTracker()
    await tracker.unblock('distraction.com', 15)

    const events = await tracker.getEvents()
    expect(events[0]).toMatchObject({
      type: 'unblock',
      host: 'distraction.com',
      meta: { minutes: 15 },
    })
  })

  it('visitSiteClicked appends visit_site_clicked', async () => {
    const tracker = useTracker()
    await tracker.visitSiteClicked('good.com')

    const events = await tracker.getEvents()
    expect(events[0].type).toBe('visit_site_clicked')
    expect(events[0].host).toBe('good.com')
  })

  it('records events in order when awaited sequentially', async () => {
    const tracker = useTracker()
    await tracker.overlayShown('host')
    await tracker.intentionKept('host')

    const events = await tracker.getEvents()
    expect(events.map((e) => e.type)).toEqual(['overlay_shown', 'intention_kept'])
  })

  it('drops events older than the retention window on write', async () => {
    vi.useFakeTimers({ toFake: ['Date'] })
    const now = new Date('2026-06-01T12:00:00Z').getTime()
    vi.setSystemTime(now)

    const ninetyOneDays = 91 * 24 * 60 * 60 * 1000
    const oldTs = now - ninetyOneDays
    const recentTs = now - 24 * 60 * 60 * 1000

    const backing = Object.create(null)
    backing[STORAGE_KEY] = [
      { type: 'unblock', ts: oldTs, host: 'ancient.com' },
      { type: 'overlay_shown', ts: recentTs, host: 'keep.com' },
    ]
    globalThis.chrome = createChromeMock({ backing })

    const tracker = useTracker()
    await tracker.visitSiteClicked('new.com')

    const events = await tracker.getEvents()
    expect(events.find((e) => e.host === 'ancient.com')).toBeUndefined()
    expect(events.find((e) => e.host === 'keep.com')).toBeTruthy()
    expect(events.find((e) => e.host === 'new.com')).toBeTruthy()
  })
})

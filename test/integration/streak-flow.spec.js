import { describe, it, expect, afterEach, vi } from 'vitest'
import { defineComponent } from 'vue'
import { mount, flushPromises } from '@vue/test-utils'
import { useStats } from '../../src/composables/useStats.js'
import { useTracker } from '../../src/composables/useTracker.js'
import { createChromeMock } from '../mocks/chrome.js'

function utcNoon(y, month, day) {
  return new Date(Date.UTC(y, month - 1, day, 12, 0, 0))
}

/** Single component that shares the same chrome.storage as the real popup + overlay. */
const StreakFlowHarness = defineComponent({
  setup() {
    const { stats } = useStats()
    const tracker = useTracker()
    return { stats, tracker }
  },
  template: '<div />',
})

describe('integration: streak flow', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('unblocking appends an unblock event and stats streak becomes 0 same day', async () => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(utcNoon(2026, 4, 10))

    const backing = Object.create(null)
    backing.foqusEvents = [
      {
        type: 'unblock',
        ts: utcNoon(2026, 4, 6).getTime(),
        host: 'earlier.com',
      },
    ]
    globalThis.chrome = createChromeMock({ backing })

    const wrapper = mount(StreakFlowHarness, {
      attachTo: document.body,
    })
    await flushPromises()

    expect(wrapper.vm.stats.streak).toBe(4)

    await wrapper.vm.tracker.unblock('avoided.com', 5)
    await flushPromises()

    expect(wrapper.vm.stats.streak).toBe(0)

    const events = await wrapper.vm.tracker.getEvents()
    expect(events.some((e) => e.type === 'unblock' && e.host === 'avoided.com')).toBe(
      true,
    )

    wrapper.unmount()
  })
})

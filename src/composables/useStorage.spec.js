import { describe, it, expect, vi } from 'vitest'
import { defineComponent } from 'vue'
import { mount, flushPromises } from '@vue/test-utils'
import { useStorage, DEFAULTS } from './useStorage.js'
import { createChromeMock } from '../../test/mocks/chrome.js'

function mountUseStorage(keys) {
  return mount(
    defineComponent({
      setup() {
        return useStorage(keys)
      },
      template: '<div />',
    }),
  )
}

describe('useStorage', () => {
  it('loads default values when storage has no keys', async () => {
    const wrapper = mountUseStorage(['avoid', 'visit', 'theme'])
    await flushPromises()
    expect(wrapper.vm.avoid).toEqual(DEFAULTS.avoid)
    expect(wrapper.vm.visit).toEqual(DEFAULTS.visit)
    expect(wrapper.vm.theme).toBe(DEFAULTS.theme)
    wrapper.unmount()
  })

  it('loads persisted values from chrome.storage.local', async () => {
    const backing = Object.create(null)
    backing.avoid = ['twitter.com']
    backing.theme = 'orange'
    globalThis.chrome = createChromeMock({ backing })

    const wrapper = mountUseStorage(['avoid', 'theme'])
    await flushPromises()
    expect(wrapper.vm.avoid).toEqual(['twitter.com'])
    expect(wrapper.vm.theme).toBe('orange')
    wrapper.unmount()
  })

  it('set() persists and updates refs via onChanged', async () => {
    const wrapper = mountUseStorage(['avoid'])
    await flushPromises()

    await wrapper.vm.set({ avoid: ['a.com', 'b.com'] })
    await flushPromises()

    expect(wrapper.vm.avoid).toEqual(['a.com', 'b.com'])
    wrapper.unmount()
  })

  it('reflects updates made only through storage.local.set', async () => {
    const wrapper = mountUseStorage(['visit'])
    await flushPromises()

    await new Promise((resolve) => {
      chrome.storage.local.set({ visit: ['good.com'] }, resolve)
    })
    await flushPromises()

    expect(wrapper.vm.visit).toEqual(['good.com'])
    wrapper.unmount()
  })

  it('remove() clears keys and refs fall back to defaults', async () => {
    const wrapper = mountUseStorage(['avoid', 'visit'])
    await flushPromises()
    await wrapper.vm.set({ avoid: ['x.com'], visit: ['y.com'] })
    await flushPromises()

    await wrapper.vm.remove(['avoid', 'visit'])
    await flushPromises()

    expect(wrapper.vm.avoid).toEqual([])
    expect(wrapper.vm.visit).toEqual([])
    wrapper.unmount()
  })

  it('refresh() reloads tracked keys from storage', async () => {
    const backing = Object.create(null)
    globalThis.chrome = createChromeMock({ backing })
    const wrapper = mountUseStorage(['avoid'])
    await flushPromises()
    expect(wrapper.vm.avoid).toEqual([])

    backing.avoid = ['injected.com']
    wrapper.vm.refresh()
    await flushPromises()
    expect(wrapper.vm.avoid).toEqual(['injected.com'])
    wrapper.unmount()
  })

  it('ignores storage.onChanged when areaName is not local', async () => {
    const wrapper = mountUseStorage(['avoid'])
    await flushPromises()
    await wrapper.vm.set({ avoid: ['keep.com'] })
    await flushPromises()

    chrome.storage.onChanged._emit(
      { avoid: { oldValue: ['keep.com'], newValue: ['other.com'] } },
      'sync',
    )
    await flushPromises()

    expect(wrapper.vm.avoid).toEqual(['keep.com'])
    wrapper.unmount()
  })

  it('removeListener is called on unmount', async () => {
    const removeListener = vi.spyOn(chrome.storage.onChanged, 'removeListener')
    const wrapper = mountUseStorage(['avoid'])
    await flushPromises()
    wrapper.unmount()
    expect(removeListener).toHaveBeenCalled()
  })
})

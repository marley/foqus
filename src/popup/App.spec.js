import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import App from './App.vue'
import { i18n } from '../i18n/index.js'
import { createChromeMock } from '../../test/mocks/chrome.js'

function mountPopup(options = {}) {
  return mount(App, {
    attachTo: document.body,
    global: {
      plugins: [i18n],
      ...options.global,
    },
    ...options,
  })
}

describe('popup App', () => {
  it('shows onboarding hint for new users', async () => {
    const wrapper = mountPopup()
    await flushPromises()

    const hints = wrapper.findAll('.popup-onboarding-hint')
    expect(hints.length).toBeGreaterThan(0)
    expect(wrapper.text()).toContain('Add sites to')
    expect(wrapper.text()).toContain('Avoid')
    expect(wrapper.text()).toContain('Visit')

    wrapper.unmount()
  })

  it('hides onboarding hint after dismiss', async () => {
    const wrapper = mountPopup()
    await flushPromises()

    await wrapper.find('.popup-onboarding-hint-dismiss').trigger('click')
    await flushPromises()

    expect(wrapper.find('.popup-onboarding-hint').exists()).toBe(false)
    wrapper.unmount()
  })

  it('does not show onboarding hint when already dismissed', async () => {
    const backing = Object.create(null)
    backing.descriptionBannerDismissed = true
    globalThis.chrome = createChromeMock({ backing })

    const wrapper = mountPopup()
    await flushPromises()

    expect(wrapper.find('.popup-onboarding-hint').exists()).toBe(false)
    wrapper.unmount()
  })

  it('adds a site to the avoid list from the form', async () => {
    const backing = Object.create(null)
    backing.descriptionBannerDismissed = true
    globalThis.chrome = createChromeMock({ backing })

    const wrapper = mountPopup()
    await flushPromises()

    const input = wrapper.find('#site-input-avoid')
    await input.setValue('twitter.com')
    await wrapper.find('.popup-tab-panel--avoid form').trigger('submit')
    await flushPromises()

    expect(wrapper.text()).toContain('twitter.com')
    const items = wrapper.findAll('#avoid-sites-list .popup-list-item-text')
    expect(items.length).toBe(1)
    expect(items[0].text()).toBe('twitter.com')

    wrapper.unmount()
  })

  it('does not duplicate an avoid site already on the list', async () => {
    const backing = Object.create(null)
    backing.descriptionBannerDismissed = true
    backing.avoid = ['twitter.com']
    globalThis.chrome = createChromeMock({ backing })

    const wrapper = mountPopup()
    await flushPromises()

    const input = wrapper.find('#site-input-avoid')
    await input.setValue('twitter.com')
    await wrapper.find('.popup-tab-panel--avoid form').trigger('submit')
    await flushPromises()

    const items = wrapper.findAll('#avoid-sites-list .popup-list-item-text')
    expect(items.length).toBe(1)

    wrapper.unmount()
  })

  it('prefills avoid input from the active tab hostname', async () => {
    const backing = Object.create(null)
    backing.descriptionBannerDismissed = true
    globalThis.chrome = createChromeMock({ backing })
    chrome.tabs.query = vi.fn((_q, cb) => {
      queueMicrotask(() => cb([{ url: 'https://facebook.com/newsfeed' }]))
    })

    const wrapper = mountPopup()
    await flushPromises()
    await flushPromises()

    const input = wrapper.find('#site-input-avoid')
    expect(input.element.value).toBe('facebook.com')

    wrapper.unmount()
  })
})

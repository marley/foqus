import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import Overlay from './Overlay.vue'
import { i18n } from '../i18n/index.js'
import en from '../locales/en.js'

function mountOverlay(props = {}) {
  return mount(Overlay, {
    attachTo: document.body,
    global: {
      plugins: [i18n],
    },
    props: {
      preferReducedMotion: true,
      ...props,
    },
  })
}

describe('content Overlay', () => {
  it('shows custom title when customTitle is set', () => {
    const custom = 'You shall not pass.'
    const wrapper = mountOverlay({ customTitle: custom })
    expect(wrapper.find('.foqus-overlay-title').text()).toBe(custom)
    wrapper.unmount()
  })

  it('shows a random title from locale when customTitle is empty', () => {
    const wrapper = mountOverlay()
    const text = wrapper.find('.foqus-overlay-title').text()
    expect(text.length).toBeGreaterThan(0)
    expect(en.overlay.titles).toContain(text)
    wrapper.unmount()
  })

  it('lists urls to visit with protocol stripped', () => {
    const wrapper = mountOverlay({
      urlsToVisit: ['goodreads.com', 'https://calm.com'],
    })
    expect(wrapper.text()).toContain('// go somewhere better')
    const urls = wrapper.findAll('.foqus-site-url')
    expect(urls.length).toBe(2)
    expect(urls[0].text()).toBe('goodreads.com')
    expect(urls[1].text()).toBe('calm.com')
    const links = wrapper.findAll('.foqus-overlay-suggested-sites a')
    expect(links[0].attributes('href')).toBe('https://goodreads.com')
    expect(links[1].attributes('href')).toBe('https://calm.com')
    wrapper.unmount()
  })

  it('unblock button uses singular copy when overrideMinutes is 1', () => {
    const wrapper = mountOverlay({ overrideMinutes: 1 })
    expect(wrapper.find('.foqus-overlay-button').text()).toContain('1 minute')
    wrapper.unmount()
  })

  it('unblock button uses plural copy when overrideMinutes is not 1', () => {
    const wrapper = mountOverlay({ overrideMinutes: 5 })
    expect(wrapper.find('.foqus-overlay-button').text()).toContain('5')
    expect(wrapper.find('.foqus-overlay-button').text().toLowerCase()).toContain('minute')
    wrapper.unmount()
  })

  it('confirm modal shows streak copy when currentStreak > 0', async () => {
    const wrapper = mountOverlay({ currentStreak: 5 })
    await wrapper.find('.foqus-overlay-button').trigger('click')
    await flushPromises()

    const msg = wrapper.find('.foqus-confirm-message')
    expect(msg.classes()).not.toContain('foqus-confirm-message--encourage')
    expect(msg.text()).toContain('5')
    expect(msg.text().toLowerCase()).toContain('streak')
    wrapper.unmount()
  })

  it('confirm modal shows encourage copy when currentStreak is 0', async () => {
    const wrapper = mountOverlay({ currentStreak: 0 })
    await wrapper.find('.foqus-overlay-button').trigger('click')
    await flushPromises()

    const msg = wrapper.find('.foqus-confirm-message')
    expect(msg.classes()).toContain('foqus-confirm-message--encourage')
    expect(msg.text()).toContain('Stay focused')
    wrapper.unmount()
  })

  it('emits unblock with override minutes when confirming', async () => {
    const wrapper = mountOverlay({ overrideMinutes: 7 })
    await wrapper.find('.foqus-overlay-button').trigger('click')
    await flushPromises()
    await wrapper.find('.foqus-confirm-btn--confirm').trigger('click')

    expect(wrapper.emitted('unblock')).toEqual([[7]])
    wrapper.unmount()
  })

  it('emits intention-kept when cancelling confirm', async () => {
    const wrapper = mountOverlay()
    await wrapper.find('.foqus-overlay-button').trigger('click')
    await flushPromises()
    await wrapper.find('.foqus-confirm-btn--cancel').trigger('click')

    expect(wrapper.emitted('intention-kept')).toHaveLength(1)
    wrapper.unmount()
  })

  it('emits intention-kept and visit-site-clicked when a visit link is clicked', async () => {
    const wrapper = mountOverlay({ urlsToVisit: ['good.com'] })
    await wrapper.find('.foqus-overlay-suggested-sites a').trigger('click')

    expect(wrapper.emitted('intention-kept')).toHaveLength(1)
    expect(wrapper.emitted('visit-site-clicked')).toEqual([['good.com']])
    wrapper.unmount()
  })
})

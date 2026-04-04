<script setup>
import { ref, onMounted } from 'vue'
import { useStorage } from '../composables/useStorage'
import { useTracker } from '../composables/useTracker'
import { useStats } from '../composables/useStats'
import Overlay from './Overlay.vue'
import ReturnWarning from './ReturnWarning.vue'

const RETURN_WARNING_SECONDS = 10
const OVERRIDE_LIMIT_DEFAULT = 5

function getOverrideMinutes(value) {
  const n = value != null ? Math.floor(Number(value)) : null
  if (n == null || Number.isNaN(n) || n < 1) return OVERRIDE_LIMIT_DEFAULT
  return Math.min(120, n)
}

function normalizeHost(hostname) {
  if (!hostname || typeof hostname !== 'string') return ''
  return hostname.toLowerCase().replace(/\.$/, '')
}

function pruneExpiredHosts(map) {
  const now = Date.now()
  const pruned = {}
  for (const [host, until] of Object.entries(map || {})) {
    if (until > now) pruned[host] = until
  }
  return pruned
}

function isOverrideActiveForHost(overrideUntilByHost, host) {
  const until = overrideUntilByHost?.[host]
  return until != null && Date.now() < until
}

const {
  visit,
  overrideUntilByHost,
  overrideLimitMinutes,
  preferReducedMotion,
  customOverlayTitle,
  set,
} = useStorage([
  'visit',
  'overrideUntilByHost',
  'overrideLimitMinutes',
  'preferReducedMotion',
  'customOverlayTitle',
])

const tracker = useTracker()
const { stats } = useStats()

const view = ref('hidden') // 'overlay' | 'toast' | 'hidden'
const toastSeconds = ref(RETURN_WARNING_SECONDS)
const isReturn = ref(false)
let toastInterval = null

function sendTabMuteAction(action) {
  try {
    chrome.runtime.sendMessage({ action })
  } catch {
    /* extension context invalid / not extension page */
  }
}

function showOverlay(options = {}) {
  view.value = 'overlay'
  isReturn.value = options.isReturn === true
  if (options.isReturn) didUnblock = false
  const host = normalizeHost(location.hostname)
  if (host) tracker.overlayShown(host)
  sendTabMuteAction('muteTab')
}

function showReturnWarning(countdownSeconds = RETURN_WARNING_SECONDS) {
  if (preferReducedMotion.value === true) {
    showOverlay({ isReturn: true })
    return
  }
  view.value = 'toast'
  toastSeconds.value = Math.max(1, Math.min(countdownSeconds, RETURN_WARNING_SECONDS))
  toastInterval = setInterval(() => {
    toastSeconds.value--
    if (toastSeconds.value <= 0) {
      clearInterval(toastInterval)
      toastInterval = null
      showOverlay({ isReturn: true })
    }
  }, 1000)
}

let didUnblock = false

function hideOverlay() {
  view.value = 'hidden'
}

function onIntentionKept() {
  const host = normalizeHost(location.hostname)
  if (host && !didUnblock) tracker.intentionKept(host)
}

function onVisitSiteClicked(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string') return
  try {
    const href = rawUrl.includes('://') ? rawUrl : `https://${rawUrl}`
    const u = new URL(href)
    const host = normalizeHost(u.hostname)
    if (host) tracker.visitSiteClicked(host)
  } catch {
    /* invalid URL */
  }
}

function onUnblock(minutes) {
  didUnblock = true
  const host = normalizeHost(location.hostname)
  if (host) {
    tracker.unblock(host, minutes)
    const expiry = Date.now() + minutes * 60 * 1000
    const map = overrideUntilByHost.value || {}
    set({ overrideUntilByHost: { ...map, [host]: expiry } })
  }
  sendTabMuteAction('unmuteTab')
  hideOverlay()

  const delay = Math.max(minutes * 60 * 1000 - RETURN_WARNING_SECONDS * 1000, 0)
  setTimeout(() => {
    showReturnWarning()
  }, delay)
}

function maybeShowOverlay() {
  const host = normalizeHost(location.hostname)

  if (!host) {
    showOverlay()
    return
  }

  const map = overrideUntilByHost.value || {}
  const pruned = pruneExpiredHosts(map)
  if (Object.keys(pruned).length !== Object.keys(map).length) {
    set({ overrideUntilByHost: pruned })
  }

  if (isOverrideActiveForHost(pruned, host)) {
    const expiry = pruned[host]
    const delay = Math.max(expiry - Date.now() - RETURN_WARNING_SECONDS * 1000, 0)
    setTimeout(() => {
      const remainingSeconds = Math.min(
        RETURN_WARNING_SECONDS,
        Math.max(0, Math.ceil((expiry - Date.now()) / 1000))
      )
      showReturnWarning(remainingSeconds)
    }, delay)
    return
  }

  showOverlay()
}

onMounted(() => {
  maybeShowOverlay()
  window.addEventListener('beforeunload', () => {
    if (view.value === 'overlay') onIntentionKept()
  })
})
</script>

<template>
  <Overlay
    v-if="view === 'overlay'"
    :urls-to-visit="visit || []"
    :override-minutes="getOverrideMinutes(overrideLimitMinutes)"
    :custom-title="customOverlayTitle || ''"
    :prefer-reduced-motion="preferReducedMotion === true"
    :is-return="isReturn"
    :current-streak="stats.streak"
    @unblock="onUnblock"
    @intention-kept="onIntentionKept"
    @visit-site-clicked="onVisitSiteClicked"
  />
  <ReturnWarning
    v-else-if="view === 'toast'"
    :seconds-left="toastSeconds"
  />
</template>

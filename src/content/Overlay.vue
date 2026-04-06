<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const OVERRIDE_LIMIT_DEFAULT = 5
const overlayTitles = [
  "Come here often?",
  "Here be dragons.",
  "Murky waters ahead.",
  "Approaching a vortex.",
  "Captain, we're drifting off course!",
  "Nothing to see here.",
  "You shall not pass.",
]

const props = defineProps({
  urlsToVisit: { type: Array, default: () => [] },
  overrideMinutes: { type: Number, default: OVERRIDE_LIMIT_DEFAULT },
  customTitle: { type: String, default: '' },
  preferReducedMotion: { type: Boolean, default: false },
  isReturn: { type: Boolean, default: false },
  currentStreak: { type: Number, default: 0 },
})

const emit = defineEmits(['unblock', 'intention-kept', 'visit-site-clicked'])

const showConfirmModal = ref(false)

const title = props.customTitle?.trim()
  ? props.customTitle.trim()
  : overlayTitles[Math.floor(Math.random() * overlayTitles.length)]

let gradientInstance = null

function formatUrl(url) {
  return url.replace(/^https?:\/\//, '')
}

function toFullUrl(url) {
  return url.includes('://') ? url : `https://${url}`
}

function onUnblockClick() {
  showConfirmModal.value = true
}

function confirmUnblock() {
  showConfirmModal.value = false
  emit('unblock', props.overrideMinutes)
}

function cancelUnblock() {
  showConfirmModal.value = false
  emit('intention-kept')
}

function onVisitSiteClick(url) {
  emit('intention-kept')
  emit('visit-site-clicked', url)
}

onMounted(() => {
  if (!props.preferReducedMotion && typeof FoqusGradient !== 'undefined') {
    const container = document.getElementById('foqus-overlay')
    if (container) {
      gradientInstance = new FoqusGradient(container)
    }
  }
})

onUnmounted(() => {
  if (gradientInstance) {
    gradientInstance.destroy()
    gradientInstance = null
  }
})
</script>

<template>
  <div
    id="foqus-overlay"
    class="foqus-overlay"
    :class="{
      'foqus-overlay--reduced-motion': preferReducedMotion,
      'foqus-overlay--returning': isReturn,
    }"
  >
    <div v-if="preferReducedMotion" class="foqus-gradient-static" aria-hidden="true"></div>
    <div class="foqus-overlay-content">
      <h1 class="foqus-overlay-title">{{ title }}</h1>
      <div v-if="urlsToVisit.length > 0">
        <h2 class="foqus-overlay-subtitle">// go somewhere better</h2>
        <ul class="foqus-overlay-suggested-sites">
          <li v-for="(url, i) in urlsToVisit" :key="url">
            <a
              :href="toFullUrl(url)"
              target="_blank"
              rel="noopener noreferrer"
              @click="onVisitSiteClick(url)"
            >
              <span class="foqus-site-num">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="foqus-site-url">{{ formatUrl(url) }}</span>
              <span class="foqus-site-arrow">→</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="foqus-overlay-button-container">
        <button
          type="button"
          class="foqus-overlay-button"
          @click="onUnblockClick"
        >
          unblock for {{ overrideMinutes }} minute{{ overrideMinutes === 1 ? '' : 's' }}
        </button>
      </div>
    </div>

    <Transition name="foqus-modal">
      <div v-if="showConfirmModal" class="foqus-confirm-backdrop" @click.self="cancelUnblock">
        <div class="foqus-confirm-modal" role="dialog" aria-modal="true">
          <p v-if="currentStreak > 0" class="foqus-confirm-message">
            Are you sure you want to break your
            <strong>{{ currentStreak }} day streak</strong>?
          </p>
          <p v-else class="foqus-confirm-message foqus-confirm-message--encourage">
            Stay focused to build your streak.
          </p>
          <div class="foqus-confirm-actions">
            <button
              type="button"
              class="foqus-confirm-btn foqus-confirm-btn--cancel"
              @click="cancelUnblock"
            >
              Stay focused
            </button>
            <button
              type="button"
              class="foqus-confirm-btn foqus-confirm-btn--confirm"
              @click="confirmUnblock"
            >
              Unblock anyway
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

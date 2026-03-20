<script setup>
import { onMounted, onUnmounted } from 'vue'

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
})

const emit = defineEmits(['unblock', 'intention-kept'])

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
  emit('unblock', props.overrideMinutes)
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
            <a :href="toFullUrl(url)" target="_blank" rel="noopener noreferrer" @click="emit('intention-kept')">
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
  </div>
</template>

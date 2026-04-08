<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { I18nT, useI18n } from 'vue-i18n'

const OVERRIDE_LIMIT_DEFAULT = 5

const props = defineProps({
  urlsToVisit: { type: Array, default: () => [] },
  overrideMinutes: { type: Number, default: OVERRIDE_LIMIT_DEFAULT },
  customTitle: { type: String, default: '' },
  preferReducedMotion: { type: Boolean, default: false },
  isReturn: { type: Boolean, default: false },
  currentStreak: { type: Number, default: 0 },
})

const emit = defineEmits(['unblock', 'intention-kept', 'visit-site-clicked'])

const { t, tm } = useI18n()

const showConfirmModal = ref(false)

const title = (() => {
  const custom = props.customTitle?.trim()
  if (custom) return custom
  const list = tm('overlay.titles')
  const arr = Array.isArray(list) ? list : []
  if (!arr.length) return ''
  return arr[Math.floor(Math.random() * arr.length)]
})()

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
        <h2 class="foqus-overlay-subtitle">{{ t('overlay.goBetter') }}</h2>
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
          {{ overrideMinutes === 1 ? t('overlay.unblockForOne') : t('overlay.unblockForMany', { n: overrideMinutes }) }}
        </button>
      </div>
    </div>

    <Transition name="foqus-modal">
      <div v-if="showConfirmModal" class="foqus-confirm-backdrop" @click.self="cancelUnblock">
        <div class="foqus-confirm-modal" role="dialog" aria-modal="true">
          <p v-if="currentStreak > 0" class="foqus-confirm-message">
            <I18nT keypath="overlay.confirmBreakStreak" tag="span" scope="global">
              <template #streak>
                <strong>{{ currentStreak }} {{ t('overlay.streakNoun', currentStreak) }}</strong>
              </template>
            </I18nT>
          </p>
          <p v-else class="foqus-confirm-message foqus-confirm-message--encourage">
            {{ t('overlay.encourage') }}
          </p>
          <div class="foqus-confirm-actions">
            <button
              type="button"
              class="foqus-confirm-btn foqus-confirm-btn--cancel"
              @click="cancelUnblock"
            >
              {{ t('overlay.stayFocused') }}
            </button>
            <button
              type="button"
              class="foqus-confirm-btn foqus-confirm-btn--confirm"
              @click="confirmUnblock"
            >
              {{ t('overlay.unblockAnyway') }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

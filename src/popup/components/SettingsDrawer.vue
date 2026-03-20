<script setup>
import { ref, watch } from 'vue'
import { useStorage } from '../../composables/useStorage'
import DataExport from './DataExport.vue'

const props = defineProps({
  inline: { type: Boolean, default: false },
})

const OVERRIDE_LIMIT_MIN = 1
const OVERRIDE_LIMIT_MAX = 120
const OVERRIDE_LIMIT_DEFAULT = 5

function clampOverrideLimit(value) {
  const n = Number(value)
  if (Number.isNaN(n) || n < OVERRIDE_LIMIT_MIN) return OVERRIDE_LIMIT_DEFAULT
  if (n > OVERRIDE_LIMIT_MAX) return OVERRIDE_LIMIT_MAX
  return Math.floor(n)
}

const {
  preferReducedMotion,
  darkMode,
  overrideLimitMinutes,
  customOverlayTitle,
  set,
} = useStorage(['preferReducedMotion', 'darkMode', 'overrideLimitMinutes', 'customOverlayTitle'])

const settingsOpen = ref(false)
const savedIndicator = ref(false)
const overlayTitleInput = ref('')
const overrideLimitInput = ref(OVERRIDE_LIMIT_DEFAULT)

watch(overrideLimitMinutes, (val) => {
  overrideLimitInput.value = val != null ? clampOverrideLimit(val) : OVERRIDE_LIMIT_DEFAULT
}, { immediate: true })

watch(customOverlayTitle, (val) => {
  overlayTitleInput.value = val || ''
}, { immediate: true })

watch(darkMode, (val) => {
  document.body.classList.toggle('dark-mode', val === true)
}, { immediate: true })

function showSaved() {
  savedIndicator.value = true
  clearTimeout(savedIndicator._hideTimeout)
  savedIndicator._hideTimeout = setTimeout(() => {
    savedIndicator.value = false
  }, 2000)
}

function onOverlayTitleSubmit(e) {
  e.preventDefault()
  const val = overlayTitleInput.value.trim()
  if (val) {
    set({ customOverlayTitle: val }).then(showSaved)
  } else {
    set({ customOverlayTitle: '' }).then(showSaved)
  }
}

function onLimitSubmit(e) {
  e.preventDefault()
  const minutes = clampOverrideLimit(overrideLimitInput.value)
  overrideLimitInput.value = minutes
  set({ overrideLimitMinutes: minutes }).then(showSaved)
}

async function onPreferReducedMotionChange(checked) {
  await set({ preferReducedMotion: checked })
  showSaved()
}

async function onDarkModeChange(checked) {
  await set({ darkMode: checked })
  showSaved()
}
</script>

<template>
  <div class="popup-settings" :class="{ 'popup-settings--inline': inline }">
    <div v-if="!inline" class="popup-settings-header">
      <button
        type="button"
        class="popup-settings-toggle"
        :aria-expanded="settingsOpen"
        @click="settingsOpen = !settingsOpen"
      >
        <span class="popup-settings-icon" aria-hidden="true">&#9881;</span> Settings
      </button>
      <span v-show="savedIndicator" class="popup-settings-saved">Saved!</span>
    </div>
    <div v-show="inline || settingsOpen" class="popup-settings-drawer" :class="{ 'popup-settings-drawer--inline': inline }">
      <h3 class="popup-settings-subheading">Visuals</h3>
      <div class="popup-settings-row">
        <label class="popup-toggle" for="preferReducedMotion">
          <input
            id="preferReducedMotion"
            type="checkbox"
            class="popup-toggle-input"
            :checked="preferReducedMotion"
            @change="onPreferReducedMotionChange(($event.target).checked)"
          >
          <span class="popup-toggle-track" aria-hidden="true">
            <span class="popup-toggle-thumb"></span>
          </span>
          <span class="popup-toggle-label">Reduce animations</span>
        </label>
      </div>
      <div class="popup-settings-row">
        <label class="popup-toggle" for="darkMode">
          <input
            id="darkMode"
            type="checkbox"
            class="popup-toggle-input"
            :checked="darkMode"
            @change="onDarkModeChange(($event.target).checked)"
          >
          <span class="popup-toggle-track" aria-hidden="true">
            <span class="popup-toggle-thumb"></span>
          </span>
          <span class="popup-toggle-label">Dark mode</span>
        </label>
      </div>
      <h3 class="popup-settings-subheading">Screen block</h3>
      <p class="popup-settings-label">Custom message</p>
      <form @submit="onOverlayTitleSubmit">
        <label for="overlayTitleInput" class="visually-hidden">Custom block screen message</label>
        <input
          id="overlayTitleInput"
          v-model="overlayTitleInput"
          type="text"
          placeholder="You shall not pass."
          name="overlayTitleInput"
        >
        <button type="submit" class="popup-settings-button">Save</button>
      </form>
      <p class="popup-settings-label">Unblock time limit</p>
      <form @submit="onLimitSubmit">
        <label for="overrideLimitInput" class="visually-hidden">Unblock time limit in minutes</label>
        <input
          id="overrideLimitInput"
          v-model.number="overrideLimitInput"
          type="number"
          min="1"
          max="120"
          placeholder="5"
          name="overrideLimitInput"
        >
        minutes
        <button type="submit" class="popup-settings-button">Save</button>
      </form>
      <DataExport />
    </div>
  </div>
</template>

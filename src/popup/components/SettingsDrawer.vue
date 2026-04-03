<script setup>
import { ref, watch, nextTick, onUnmounted } from 'vue'
import { useStorage } from '../../composables/useStorage'
import DataExport from './DataExport.vue'

const open = defineModel({ type: Boolean, default: false })

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

const savedIndicator = ref(false)
const overlayTitleInput = ref('')
const overrideLimitInput = ref(OVERRIDE_LIMIT_DEFAULT)
const closeBtnRef = ref(null)

watch(overrideLimitMinutes, (val) => {
  overrideLimitInput.value = val != null ? clampOverrideLimit(val) : OVERRIDE_LIMIT_DEFAULT
}, { immediate: true })

watch(customOverlayTitle, (val) => {
  overlayTitleInput.value = val || ''
}, { immediate: true })

watch(darkMode, (val) => {
  document.body.classList.toggle('dark-mode', val === true)
}, { immediate: true })

function onDocumentEscape(e) {
  if (e.key === 'Escape' && open.value) {
    e.preventDefault()
    close()
  }
}

watch(open, async (isOpen) => {
  if (isOpen) {
    document.addEventListener('keydown', onDocumentEscape)
    await nextTick()
    closeBtnRef.value?.focus()
  } else {
    document.removeEventListener('keydown', onDocumentEscape)
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', onDocumentEscape)
})

function showSaved() {
  savedIndicator.value = true
  clearTimeout(showSaved._hideTimeout)
  showSaved._hideTimeout = setTimeout(() => {
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

function close() {
  open.value = false
}
</script>

<template>
  <div
    v-show="open"
    id="settings-panel"
    class="popup-settings-overlay"
    role="dialog"
    aria-modal="true"
    aria-labelledby="settings-dialog-title"
  >
    <div class="popup-settings-overlay-header">
      <h2 id="settings-dialog-title" class="popup-settings-overlay-title">
        Settings
      </h2>
      <span
        v-show="savedIndicator"
        role="status"
        class="popup-settings-saved"
      >Saved!</span>
      <button
        ref="closeBtnRef"
        type="button"
        class="popup-settings-close"
        aria-label="Close settings"
        @click="close"
      >
        <span aria-hidden="true">×</span>
      </button>
    </div>
    <div class="popup-settings-drawer-inner">
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

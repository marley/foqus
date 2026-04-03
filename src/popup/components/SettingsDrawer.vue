<script setup>
import { ref, computed, watch, nextTick, onUnmounted } from 'vue'
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

const THEME_IDS = ['green', 'orange', 'mono']

const THEME_OPTIONS = [
  { id: 'green', label: 'Teal green, like the block screen' },
  { id: 'orange', label: 'Coral orange, like the block screen' },
  { id: 'mono', label: 'Black and white' },
]

const {
  preferReducedMotion,
  darkMode,
  theme,
  overrideLimitMinutes,
  customOverlayTitle,
  set,
} = useStorage(['preferReducedMotion', 'darkMode', 'theme', 'overrideLimitMinutes', 'customOverlayTitle'])

const effectiveTheme = computed(() =>
  THEME_IDS.includes(theme.value) ? theme.value : 'green',
)

const savedIndicator = ref(false)
const overlayTitleInput = ref('')
const overrideLimitInput = ref(OVERRIDE_LIMIT_DEFAULT)
const closeBtnRef = ref(null)
const overlayRef = ref(null)

watch(overrideLimitMinutes, (val) => {
  overrideLimitInput.value = val != null ? clampOverrideLimit(val) : OVERRIDE_LIMIT_DEFAULT
}, { immediate: true })

watch(customOverlayTitle, (val) => {
  overlayTitleInput.value = val || ''
}, { immediate: true })

watch(darkMode, (val) => {
  document.body.classList.toggle('dark-mode', val === true)
}, { immediate: true })

watch(theme, () => {
  const t = effectiveTheme.value
  document.body.classList.remove('theme-green', 'theme-orange', 'theme-mono')
  document.body.classList.add(`theme-${t}`)
}, { immediate: true })

function getFocusables() {
  const root = overlayRef.value
  if (!root) return []
  const sel = [
    'button:not([disabled])',
    '[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ')
  return Array.from(root.querySelectorAll(sel)).filter((el) => {
    if (el.getAttribute('aria-hidden') === 'true') return false
    if (el.closest('[aria-hidden="true"]')) return false
    return el.getClientRects().length > 0
  })
}

function onDocumentKeydown(e) {
  if (!open.value) return
  if (e.key === 'Escape') {
    e.preventDefault()
    close()
    return
  }
  if (e.key !== 'Tab') return
  const focusables = getFocusables()
  if (!focusables.length) return
  const active = document.activeElement
  if (!overlayRef.value?.contains(active)) return
  const first = focusables[0]
  const last = focusables[focusables.length - 1]
  if (e.shiftKey) {
    if (active === first) {
      e.preventDefault()
      last.focus()
    }
  } else if (active === last) {
    e.preventDefault()
    first.focus()
  }
}

watch(open, async (isOpen) => {
  if (isOpen) {
    document.addEventListener('keydown', onDocumentKeydown)
    await nextTick()
    closeBtnRef.value?.focus()
  } else {
    document.removeEventListener('keydown', onDocumentKeydown)
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', onDocumentKeydown)
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

async function onThemeSelect(themeId) {
  await set({ theme: themeId })
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
    ref="overlayRef"
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
        aria-live="polite"
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
      <div class="popup-settings-row popup-settings-row--theme">
        <span
          id="popup-theme-rg-label"
          class="popup-settings-theme-label"
        >Accent</span>
        <div
          class="popup-settings-theme-swatches"
          role="radiogroup"
          aria-labelledby="popup-theme-rg-label"
        >
          <button
            v-for="opt in THEME_OPTIONS"
            :key="opt.id"
            type="button"
            role="radio"
            class="popup-settings-theme-swatch"
            :class="[
              `popup-settings-theme-swatch--${opt.id}`,
              { 'popup-settings-theme-swatch--selected': effectiveTheme === opt.id },
            ]"
            :aria-checked="effectiveTheme === opt.id"
            :aria-label="opt.label"
            @click="onThemeSelect(opt.id)"
          ></button>
        </div>
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

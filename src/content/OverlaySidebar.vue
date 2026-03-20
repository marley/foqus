<script setup>
import { ref, watch } from 'vue'
import { useStorage } from '../composables/useStorage'
import { useStats } from '../composables/useStats'

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
  avoid,
  visit,
  overrideLimitMinutes,
  customOverlayTitle,
  set,
} = useStorage(['avoid', 'visit', 'overrideLimitMinutes', 'customOverlayTitle'])

const { stats } = useStats()

const open = ref(false)
const siteInput = ref('')
const activeList = ref('avoid') // 'avoid' | 'visit'
const overrideLimitInput = ref(OVERRIDE_LIMIT_DEFAULT)
const overlayTitleInput = ref('')
const savedIndicator = ref(false)

watch(overrideLimitMinutes, (val) => {
  overrideLimitInput.value = val != null ? clampOverrideLimit(val) : OVERRIDE_LIMIT_DEFAULT
}, { immediate: true })

watch(customOverlayTitle, (val) => {
  overlayTitleInput.value = val || ''
}, { immediate: true })

function toggle() {
  open.value = !open.value
}

function close() {
  open.value = false
}

function addSite() {
  const value = siteInput.value.trim()
  if (!value) return
  const list = activeList.value === 'avoid' ? avoid.value : visit.value
  if (list.includes(value)) return
  set({ [activeList.value]: [...list, value] })
  siteInput.value = ''
}

function removeSite(type, value) {
  const list = type === 'avoid' ? avoid.value : visit.value
  const updated = list.filter((item) => item !== value)
  set({ [type]: updated })
}

function showSaved() {
  savedIndicator.value = true
  clearTimeout(showSaved._t)
  showSaved._t = setTimeout(() => { savedIndicator.value = false }, 2000)
}

function onOverlayTitleSubmit(e) {
  e.preventDefault()
  const val = overlayTitleInput.value.trim()
  set({ customOverlayTitle: val || '' }).then(showSaved)
}

function onLimitSubmit(e) {
  e.preventDefault()
  const minutes = clampOverrideLimit(overrideLimitInput.value)
  overrideLimitInput.value = minutes
  set({ overrideLimitMinutes: minutes }).then(showSaved)
}
</script>

<template>
  <!-- Sidebar trigger tab -->
  <button
    type="button"
    class="foqus-sidebar-trigger"
    :class="{ 'foqus-sidebar-trigger--open': open }"
    @click="toggle"
    :aria-expanded="open"
    aria-label="Toggle management sidebar"
  >
    <span class="foqus-sidebar-trigger-icon" aria-hidden="true">&#9881;</span>
    <span class="foqus-sidebar-trigger-label">manage</span>
  </button>

  <!-- Sidebar panel -->
  <Transition name="foqus-sidebar">
    <aside
      v-show="open"
      class="foqus-sidebar"
      role="complementary"
      aria-label="Site management"
    >
      <div class="foqus-sidebar-inner">
        <div class="foqus-sidebar-header">
          <h2 class="foqus-sidebar-title">manage</h2>
          <button
            type="button"
            class="foqus-sidebar-close"
            @click="close"
            aria-label="Close sidebar"
          >
            x
          </button>
        </div>

        <!-- Quick stats -->
        <div class="foqus-sidebar-stats" v-if="stats.intentionsKept > 0 || stats.streak > 0">
          <div class="foqus-sidebar-stat">
            <span class="foqus-sidebar-stat-value foqus-sidebar-stat-value--streak">{{ stats.streak }}</span>
            <span class="foqus-sidebar-stat-label">streak</span>
          </div>
          <div class="foqus-sidebar-stat">
            <span class="foqus-sidebar-stat-value foqus-sidebar-stat-value--kept">{{ stats.intentionsKept }}</span>
            <span class="foqus-sidebar-stat-label">kept</span>
          </div>
          <div class="foqus-sidebar-stat">
            <span class="foqus-sidebar-stat-value">{{ stats.keptToday }}</span>
            <span class="foqus-sidebar-stat-label">today</span>
          </div>
        </div>

        <!-- Site lists -->
        <div class="foqus-sidebar-section">
          <div class="foqus-sidebar-list-toggle">
            <button
              type="button"
              class="foqus-sidebar-list-btn"
              :class="{ 'foqus-sidebar-list-btn--active': activeList === 'avoid' }"
              @click="activeList = 'avoid'"
            >avoid</button>
            <button
              type="button"
              class="foqus-sidebar-list-btn"
              :class="{ 'foqus-sidebar-list-btn--active': activeList === 'visit' }"
              @click="activeList = 'visit'"
            >visit</button>
          </div>

          <form class="foqus-sidebar-add-form" @submit.prevent="addSite">
            <input
              v-model="siteInput"
              type="text"
              placeholder="example.com"
              class="foqus-sidebar-input"
            >
            <button type="submit" class="foqus-sidebar-add-btn">+</button>
          </form>

          <ul class="foqus-sidebar-list" v-if="activeList === 'avoid'">
            <li v-for="item in avoid" :key="item" class="foqus-sidebar-list-item">
              <span class="foqus-sidebar-list-text foqus-sidebar-list-text--avoid">{{ item }}</span>
              <button type="button" class="foqus-sidebar-remove" @click="removeSite('avoid', item)" aria-label="Remove">x</button>
            </li>
            <li v-if="!avoid || avoid.length === 0" class="foqus-sidebar-empty">No sites added</li>
          </ul>
          <ul class="foqus-sidebar-list" v-else>
            <li v-for="item in visit" :key="item" class="foqus-sidebar-list-item">
              <span class="foqus-sidebar-list-text foqus-sidebar-list-text--visit">{{ item }}</span>
              <button type="button" class="foqus-sidebar-remove" @click="removeSite('visit', item)" aria-label="Remove">x</button>
            </li>
            <li v-if="!visit || visit.length === 0" class="foqus-sidebar-empty">No sites added</li>
          </ul>
        </div>

        <!-- Settings -->
        <div class="foqus-sidebar-section">
          <h3 class="foqus-sidebar-section-title">settings</h3>
          <span v-show="savedIndicator" class="foqus-sidebar-saved">Saved!</span>

          <form class="foqus-sidebar-settings-form" @submit="onLimitSubmit">
            <label class="foqus-sidebar-label">Unblock time</label>
            <div class="foqus-sidebar-settings-row">
              <input
                v-model.number="overrideLimitInput"
                type="number"
                min="1"
                max="120"
                class="foqus-sidebar-input foqus-sidebar-input--small"
              >
              <span class="foqus-sidebar-unit">min</span>
              <button type="submit" class="foqus-sidebar-save-btn">save</button>
            </div>
          </form>

          <form class="foqus-sidebar-settings-form" @submit="onOverlayTitleSubmit">
            <label class="foqus-sidebar-label">Custom message</label>
            <div class="foqus-sidebar-settings-row">
              <input
                v-model="overlayTitleInput"
                type="text"
                placeholder="You shall not pass."
                class="foqus-sidebar-input"
              >
              <button type="submit" class="foqus-sidebar-save-btn">save</button>
            </div>
          </form>
        </div>
      </div>
    </aside>
  </Transition>
</template>

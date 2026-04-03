<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import { useStorage } from '../composables/useStorage'
import SiteTabPanel from './components/SiteTabPanel.vue'
import StatsPanel from './components/StatsPanel.vue'
import SettingsDrawer from './components/SettingsDrawer.vue'

import './popup.css'

const {
  avoid,
  visit,
  descriptionBannerDismissed,
  set,
} = useStorage(['avoid', 'visit', 'descriptionBannerDismissed'])

const activeTab = ref('avoid')
const settingsOpen = ref(false)

const avoidPanelRef = ref(null)
const visitPanelRef = ref(null)
const tabAvoidRef = ref(null)
const tabVisitRef = ref(null)
const settingsTriggerRef = ref(null)

function onAddSite(listName, value) {
  const list = listName === 'avoid' ? avoid.value : visit.value
  if (list.includes(value)) return
  set({ [listName]: [...list, value] })
}

function onRemoveSite(type, value) {
  const list = type === 'avoid' ? avoid.value : visit.value
  const updated = list.filter((item) => item !== value)
  set({ [type]: updated })
}

function onOnboardingDismiss() {
  set({ descriptionBannerDismissed: true })
}

function onTabKeydown(event) {
  if (event.key === 'Home') {
    event.preventDefault()
    activeTab.value = 'avoid'
    nextTick(() => tabAvoidRef.value?.focus())
    return
  }
  if (event.key === 'End') {
    event.preventDefault()
    activeTab.value = 'visit'
    nextTick(() => tabVisitRef.value?.focus())
    return
  }
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
  event.preventDefault()
  if (event.key === 'ArrowRight' && activeTab.value === 'avoid') {
    activeTab.value = 'visit'
    nextTick(() => tabVisitRef.value?.focus())
  } else if (event.key === 'ArrowLeft' && activeTab.value === 'visit') {
    activeTab.value = 'avoid'
    nextTick(() => tabAvoidRef.value?.focus())
  }
}

watch(settingsOpen, (isOpen, wasOpen) => {
  if (wasOpen === true && isOpen === false) {
    nextTick(() => settingsTriggerRef.value?.focus())
  }
})

onMounted(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs?.[0]
    if (!tab?.url) return
    try {
      const { hostname } = new URL(tab.url)
      if (!hostname) return
      avoidPanelRef.value?.setInitialHostname(hostname)
      visitPanelRef.value?.setInitialHostname(hostname)
    } catch {}
  })
})
</script>

<template>
  <div class="popup-surface" :inert="settingsOpen">
    <header class="popup-header popup-header--row">
      <h1 class="popup-brand">foqus</h1>
      <button
        ref="settingsTriggerRef"
        type="button"
        class="popup-settings-icon-btn"
        :aria-expanded="settingsOpen"
        aria-controls="settings-panel"
        aria-haspopup="dialog"
        aria-label="Settings"
        @click="settingsOpen = !settingsOpen"
      >
        <span class="popup-settings-icon" aria-hidden="true">&#9881;</span>
      </button>
    </header>

    <StatsPanel />

    <main class="popup-main">
      <div
        class="popup-tab-bar"
        role="tablist"
        aria-label="Site lists"
        @keydown="onTabKeydown"
      >
        <button
          id="tab-avoid"
          ref="tabAvoidRef"
          type="button"
          class="popup-tab"
          :class="{ 'popup-tab--active': activeTab === 'avoid' }"
          role="tab"
          :aria-selected="activeTab === 'avoid'"
          aria-controls="panel-avoid"
          :tabindex="activeTab === 'avoid' ? 0 : -1"
          @click="activeTab = 'avoid'"
        >
          Avoid
        </button>
        <button
          id="tab-visit"
          ref="tabVisitRef"
          type="button"
          class="popup-tab"
          :class="{ 'popup-tab--active': activeTab === 'visit' }"
          role="tab"
          :aria-selected="activeTab === 'visit'"
          aria-controls="panel-visit"
          :tabindex="activeTab === 'visit' ? 0 : -1"
          @click="activeTab = 'visit'"
        >
          Visit
        </button>
      </div>

      <div class="popup-tab-panels">
        <SiteTabPanel
          ref="avoidPanelRef"
          type="avoid"
          :items="avoid"
          tab-id="tab-avoid"
          panel-id="panel-avoid"
          :selected="activeTab === 'avoid'"
          @add="(v) => onAddSite('avoid', v)"
          @remove="(v) => onRemoveSite('avoid', v)"
        >
          <template #before-list>
            <div
              v-if="!descriptionBannerDismissed"
              class="popup-onboarding-hint"
              role="region"
              aria-label="Getting started"
            >
              <p class="popup-onboarding-hint-text">
                Add sites to <strong>Avoid</strong> to block distractions, or to <strong>Visit</strong> for places you want to remember.
              </p>
              <button
                type="button"
                class="popup-onboarding-hint-dismiss"
                aria-label="Dismiss getting started tip"
                @click="onOnboardingDismiss"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
          </template>
        </SiteTabPanel>
        <SiteTabPanel
          ref="visitPanelRef"
          type="visit"
          :items="visit"
          tab-id="tab-visit"
          panel-id="panel-visit"
          :selected="activeTab === 'visit'"
          @add="(v) => onAddSite('visit', v)"
          @remove="(v) => onRemoveSite('visit', v)"
        >
          <template #before-list>
            <div
              v-if="!descriptionBannerDismissed"
              class="popup-onboarding-hint"
              role="region"
              aria-label="Getting started"
            >
              <p class="popup-onboarding-hint-text">
                Add sites to <strong>Avoid</strong> to block distractions, or to <strong>Visit</strong> for places you want to remember.
              </p>
              <button
                type="button"
                class="popup-onboarding-hint-dismiss"
                aria-label="Dismiss getting started tip"
                @click="onOnboardingDismiss"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
          </template>
        </SiteTabPanel>
      </div>
    </main>

    <footer class="popup-footer">
      <a
        href="https://ko-fi.com/foqus"
        target="_blank"
        rel="noopener noreferrer"
        class="popup-ko-fi"
      >
        <span aria-hidden="true">♥ </span>Support Foqus on Ko-fi
        <span class="visually-hidden"> (opens in new tab)</span>
      </a>
    </footer>
  </div>

  <SettingsDrawer v-model="settingsOpen" />
</template>

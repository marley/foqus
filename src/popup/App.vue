<script setup>
import { ref, watch, onMounted } from 'vue'
import { useStorage } from '../composables/useStorage'
import DescriptionBanner from './components/DescriptionBanner.vue'
import ModeToggle from './components/ModeToggle.vue'
import SiteForm from './components/SiteForm.vue'
import SiteList from './components/SiteList.vue'
import StatsPanel from './components/StatsPanel.vue'
import SettingsDrawer from './components/SettingsDrawer.vue'

import './popup.css'

const {
  avoid,
  visit,
  descriptionBannerDismissed,
  set,
} = useStorage(['avoid', 'visit', 'descriptionBannerDismissed'])

const activeMode = ref('avoid')
const accordionAvoidOpen = ref(true)
const accordionVisitOpen = ref(false)
const userManuallyOpenedBoth = ref(false)
const siteFormRef = ref(null)

function onModeChange(mode) {
  if (activeMode.value === mode) return
  activeMode.value = mode
  if (!userManuallyOpenedBoth.value) {
    accordionAvoidOpen.value = mode === 'avoid'
    accordionVisitOpen.value = mode === 'visit'
  }
}

function onAccordionToggle(type) {
  const isAvoid = type === 'avoid'
  const open = isAvoid ? accordionAvoidOpen.value : accordionVisitOpen.value
  const otherOpen = isAvoid ? accordionVisitOpen.value : accordionAvoidOpen.value

  if (!open && otherOpen) userManuallyOpenedBoth.value = true
  if (open) userManuallyOpenedBoth.value = false

  if (isAvoid) {
    accordionAvoidOpen.value = !accordionAvoidOpen.value
  } else {
    accordionVisitOpen.value = !accordionVisitOpen.value
  }
}

function onAddSite(value) {
  const listName = activeMode.value
  const list = listName === 'avoid' ? avoid.value : visit.value
  if (list.includes(value)) return
  set({ [listName]: [...list, value] })
}

function onRemoveSite(type, value) {
  const list = type === 'avoid' ? avoid.value : visit.value
  const updated = list.filter((item) => item !== value)
  set({ [type]: updated })
}

function onBannerDismiss() {
  set({ descriptionBannerDismissed: true })
}

onMounted(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs?.[0]
    if (tab?.url && siteFormRef.value) {
      try {
        const { hostname } = new URL(tab.url)
        if (hostname) siteFormRef.value.setInitialHostname(hostname)
      } catch {}
    }
  })
})
</script>

<template>
  <header class="popup-header">
    <h1 class="popup-brand">foqus</h1>
  </header>
  <DescriptionBanner
    :model-value="!descriptionBannerDismissed"
    @update:model-value="onBannerDismiss"
  />
  <main class="popup-main">
    <div class="popup-input-section" :data-mode="activeMode">
      <ModeToggle :model-value="activeMode" @update:model-value="onModeChange" />
      <SiteForm
        ref="siteFormRef"
        :mode="activeMode"
        @add="onAddSite"
      />
    </div>

    <StatsPanel />

    <div class="popup-accordion">
      <SiteList
        type="avoid"
        :items="avoid"
        :open="accordionAvoidOpen"
        @remove="(v) => onRemoveSite('avoid', v)"
        @toggle="onAccordionToggle('avoid')"
      />
      <SiteList
        type="visit"
        :items="visit"
        :open="accordionVisitOpen"
        @remove="(v) => onRemoveSite('visit', v)"
        @toggle="onAccordionToggle('visit')"
      />
    </div>
  </main>
  <SettingsDrawer />
  <footer class="popup-footer">
    <a href="https://ko-fi.com/foqus" target="_blank" rel="noopener noreferrer" class="popup-ko-fi">
      ♥ Support Foqus on Ko-fi
    </a>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStorage } from '../composables/useStorage'
import ModeToggle from './components/ModeToggle.vue'
import SiteForm from './components/SiteForm.vue'
import SiteList from './components/SiteList.vue'
import StatsPanel from './components/StatsPanel.vue'
import SettingsDrawer from './components/SettingsDrawer.vue'

import './popup.css'

const {
  avoid,
  visit,
  set,
} = useStorage(['avoid', 'visit'])

const activeMode = ref('avoid')
const activeTab = ref('lists')
const siteFormRef = ref(null)

function onModeChange(mode) {
  if (activeMode.value === mode) return
  activeMode.value = mode
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

    <nav class="popup-tab-nav" role="tablist" aria-label="Popup sections">
      <button
        type="button"
        role="tab"
        class="popup-tab-btn"
        :class="{ 'popup-tab-btn--active': activeTab === 'lists' }"
        :aria-selected="activeTab === 'lists'"
        @click="activeTab = 'lists'"
      >
        lists
      </button>
      <button
        type="button"
        role="tab"
        class="popup-tab-btn"
        :class="{ 'popup-tab-btn--active': activeTab === 'settings' }"
        :aria-selected="activeTab === 'settings'"
        @click="activeTab = 'settings'"
      >
        settings
      </button>
    </nav>

    <div class="popup-tab-body">
      <div v-show="activeTab === 'lists'" class="popup-tab-panel" role="tabpanel">
        <SiteList
          :type="activeMode"
          :items="activeMode === 'avoid' ? avoid : visit"
          :open="true"
          @remove="(v) => onRemoveSite(activeMode, v)"
          @toggle="() => {}"
        />
      </div>

      <div v-show="activeTab === 'settings'" class="popup-tab-panel" role="tabpanel">
        <SettingsDrawer :inline="true" />
      </div>
    </div>
  </main>
  <footer class="popup-footer">
    <a href="https://ko-fi.com/foqus" target="_blank" rel="noopener noreferrer" class="popup-ko-fi">
      support foqus
    </a>
  </footer>
</template>

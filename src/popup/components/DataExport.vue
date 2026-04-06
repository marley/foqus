<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { getExportSummary } from '../../composables/useStats'

const { t } = useI18n()
const exported = ref(false)

function downloadFile(content, filename, type) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

async function exportJSON() {
  const summary = await getExportSummary()
  const json = JSON.stringify(summary, null, 2)
  downloadFile(json, `foqus-export-${Date.now()}.json`, 'application/json')
  showExported()
}

function showExported() {
  exported.value = true
  setTimeout(() => { exported.value = false }, 2000)
}
</script>

<template>
  <div class="popup-export">
    <h3 class="popup-settings-subheading">{{ t('export.heading') }}</h3>
    <div class="popup-export-buttons">
      <button
        type="button"
        :aria-label="t('export.exportAria')"
        @click="exportJSON"
      >
        {{ t('export.exportJson') }}
      </button>
      <span
        v-show="exported"
        role="status"
        class="popup-settings-saved"
      >{{ t('export.exported') }}</span>
    </div>
  </div>
</template>

<style scoped>
.popup-export {
  margin-top: 12px;
}

.popup-export-buttons {
  display: flex;
  align-items: center;
  gap: 8px;
}

.popup-export-buttons button {
  padding: 6px 14px;
  border: 1px solid var(--foqus-border);
  border-radius: var(--foqus-radius, 6px);
  background: var(--foqus-bg);
  color: var(--foqus-text);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  cursor: pointer;
}

.popup-export-buttons button:hover {
  background: var(--foqus-card);
  border-color: var(--foqus-accent);
}
</style>

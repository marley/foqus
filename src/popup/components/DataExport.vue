<script setup>
import { ref } from 'vue'
import { getAllEventsForExport } from '../../composables/useStats'

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
  const events = await getAllEventsForExport()
  const json = JSON.stringify(events, null, 2)
  downloadFile(json, `foqus-export-${Date.now()}.json`, 'application/json')
  showExported()
}

async function exportCSV() {
  const events = await getAllEventsForExport()
  const header = 'type,host,timestamp,date,meta'
  const rows = events.map((e) => {
    const date = new Date(e.ts).toISOString()
    const meta = e.meta ? JSON.stringify(e.meta).replace(/"/g, '""') : ''
    return `${e.type},${e.host},${e.ts},${date},"${meta}"`
  })
  downloadFile([header, ...rows].join('\n'), `foqus-export-${Date.now()}.csv`, 'text/csv')
  showExported()
}

function showExported() {
  exported.value = true
  setTimeout(() => { exported.value = false }, 2000)
}
</script>

<template>
  <div class="popup-export">
    <h3 class="popup-settings-subheading">Data export</h3>
    <div class="popup-export-buttons">
      <button type="button" @click="exportJSON">JSON</button>
      <button type="button" @click="exportCSV">CSV</button>
      <span v-show="exported" class="popup-settings-saved">Exported!</span>
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
  border-radius: 0;
  background: var(--foqus-bg);
  color: var(--foqus-text);
  font-size: 12px;
  font-family: "Noto Sans Mono", monospace;
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

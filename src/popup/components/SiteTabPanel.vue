<script setup>
import { computed, ref } from 'vue'
import SiteForm from './SiteForm.vue'

const props = defineProps({
  /** `'avoid'` | `'visit'` */
  type: { type: String, required: true },
  items: { type: Array, required: true },
  /** `id` of the tab control for `aria-labelledby`. */
  tabId: { type: String, required: true },
  /** Stable `id` for this panel (referenced by the tab’s `aria-controls`). */
  panelId: { type: String, required: true },
  /** When false, panel is removed from the accessibility tree via `hidden`. */
  selected: { type: Boolean, required: true },
})

const emit = defineEmits(['add', 'remove'])

const siteFormRef = ref(null)

const inputId = computed(() => `site-input-${props.type}`)
const listId = computed(() => `${props.type}-sites-list`)
const emptyStateId = computed(() => `${props.type}-sites-empty`)
const listLabel = computed(() =>
  props.type === 'avoid' ? 'Sites to avoid' : 'Places to go instead',
)

defineExpose({
  setInitialHostname(hostname) {
    siteFormRef.value?.setInitialHostname(hostname)
  },
})

function onAdd(value) {
  emit('add', value)
}

function removeItem(value) {
  emit('remove', value)
}
</script>

<template>
  <div
    :id="panelId"
    class="popup-tab-panel"
    :class="`popup-tab-panel--${type}`"
    role="tabpanel"
    :aria-labelledby="tabId"
    :hidden="!selected"
  >
    <SiteForm
      ref="siteFormRef"
      :mode="type"
      :input-id="inputId"
      @add="onAdd"
    />
    <slot name="before-list" />
    <div class="popup-list-wrap">
      <ul :id="listId" :aria-label="listLabel">
        <TransitionGroup name="popup-list-item">
          <li
            v-for="item in items"
            :key="item"
            class="popup-list-item"
          >
            <span class="popup-list-item-text">{{ item }}</span>
            <button
              type="button"
              class="popup-remove-btn"
              :aria-label="`Remove ${item}`"
              @click="removeItem(item)"
            >
              <span aria-hidden="true">×</span>
            </button>
          </li>
        </TransitionGroup>
      </ul>
      <p
        class="popup-empty-state"
        :id="emptyStateId"
        :hidden="items.length > 0"
      >
        No sites added yet
      </p>
    </div>
  </div>
</template>

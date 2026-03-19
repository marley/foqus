<script setup>
const props = defineProps({
  type: { type: String, required: true },
  items: { type: Array, default: () => [] },
  open: { type: Boolean, default: false },
})
const emit = defineEmits(['remove', 'toggle'])

const isAvoid = props.type === 'avoid'
const accordionId = isAvoid ? 'accordionAvoid' : 'accordionVisit'
const bodyId = isAvoid ? 'accordionAvoidBody' : 'accordionVisitBody'
const listId = `${props.type}List`
const emptyStateId = `${props.type}EmptyState`

function removeItem(value) {
  emit('remove', value)
}
</script>

<template>
  <div class="popup-accordion-item" :class="`popup-accordion-item--${type}`">
    <button
      type="button"
      :id="accordionId"
      class="popup-accordion-header"
      :aria-expanded="open"
      :aria-controls="bodyId"
      @click="$emit('toggle')"
    >
      <span class="popup-accordion-label">
        <svg
          class="popup-accordion-icon-eye"
          :class="`popup-accordion-icon-eye--${type}`"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <template v-if="type === 'avoid'">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
          </template>
          <template v-else>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </template>
        </svg>
        {{ type === 'avoid' ? 'Sites to avoid' : 'Places to go instead' }}
      </span>
      <span class="popup-accordion-icon" aria-hidden="true">{{ open ? '▾' : '▸' }}</span>
    </button>
    <div
      :id="bodyId"
      class="popup-accordion-body"
      role="region"
      :aria-labelledby="accordionId"
      :hidden="!open"
    >
      <div class="popup-list-wrap">
        <ul :id="listId">
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
                x
              </button>
            </li>
          </TransitionGroup>
        </ul>
        <p class="popup-empty-state" :id="emptyStateId" :hidden="items.length > 0">
          No sites added yet
        </p>
      </div>
    </div>
  </div>
</template>

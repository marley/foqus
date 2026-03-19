<script setup>
defineProps({
  modelValue: { type: String, required: true },
})
defineEmits(['update:modelValue']);
</script>

<template>
  <div class="popup-mode-toggle" role="group" aria-label="Add to list type">
    <span class="popup-mode-slider" aria-hidden="true"></span>
    <button
      type="button"
      class="popup-mode-btn"
      :class="{ 'popup-mode-btn--active': modelValue === 'avoid' }"
      aria-pressed="modelValue === 'avoid'"
      @click="$emit('update:modelValue', 'avoid')"
    >
      avoid
    </button>
    <button
      type="button"
      class="popup-mode-btn"
      :class="{ 'popup-mode-btn--active': modelValue === 'visit' }"
      aria-pressed="modelValue === 'visit'"
      @click="$emit('update:modelValue', 'visit')"
    >
      visit
    </button>
  </div>
</template>

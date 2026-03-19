<script setup>
defineProps({
  modelValue: { type: Boolean, default: true },
})
defineEmits(['update:modelValue']);
</script>

<template>
  <div
    v-show="modelValue"
    class="popup-description-banner"
    role="region"
    aria-label="Extension description"
  >
    <p class="popup-description">
      <span class="popup-description-orange">Keep track of sites of distraction by adding to your <strong>avoid</strong> list.</span>
      <span class="popup-description-green"> Reorient your browsing habits by adding to your <strong>visit</strong> list.</span>
    </p>
    <button
      type="button"
      class="popup-description-banner-dismiss"
      aria-label="Dismiss"
      @click="$emit('update:modelValue', false)"
    >
      ×
    </button>
  </div>
</template>

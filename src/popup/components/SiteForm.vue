<script setup>
import { ref } from 'vue'

defineProps({
  mode: { type: String, required: true },
  initialHostname: { type: String, default: '' },
})
const emit = defineEmits(['add'])

const inputValue = ref('')

function setInitialHostname(hostname) {
  if (hostname) inputValue.value = hostname
}

defineExpose({ setInitialHostname })

function onSubmit(e) {
  e.preventDefault()
  const value = inputValue.value.trim()
  if (!value) return
  emit('add', value)
  inputValue.value = ''
}
</script>

<template>
  <form class="popup-input-row" @submit="onSubmit">
    <label for="siteInput" class="visually-hidden">Add a site</label>
    <input
      id="siteInput"
      v-model="inputValue"
      type="text"
      placeholder="example.com"
      name="siteInput"
    >
    <button type="submit" class="popup-submit-btn" :class="{ 'popup-submit-btn--visit': mode === 'visit' }" aria-label="Add site">
      +
    </button>
  </form>
</template>

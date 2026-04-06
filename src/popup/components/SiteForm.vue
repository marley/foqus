<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({
  /** Unique id for label/input pairing when multiple forms exist (e.g. tab panels). */
  inputId: { type: String, default: 'siteInput' },
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
    <label :for="inputId" class="visually-hidden">{{ t('site.addLabel') }}</label>
    <input
      :id="inputId"
      v-model="inputValue"
      type="text"
      :placeholder="t('site.placeholder')"
      :name="inputId"
    >
    <button type="submit" class="popup-submit-btn" :aria-label="t('site.addAria')">
      +
    </button>
  </form>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

defineProps({
  secondsLeft: { type: Number, required: true },
})

const { t } = useI18n()
</script>

<template>
  <div class="foqus-return-toast">
    {{ secondsLeft === 1
      ? t('returnWarning.one')
      : t('returnWarning.many', { n: secondsLeft })
    }}
  </div>
</template>

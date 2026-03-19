<script setup>
defineProps({
  secondsLeft: { type: Number, required: true },
})
</script>

<template>
  <div class="foqus-return-toast">
    {{ secondsLeft === 1
      ? "Focus mode returning in 1 second"
      : `Focus mode returning in ${secondsLeft} seconds`
    }}
  </div>
</template>

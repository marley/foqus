<template>
  <div class="flex gap-4">
    <div class="mt-1 flex-shrink-0">
      <div
        :class="[
          'w-5 h-5 rounded-full flex items-center justify-center text-white text-xs',
          live ? 'bg-brand-teal' : 'bg-brand-teal/30',
        ]"
      >
        <svg v-if="live" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>
    <div>
      <div class="flex items-center gap-2">
        <h3 class="font-mono font-semibold text-base">{{ name }}</h3>
        <span
          v-if="!live"
          class="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-orange/10 text-brand-orange"
        >
          coming soon
        </span>
      </div>
      <p class="text-brand-teal dark:text-dark-muted text-sm leading-relaxed mt-1">{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  description: string
  live: boolean
}>()
</script>

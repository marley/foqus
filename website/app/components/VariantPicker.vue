<template>
  <div class="fixed bottom-6 right-6 z-50 flex items-center gap-1 bg-white/90 backdrop-blur-sm shadow-lg rounded-full px-2 py-1.5 border border-black/5">
    <span class="text-[10px] font-mono text-black/30 px-2">Variant</span>
    <NuxtLink
      to="/"
      :class="['text-[11px] font-mono px-3 py-1 rounded-full transition-colors', current === 'v1' ? 'bg-black text-white' : 'text-black/40 hover:text-black']"
    >
      Weißraum
    </NuxtLink>
    <NuxtLink
      to="/v2"
      :class="['text-[11px] font-mono px-3 py-1 rounded-full transition-colors', current === 'v2' ? 'bg-black text-white' : 'text-black/40 hover:text-black']"
    >
      Bauhaus
    </NuxtLink>
    <NuxtLink
      to="/v3"
      :class="['text-[11px] font-mono px-3 py-1 rounded-full transition-colors', current === 'v3' ? 'bg-black text-white' : 'text-black/40 hover:text-black']"
    >
      Kiez
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{ current: string }>()
</script>

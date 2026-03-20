<template>
  <section id="features" class="py-24 sm:py-32 px-6">
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-16">
        <p class="font-mono text-sm text-brand-orange tracking-widest uppercase mb-4">// what you get</p>
        <h2 class="font-mono font-bold text-3xl sm:text-4xl">Features</h2>
      </div>

      <div class="grid sm:grid-cols-2 gap-x-12 gap-y-8 max-w-3xl mx-auto">
        <FeatureItem
          v-for="feature in features"
          :key="feature.name"
          :name="feature.name"
          :description="feature.description"
          :live="feature.live"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const features = [
  {
    name: 'Site intention lists',
    description: 'Curate your avoid list and positive alternatives in one place.',
    live: true,
  },
  {
    name: 'Personality-driven overlay',
    description: 'A beautiful 3D gradient overlay with witty, warm messages.',
    live: true,
  },
  {
    name: 'Graceful unblocking',
    description: "Unblock for a set time — it's data, not failure.",
    live: true,
  },
  {
    name: 'Custom messages',
    description: 'Set your own overlay text. Make it yours.',
    live: true,
  },
  {
    name: 'Dark mode',
    description: 'Full dark mode support across popup and overlay.',
    live: true,
  },
  {
    name: 'Reduced motion',
    description: 'Respects your system accessibility preferences.',
    live: true,
  },
  {
    name: 'Streak tracking',
    description: 'Track your intentions-kept streaks over time.',
    live: false,
  },
  {
    name: 'Weekly reflections',
    description: '"You visited Reddit 30% less this week" — gentle insights.',
    live: false,
  },
  {
    name: 'Trend lines',
    description: 'See your browsing patterns shift over time, visually.',
    live: false,
  },
  {
    name: 'Data export',
    description: 'Export your data as CSV or JSON. It\'s your data.',
    live: false,
  },
]
</script>

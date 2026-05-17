<template>
  <section id="pricing" class="py-24 sm:py-32 px-6 bg-brand-linen dark:bg-dark-card">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-16">
        <p class="font-mono text-sm text-brand-orange tracking-widest uppercase mb-4">// honest pricing</p>
        <h2 class="font-mono font-bold text-3xl sm:text-4xl">Free forever. Seriously.</h2>
      </div>

      <div class="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        <!-- Free tier -->
        <div class="bg-brand-parchment dark:bg-dark-bg p-8 sm:p-10 rounded-2xl border-2 border-brand-teal">
          <div class="flex items-baseline gap-2 mb-2">
            <span class="font-mono font-bold text-3xl">$0</span>
            <span class="font-mono text-sm text-brand-teal dark:text-dark-muted">/ forever</span>
          </div>
          <h3 class="font-mono font-semibold text-lg mb-4">Free</h3>
          <p class="text-brand-teal dark:text-dark-muted text-sm mb-8 leading-relaxed">
            The full Foqus experience. No limits, no catches, no account needed.
          </p>
          <ul class="space-y-3 text-sm">
            <li v-for="item in freeFeatures" :key="item" class="flex gap-3">
              <svg class="w-5 h-5 text-brand-teal flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              {{ item }}
            </li>
          </ul>
          <a
            href="#"
            class="mt-8 block text-center px-6 py-3 bg-brand-teal text-white font-mono text-sm rounded-full hover:bg-brand-teal-dark transition-colors"
          >
            Add to Chrome
          </a>
        </div>

        <!-- Premium tier -->
        <div class="bg-brand-parchment dark:bg-dark-bg p-8 sm:p-10 rounded-2xl border border-brand-linen dark:border-dark-card relative">
          <span class="absolute top-4 right-4 font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-orange/10 text-brand-orange">
            coming soon
          </span>
          <div class="flex items-baseline gap-2 mb-2">
            <span class="font-mono font-bold text-3xl text-brand-teal/40">$?</span>
            <span class="font-mono text-sm text-brand-teal/40 dark:text-dark-muted/40">/ month</span>
          </div>
          <h3 class="font-mono font-semibold text-lg mb-4">Premium</h3>
          <p class="text-brand-teal dark:text-dark-muted text-sm mb-8 leading-relaxed">
            For people who want sync. That's it. No paywalls on core features.
          </p>
          <ul class="space-y-3 text-sm text-brand-teal/60 dark:text-dark-muted/60">
            <li class="flex gap-3">
              <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              Everything in Free
            </li>
            <li class="flex gap-3">
              <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              Cross-device sync
            </li>
          </ul>
          <p class="mt-8 text-center font-mono text-xs text-brand-teal/40 dark:text-dark-muted/40">
            Premium exists to cover sync costs, not to hold features hostage.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const freeFeatures = [
  'All core features',
  'Intention lists & alternatives',
  'Personality-driven overlay',
  'Custom messages & settings',
  'Dark mode & accessibility',
  'Local storage — your data stays yours',
  'No account required',
]
</script>

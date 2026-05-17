<template>
  <div class="bg-[#faf8f4] text-[#2c2c2c] antialiased" style="font-family: 'Inter', system-ui, sans-serif">
    <!-- Nav -->
    <nav class="fixed top-0 inset-x-0 z-50 bg-[#faf8f4]/90 backdrop-blur-sm">
      <div class="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
        <span class="font-mono text-sm font-medium tracking-tight text-brand-orange">foqus</span>
        <div class="flex items-center gap-6">
          <a href="#how" class="hidden sm:inline text-xs text-[#2c2c2c]/30 hover:text-[#2c2c2c] transition-colors">How</a>
          <a href="#features" class="hidden sm:inline text-xs text-[#2c2c2c]/30 hover:text-[#2c2c2c] transition-colors">Features</a>
          <a href="#" class="text-xs px-4 py-2 bg-brand-orange text-white rounded-lg hover:bg-brand-coral transition-colors">Add to Chrome</a>
        </div>
      </div>
    </nav>

    <!-- V3 Picker -->
    <VariantPicker current="v3" />

    <!-- Hero -->
    <section class="px-6 pt-32 pb-24">
      <div class="max-w-4xl mx-auto text-center">
        <div class="inline-block mb-8 px-3 py-1 bg-brand-orange/8 rounded-full">
          <span class="font-mono text-[11px] text-brand-orange tracking-wide">Free Chrome Extension</span>
        </div>
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.1] tracking-tight mb-6">
          A gentler way to<br />manage distractions
        </h1>
        <p class="text-lg text-[#2c2c2c]/40 max-w-lg mx-auto leading-relaxed mb-10">
          Foqus helps you notice your browsing habits with friendly nudges instead of hard blocks. No guilt, no tracking, no accounts.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#" class="inline-flex items-center gap-2 px-6 py-3 bg-brand-orange text-white text-sm rounded-lg hover:bg-brand-coral transition-colors">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            Add to Chrome — it's free
          </a>
          <a href="#how" class="text-sm text-[#2c2c2c]/30 hover:text-[#2c2c2c]/60 transition-colors">See how it works &darr;</a>
        </div>
      </div>
    </section>

    <!-- Problem — warm card -->
    <section class="px-6 py-20">
      <div class="max-w-3xl mx-auto bg-white rounded-2xl p-10 sm:p-14 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <p class="font-mono text-[11px] text-brand-orange tracking-wide mb-6">Why Foqus exists</p>
        <h2 class="text-2xl sm:text-3xl font-semibold leading-snug mb-6">
          Site blockers feel like punishment. So you turn them off.
        </h2>
        <p class="text-[#2c2c2c]/40 leading-relaxed max-w-lg">
          Brute-force blocking doesn't work long-term. Foqus replaces restriction with a moment of awareness — a pause, not a wall.
        </p>
      </div>
    </section>

    <!-- Three pillars -->
    <section class="px-6 py-20">
      <div class="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
        <div class="bg-white rounded-2xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <div class="w-10 h-10 rounded-xl bg-brand-orange/8 flex items-center justify-center mb-5">
            <span class="text-brand-orange text-lg">&#9678;</span>
          </div>
          <h3 class="font-semibold text-base mb-2">Intention, not restriction</h3>
          <p class="text-[#2c2c2c]/40 text-sm leading-relaxed">
            You choose sites to be mindful about. Foqus asks why, never says no.
          </p>
        </div>
        <div class="bg-white rounded-2xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <div class="w-10 h-10 rounded-xl bg-brand-orange/8 flex items-center justify-center mb-5">
            <span class="text-brand-orange text-lg">&#9786;</span>
          </div>
          <h3 class="font-semibold text-base mb-2">Personality, not productivity</h3>
          <p class="text-[#2c2c2c]/40 text-sm leading-relaxed">
            Friendly messages like <span class="font-mono text-xs">"Come here often?"</span> — warm, not clinical.
          </p>
        </div>
        <div class="bg-white rounded-2xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <div class="w-10 h-10 rounded-xl bg-brand-orange/8 flex items-center justify-center mb-5">
            <span class="text-brand-orange text-lg">&#9951;</span>
          </div>
          <h3 class="font-semibold text-base mb-2">Privacy, not surveillance</h3>
          <p class="text-[#2c2c2c]/40 text-sm leading-relaxed">
            All data on your device. No accounts, no servers, no tracking.
          </p>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section id="how" class="px-6 py-20">
      <div class="max-w-3xl mx-auto">
        <p class="font-mono text-[11px] text-brand-orange tracking-wide mb-10 text-center">How it works</p>
        <div class="space-y-8">
          <div class="flex gap-5 items-start bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <span class="font-mono text-sm text-brand-orange/40 font-semibold pt-0.5">1</span>
            <div>
              <h3 class="font-semibold text-sm mb-1">Add your sites</h3>
              <p class="text-[#2c2c2c]/40 text-sm leading-relaxed">Choose sites to be mindful about and add positive alternatives.</p>
            </div>
          </div>
          <div class="flex gap-5 items-start bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <span class="font-mono text-sm text-brand-orange/40 font-semibold pt-0.5">2</span>
            <div>
              <h3 class="font-semibold text-sm mb-1">A gentle nudge appears</h3>
              <p class="text-[#2c2c2c]/40 text-sm leading-relaxed">Visit a flagged site and a beautiful overlay shows a friendly message with your alternatives.</p>
            </div>
          </div>
          <div class="flex gap-5 items-start bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <span class="font-mono text-sm text-brand-orange/40 font-semibold pt-0.5">3</span>
            <div>
              <h3 class="font-semibold text-sm mb-1">You always choose</h3>
              <p class="text-[#2c2c2c]/40 text-sm leading-relaxed">Unblock anytime, no guilt. It's awareness, not punishment.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Personas -->
    <section class="px-6 py-20">
      <div class="max-w-4xl mx-auto">
        <p class="font-mono text-[11px] text-brand-orange tracking-wide mb-10 text-center">Who it's for</p>
        <div class="grid sm:grid-cols-3 gap-6">
          <div v-for="p in personas" :key="p.title" class="bg-white rounded-2xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] text-center">
            <span class="text-3xl block mb-4">{{ p.emoji }}</span>
            <h3 class="font-semibold text-sm mb-2">{{ p.title }}</h3>
            <p class="text-[#2c2c2c]/40 text-xs italic leading-relaxed">{{ p.quote }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section id="features" class="px-6 py-20">
      <div class="max-w-3xl mx-auto">
        <p class="font-mono text-[11px] text-brand-orange tracking-wide mb-10 text-center">Features</p>
        <div class="bg-white rounded-2xl p-8 sm:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <div class="grid sm:grid-cols-2 gap-x-10 gap-y-6">
            <div v-for="f in features" :key="f.name" class="flex gap-3">
              <div class="mt-1 shrink-0">
                <div :class="['w-4 h-4 rounded-full flex items-center justify-center', f.live ? 'bg-brand-teal' : 'bg-[#2c2c2c]/10']">
                  <svg v-if="f.live" class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
                </div>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-sm font-medium">{{ f.name }}</span>
                  <span v-if="!f.live" class="font-mono text-[9px] text-[#2c2c2c]/25 tracking-wider">SOON</span>
                </div>
                <p class="text-[#2c2c2c]/35 text-xs leading-relaxed">{{ f.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing -->
    <section class="px-6 py-20">
      <div class="max-w-3xl mx-auto text-center">
        <p class="font-mono text-[11px] text-brand-orange tracking-wide mb-6">Pricing</p>
        <h2 class="text-3xl font-semibold mb-3">Free forever</h2>
        <p class="text-[#2c2c2c]/40 max-w-md mx-auto leading-relaxed mb-10">
          Every feature, no limits, no account. Optional premium adds sync — nothing else behind a paywall.
        </p>
        <div class="grid sm:grid-cols-2 gap-6 max-w-lg mx-auto">
          <div class="bg-white rounded-2xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border-2 border-brand-orange/20">
            <span class="text-3xl font-semibold block mb-1">$0</span>
            <span class="text-sm text-[#2c2c2c]/40">Everything, forever</span>
          </div>
          <div class="bg-white rounded-2xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] opacity-50">
            <span class="text-3xl font-semibold block mb-1">TBD</span>
            <span class="text-sm text-[#2c2c2c]/40">Sync only. Coming soon.</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Privacy -->
    <section class="px-6 py-20">
      <div class="max-w-3xl mx-auto bg-brand-teal-darkest text-white rounded-2xl p-10 sm:p-14 text-center">
        <p class="font-mono text-[11px] text-white/30 tracking-wide mb-6">Privacy</p>
        <h2 class="text-2xl sm:text-3xl font-semibold mb-8">Foqus cannot see your data.</h2>
        <div class="grid sm:grid-cols-4 gap-6 text-sm text-white/50">
          <div>
            <span class="text-white font-medium block mb-1">No analytics</span>
            Zero tracking
          </div>
          <div>
            <span class="text-white font-medium block mb-1">No servers</span>
            Stays on device
          </div>
          <div>
            <span class="text-white font-medium block mb-1">No accounts</span>
            Install and go
          </div>
          <div>
            <span class="text-white font-medium block mb-1">No cookies</span>
            Nothing to track
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="px-6 py-20">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-2xl font-semibold mb-3">Browse with intention.</h2>
        <p class="text-[#2c2c2c]/40 text-sm mb-8">Free, private, no account needed.</p>
        <a href="#" class="inline-flex items-center gap-2 px-6 py-3 bg-brand-orange text-white text-sm rounded-lg hover:bg-brand-coral transition-colors mb-16">
          Add to Chrome
        </a>
        <div class="flex items-center justify-center gap-6 text-xs text-[#2c2c2c]/25 pt-8 border-t border-[#2c2c2c]/5">
          <span class="font-mono font-medium text-brand-orange/60">foqus</span>
          <a href="#" class="hover:text-[#2c2c2c]/50 transition-colors">Ko-fi</a>
          <a href="#" class="hover:text-[#2c2c2c]/50 transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Foqus — A gentler way to manage distractions',
  meta: [
    { name: 'description', content: 'Foqus helps you notice your browsing habits with friendly nudges instead of hard blocks. Free, private, no account needed.' },
  ],
})

const personas = [
  { title: 'The Student', quote: '"I need to finish my thesis but I keep ending up on Instagram."', emoji: '📚' },
  { title: 'The Professional', quote: '"My wife told me I might have a phone problem."', emoji: '💼' },
  { title: 'The Job Seeker', quote: '"I block one site and find three more to procrastinate on."', emoji: '🔍' },
]

const features = [
  { name: 'Site intention lists', description: 'Curate your avoid list and positive alternatives.', live: true },
  { name: 'Personality-driven overlay', description: 'Beautiful gradient with warm, witty messages.', live: true },
  { name: 'Graceful unblocking', description: 'Unblock for a set time. Data, not failure.', live: true },
  { name: 'Custom messages', description: 'Write your own overlay text.', live: true },
  { name: 'Dark mode', description: 'Full dark mode across popup and overlay.', live: true },
  { name: 'Reduced motion', description: 'Respects accessibility preferences.', live: true },
  { name: 'Streak tracking', description: 'Track your intentions-kept streaks.', live: false },
  { name: 'Weekly reflections', description: 'Gentle insights on browsing shifts.', live: false },
  { name: 'Trend lines', description: 'Visualize patterns over time.', live: false },
  { name: 'Data export', description: 'CSV and JSON. Your data.', live: false },
]
</script>

<style>
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
</style>

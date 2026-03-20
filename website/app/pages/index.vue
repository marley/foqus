<template>
  <div class="bg-white text-neutral-900 font-sans antialiased">
    <!-- Nav -->
    <nav class="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-sm border-b border-neutral-100">
      <div class="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <span class="font-mono font-semibold text-sm tracking-tight">foqus</span>
        <div class="flex items-center gap-6">
          <a href="#how" class="hidden sm:inline text-xs text-neutral-400 hover:text-neutral-900 transition-colors">How it works</a>
          <a href="#features" class="hidden sm:inline text-xs text-neutral-400 hover:text-neutral-900 transition-colors">Features</a>
          <a href="#" class="text-xs font-mono px-4 py-2 bg-neutral-900 text-white rounded-full hover:bg-neutral-700 transition-colors">Add to Chrome</a>
        </div>
      </div>
    </nav>

    <!-- V1 Picker -->
    <VariantPicker current="v1" />

    <!-- Hero -->
    <section class="min-h-screen flex flex-col justify-center px-6 pt-14">
      <div class="max-w-3xl mx-auto w-full">
        <div class="mb-20">
          <p class="font-mono text-[11px] text-neutral-300 tracking-[0.2em] uppercase mb-12">Chrome Extension</p>
          <h1 class="text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.05] tracking-tight mb-8">
            Browse with<br />
            <span class="text-brand-orange">intention.</span>
          </h1>
          <p class="text-lg text-neutral-400 max-w-md leading-relaxed mb-12">
            A gentle Chrome extension that helps you notice your browsing habits — without blocking, guilt, or surveillance.
          </p>
          <div class="flex items-center gap-6">
            <a href="#" class="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white text-sm font-mono rounded-full hover:bg-neutral-700 transition-colors">
              Add to Chrome — free
            </a>
            <span class="text-xs text-neutral-300 font-mono">No account needed</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Problem -->
    <section class="px-6 py-32 border-t border-neutral-100">
      <div class="max-w-3xl mx-auto">
        <p class="font-mono text-[11px] text-neutral-300 tracking-[0.2em] uppercase mb-8">The problem</p>
        <h2 class="text-3xl sm:text-4xl font-light leading-snug mb-8">
          Site blockers feel like punishment.<br />
          So you turn them off.
        </h2>
        <p class="text-neutral-400 text-lg max-w-lg leading-relaxed">
          Brute-force blocking doesn't work long-term. Foqus takes a different approach — it asks you to pause and consider, not stop.
        </p>
      </div>
    </section>

    <!-- How it's different -->
    <section class="px-6 py-32 border-t border-neutral-100">
      <div class="max-w-3xl mx-auto">
        <p class="font-mono text-[11px] text-neutral-300 tracking-[0.2em] uppercase mb-16">Three principles</p>
        <div class="space-y-20">
          <div>
            <h3 class="text-2xl font-light mb-3">Intention, not restriction</h3>
            <p class="text-neutral-400 max-w-md leading-relaxed">You choose sites to be mindful about. When you visit one, Foqus asks why — it never says no.</p>
          </div>
          <div>
            <h3 class="text-2xl font-light mb-3">Personality, not productivity</h3>
            <p class="text-neutral-400 max-w-md leading-relaxed">The overlay speaks like a friend — <span class="font-mono text-sm text-neutral-500">"Come here often?"</span> — warm, not clinical.</p>
          </div>
          <div>
            <h3 class="text-2xl font-light mb-3">Privacy, not surveillance</h3>
            <p class="text-neutral-400 max-w-md leading-relaxed">All data stays on your device. No accounts, no servers, no tracking. Foqus cannot see your data.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section id="how" class="px-6 py-32 border-t border-neutral-100">
      <div class="max-w-3xl mx-auto">
        <p class="font-mono text-[11px] text-neutral-300 tracking-[0.2em] uppercase mb-16">How it works</p>
        <div class="grid md:grid-cols-3 gap-16">
          <div>
            <span class="font-mono text-[11px] text-neutral-300 block mb-4">01</span>
            <h3 class="text-lg font-normal mb-2">Add your sites</h3>
            <p class="text-neutral-400 text-sm leading-relaxed">Choose sites you want to be mindful about. Add positive alternatives you'd rather visit.</p>
          </div>
          <div>
            <span class="font-mono text-[11px] text-neutral-300 block mb-4">02</span>
            <h3 class="text-lg font-normal mb-2">A gentle nudge</h3>
            <p class="text-neutral-400 text-sm leading-relaxed">When you visit a flagged site, a beautiful overlay appears with a friendly message and your alternatives.</p>
          </div>
          <div>
            <span class="font-mono text-[11px] text-neutral-300 block mb-4">03</span>
            <h3 class="text-lg font-normal mb-2">You always choose</h3>
            <p class="text-neutral-400 text-sm leading-relaxed">Unblock anytime. No guilt, no judgment. It's information, not punishment.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Personas -->
    <section class="px-6 py-32 border-t border-neutral-100">
      <div class="max-w-3xl mx-auto">
        <p class="font-mono text-[11px] text-neutral-300 tracking-[0.2em] uppercase mb-16">Who it's for</p>
        <div class="space-y-12">
          <div class="flex gap-6">
            <span class="font-mono text-[11px] text-neutral-300 pt-1 shrink-0">01</span>
            <div>
              <h3 class="text-lg font-normal mb-1">The Student</h3>
              <p class="text-neutral-400 text-sm italic">"I need to finish my thesis but I keep ending up on Instagram."</p>
            </div>
          </div>
          <div class="flex gap-6">
            <span class="font-mono text-[11px] text-neutral-300 pt-1 shrink-0">02</span>
            <div>
              <h3 class="text-lg font-normal mb-1">The Professional</h3>
              <p class="text-neutral-400 text-sm italic">"My wife told me I might have a phone problem."</p>
            </div>
          </div>
          <div class="flex gap-6">
            <span class="font-mono text-[11px] text-neutral-300 pt-1 shrink-0">03</span>
            <div>
              <h3 class="text-lg font-normal mb-1">The Job Seeker</h3>
              <p class="text-neutral-400 text-sm italic">"I block one site and find three more to procrastinate on."</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section id="features" class="px-6 py-32 border-t border-neutral-100">
      <div class="max-w-3xl mx-auto">
        <p class="font-mono text-[11px] text-neutral-300 tracking-[0.2em] uppercase mb-16">Features</p>
        <div class="grid sm:grid-cols-2 gap-x-16 gap-y-10">
          <div v-for="f in features" :key="f.name">
            <div class="flex items-center gap-3 mb-1">
              <h3 class="text-sm font-normal">{{ f.name }}</h3>
              <span v-if="!f.live" class="font-mono text-[9px] text-neutral-300 tracking-wider uppercase">Soon</span>
            </div>
            <p class="text-neutral-400 text-sm leading-relaxed">{{ f.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing -->
    <section id="pricing" class="px-6 py-32 border-t border-neutral-100">
      <div class="max-w-3xl mx-auto">
        <p class="font-mono text-[11px] text-neutral-300 tracking-[0.2em] uppercase mb-8">Pricing</p>
        <h2 class="text-3xl font-light mb-4">Free. Completely.</h2>
        <p class="text-neutral-400 max-w-md leading-relaxed mb-12">
          Every core feature, no limits, no account. Premium adds cross-device sync for those who want it — nothing else goes behind a paywall.
        </p>
        <div class="grid sm:grid-cols-2 gap-8 max-w-lg">
          <div class="border border-neutral-200 p-6">
            <span class="font-mono text-sm block mb-1">Free</span>
            <span class="text-2xl font-light">$0</span>
            <p class="text-neutral-400 text-xs mt-2">Everything. Forever.</p>
          </div>
          <div class="border border-neutral-100 p-6 opacity-50">
            <span class="font-mono text-sm block mb-1">Premium</span>
            <span class="text-2xl font-light">TBD</span>
            <p class="text-neutral-400 text-xs mt-2">Cross-device sync. Coming soon.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Privacy -->
    <section class="px-6 py-32 border-t border-neutral-100">
      <div class="max-w-3xl mx-auto">
        <p class="font-mono text-[11px] text-neutral-300 tracking-[0.2em] uppercase mb-8">Privacy</p>
        <h2 class="text-3xl font-light mb-12">Foqus cannot see your data.</h2>
        <div class="grid sm:grid-cols-2 gap-12">
          <div>
            <h3 class="text-sm font-normal mb-2">No analytics</h3>
            <p class="text-neutral-400 text-sm leading-relaxed">Zero tracking scripts of any kind.</p>
          </div>
          <div>
            <h3 class="text-sm font-normal mb-2">No server calls</h3>
            <p class="text-neutral-400 text-sm leading-relaxed">Your browsing data never leaves your machine.</p>
          </div>
          <div>
            <h3 class="text-sm font-normal mb-2">No accounts</h3>
            <p class="text-neutral-400 text-sm leading-relaxed">Install and use. No sign-up required.</p>
          </div>
          <div>
            <h3 class="text-sm font-normal mb-2">No cookie banner</h3>
            <p class="text-neutral-400 text-sm leading-relaxed">Because there's nothing to track.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Comparison -->
    <section class="px-6 py-32 border-t border-neutral-100">
      <div class="max-w-3xl mx-auto">
        <p class="font-mono text-[11px] text-neutral-300 tracking-[0.2em] uppercase mb-16">Comparison</p>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-neutral-100">
                <th class="text-left font-normal text-neutral-400 py-3 pr-4" />
                <th class="text-center font-mono text-xs py-3 px-4">Foqus</th>
                <th class="text-center font-mono text-xs text-neutral-300 py-3 px-4">BlockSite</th>
                <th class="text-center font-mono text-xs text-neutral-300 py-3 px-4">Cold Turkey</th>
                <th class="text-center font-mono text-xs text-neutral-300 py-3 px-4">Freedom</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in comparison" :key="row.feature" class="border-b border-neutral-50">
                <td class="py-3 pr-4 text-neutral-600">{{ row.feature }}</td>
                <td class="py-3 px-4 text-center">
                  <span v-if="row.foqus === true" class="text-neutral-900">&#10003;</span>
                  <span v-else-if="row.foqus === false" class="text-neutral-200">&#10005;</span>
                  <span v-else class="font-mono text-xs text-neutral-400">{{ row.foqus }}</span>
                </td>
                <td class="py-3 px-4 text-center text-neutral-300">
                  <span v-if="row.others[0] === true">&#10003;</span>
                  <span v-else-if="row.others[0] === false">&#10005;</span>
                  <span v-else class="font-mono text-xs">{{ row.others[0] }}</span>
                </td>
                <td class="py-3 px-4 text-center text-neutral-300">
                  <span v-if="row.others[1] === true">&#10003;</span>
                  <span v-else-if="row.others[1] === false">&#10005;</span>
                  <span v-else class="font-mono text-xs">{{ row.others[1] }}</span>
                </td>
                <td class="py-3 px-4 text-center text-neutral-300">
                  <span v-if="row.others[2] === true">&#10003;</span>
                  <span v-else-if="row.others[2] === false">&#10005;</span>
                  <span v-else class="font-mono text-xs">{{ row.others[2] }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="px-6 py-32 border-t border-neutral-100">
      <div class="max-w-3xl mx-auto">
        <h2 class="text-3xl font-light mb-4">Browse with intention.</h2>
        <p class="text-neutral-400 mb-8">Free, private, no account needed.</p>
        <a href="#" class="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white text-sm font-mono rounded-full hover:bg-neutral-700 transition-colors mb-16">
          Add to Chrome
        </a>
        <div class="flex items-center justify-between text-xs text-neutral-300 pt-8 border-t border-neutral-100">
          <span class="font-mono">foqus</span>
          <div class="flex gap-6">
            <a href="#" class="hover:text-neutral-500 transition-colors">Ko-fi</a>
            <a href="#" class="hover:text-neutral-500 transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Foqus — Browse with intention',
  meta: [
    { name: 'description', content: 'A gentle Chrome extension that helps you notice your browsing habits — without blocking, guilt, or surveillance.' },
  ],
})

const features = [
  { name: 'Site intention lists', description: 'Curate your avoid list and positive alternatives.', live: true },
  { name: 'Personality-driven overlay', description: 'Beautiful 3D gradient with warm, witty messages.', live: true },
  { name: 'Graceful unblocking', description: 'Unblock for a set time. It\'s data, not failure.', live: true },
  { name: 'Custom messages', description: 'Write your own overlay text.', live: true },
  { name: 'Dark mode', description: 'Full dark mode across popup and overlay.', live: true },
  { name: 'Reduced motion', description: 'Respects system accessibility preferences.', live: true },
  { name: 'Streak tracking', description: 'Track your intentions-kept streaks.', live: false },
  { name: 'Weekly reflections', description: 'Gentle insights on your browsing shifts.', live: false },
  { name: 'Trend lines', description: 'Visualize your patterns over time.', live: false },
  { name: 'Data export', description: 'CSV and JSON. Your data is yours.', live: false },
]

const comparison = [
  { feature: 'Intention-first', foqus: true, others: [false, false, false] },
  { feature: 'Personality-driven UI', foqus: true, others: [false, false, false] },
  { feature: 'Privacy-first', foqus: true, others: [false, true, false] },
  { feature: 'No account required', foqus: true, others: [false, true, false] },
  { feature: 'Graceful unblocking', foqus: true, others: [false, false, false] },
  { feature: 'Positive alternatives', foqus: true, others: [false, false, false] },
  { feature: 'Free core experience', foqus: true, others: ['Freemium', 'Freemium', '$8.99/mo'] },
]
</script>

<style>
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
</style>

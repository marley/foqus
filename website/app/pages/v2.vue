<template>
  <div class="bg-[#f5f2ed] text-[#1a1a1a] font-sans antialiased">
    <!-- Nav -->
    <nav class="fixed top-0 inset-x-0 z-50 bg-[#f5f2ed]/90 backdrop-blur-sm">
      <div class="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
        <span class="font-mono font-bold text-base tracking-tight">FOQUS</span>
        <div class="flex items-center gap-8">
          <a href="#how" class="hidden sm:inline font-mono text-[11px] tracking-[0.15em] uppercase text-[#1a1a1a]/40 hover:text-[#1a1a1a] transition-colors">How</a>
          <a href="#features" class="hidden sm:inline font-mono text-[11px] tracking-[0.15em] uppercase text-[#1a1a1a]/40 hover:text-[#1a1a1a] transition-colors">Features</a>
          <a href="#" class="font-mono text-[11px] tracking-[0.15em] uppercase px-5 py-2.5 border border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#f5f2ed] transition-colors">Install</a>
        </div>
      </div>
    </nav>

    <!-- V2 Picker -->
    <VariantPicker current="v2" />

    <!-- Hero -->
    <section class="min-h-screen flex items-end px-8 pb-24 pt-16">
      <div class="max-w-6xl mx-auto w-full">
        <div class="grid md:grid-cols-12 gap-8 items-end">
          <div class="md:col-span-8">
            <h1 class="text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.95] tracking-tighter">
              NOT<br />ANOTHER<br />
              <span class="text-brand-orange">BLOCKER.</span>
            </h1>
          </div>
          <div class="md:col-span-4 pb-4">
            <p class="text-sm text-[#1a1a1a]/50 leading-relaxed mb-6">
              A Chrome extension that replaces guilt and restriction with intention and awareness. Free, private, yours.
            </p>
            <a href="#" class="inline-block font-mono text-[11px] tracking-[0.15em] uppercase px-5 py-2.5 bg-[#1a1a1a] text-[#f5f2ed] hover:bg-brand-orange transition-colors">
              Add to Chrome
            </a>
          </div>
        </div>
        <div class="mt-16 pt-8 border-t border-[#1a1a1a]/10 grid grid-cols-3 gap-8">
          <div>
            <span class="font-mono text-[11px] text-[#1a1a1a]/30 block mb-1">01</span>
            <span class="text-sm">Intention-first</span>
          </div>
          <div>
            <span class="font-mono text-[11px] text-[#1a1a1a]/30 block mb-1">02</span>
            <span class="text-sm">Privacy-first</span>
          </div>
          <div>
            <span class="font-mono text-[11px] text-[#1a1a1a]/30 block mb-1">03</span>
            <span class="text-sm">No guilt</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Problem -->
    <section class="px-8 py-32 bg-[#1a1a1a] text-[#f5f2ed]">
      <div class="max-w-6xl mx-auto grid md:grid-cols-12 gap-8">
        <div class="md:col-span-4">
          <span class="font-mono text-[11px] tracking-[0.15em] uppercase text-[#f5f2ed]/30">The problem</span>
        </div>
        <div class="md:col-span-8">
          <h2 class="text-3xl sm:text-5xl font-bold leading-tight tracking-tight mb-8">
            You tried blockers.<br />You turned them off.
          </h2>
          <p class="text-[#f5f2ed]/50 text-lg max-w-lg leading-relaxed">
            That's not a failure — that's a design flaw. Brute-force blocking feels like punishment, so you find workarounds. The problem was never your willpower.
          </p>
        </div>
      </div>
    </section>

    <!-- Three pillars -->
    <section class="px-8 py-32">
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-3 gap-px bg-[#1a1a1a]/10">
          <div class="bg-[#f5f2ed] p-10">
            <span class="font-mono text-[11px] text-[#1a1a1a]/30 block mb-8">01</span>
            <h3 class="text-xl font-bold tracking-tight mb-4">Intention,<br />not restriction</h3>
            <p class="text-[#1a1a1a]/50 text-sm leading-relaxed">
              You choose sites to be mindful about. When you visit one, Foqus asks why — it never says no.
            </p>
          </div>
          <div class="bg-[#f5f2ed] p-10">
            <span class="font-mono text-[11px] text-[#1a1a1a]/30 block mb-8">02</span>
            <h3 class="text-xl font-bold tracking-tight mb-4">Personality,<br />not productivity</h3>
            <p class="text-[#1a1a1a]/50 text-sm leading-relaxed">
              The overlay speaks like a friend: <span class="font-mono">"Come here often?"</span> Warm, not clinical.
            </p>
          </div>
          <div class="bg-[#f5f2ed] p-10">
            <span class="font-mono text-[11px] text-[#1a1a1a]/30 block mb-8">03</span>
            <h3 class="text-xl font-bold tracking-tight mb-4">Privacy,<br />not surveillance</h3>
            <p class="text-[#1a1a1a]/50 text-sm leading-relaxed">
              All data stays on your device. No accounts, no servers, no tracking. Period.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section id="how" class="px-8 py-32 border-t border-[#1a1a1a]/10">
      <div class="max-w-6xl mx-auto grid md:grid-cols-12 gap-8">
        <div class="md:col-span-4">
          <span class="font-mono text-[11px] tracking-[0.15em] uppercase text-[#1a1a1a]/30">Process</span>
        </div>
        <div class="md:col-span-8">
          <div class="space-y-16">
            <div class="flex gap-8">
              <span class="font-mono text-5xl font-bold text-[#1a1a1a]/10">01</span>
              <div>
                <h3 class="text-xl font-bold tracking-tight mb-2">Add your sites</h3>
                <p class="text-[#1a1a1a]/50 text-sm leading-relaxed">Choose sites to be mindful about. Add positive alternatives you'd rather visit.</p>
              </div>
            </div>
            <div class="flex gap-8">
              <span class="font-mono text-5xl font-bold text-[#1a1a1a]/10">02</span>
              <div>
                <h3 class="text-xl font-bold tracking-tight mb-2">A gentle nudge</h3>
                <p class="text-[#1a1a1a]/50 text-sm leading-relaxed">Visit a flagged site and a beautiful overlay appears with a friendly message and your alternatives.</p>
              </div>
            </div>
            <div class="flex gap-8">
              <span class="font-mono text-5xl font-bold text-[#1a1a1a]/10">03</span>
              <div>
                <h3 class="text-xl font-bold tracking-tight mb-2">You decide</h3>
                <p class="text-[#1a1a1a]/50 text-sm leading-relaxed">Unblock anytime. No guilt, no judgment. You always have the final say.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Personas -->
    <section class="px-8 py-32 bg-[#1a1a1a] text-[#f5f2ed]">
      <div class="max-w-6xl mx-auto grid md:grid-cols-12 gap-8">
        <div class="md:col-span-4">
          <span class="font-mono text-[11px] tracking-[0.15em] uppercase text-[#f5f2ed]/30">People</span>
        </div>
        <div class="md:col-span-8 space-y-12">
          <div v-for="p in personas" :key="p.title" class="border-b border-[#f5f2ed]/10 pb-8">
            <h3 class="font-bold text-lg tracking-tight mb-2">{{ p.title }}</h3>
            <p class="text-[#f5f2ed]/40 text-sm italic">{{ p.quote }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section id="features" class="px-8 py-32">
      <div class="max-w-6xl mx-auto grid md:grid-cols-12 gap-8">
        <div class="md:col-span-4">
          <span class="font-mono text-[11px] tracking-[0.15em] uppercase text-[#1a1a1a]/30">Features</span>
        </div>
        <div class="md:col-span-8">
          <div class="grid sm:grid-cols-2 gap-x-12 gap-y-8">
            <div v-for="f in features" :key="f.name">
              <div class="flex items-center gap-2 mb-1">
                <h3 class="text-sm font-bold tracking-tight">{{ f.name }}</h3>
                <span v-if="!f.live" class="font-mono text-[9px] text-[#1a1a1a]/30 tracking-wider uppercase border border-[#1a1a1a]/10 px-1.5 py-0.5">Soon</span>
              </div>
              <p class="text-[#1a1a1a]/50 text-sm leading-relaxed">{{ f.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing -->
    <section class="px-8 py-32 border-t border-[#1a1a1a]/10">
      <div class="max-w-6xl mx-auto grid md:grid-cols-12 gap-8">
        <div class="md:col-span-4">
          <span class="font-mono text-[11px] tracking-[0.15em] uppercase text-[#1a1a1a]/30">Pricing</span>
        </div>
        <div class="md:col-span-8">
          <h2 class="text-4xl font-bold tracking-tight mb-4">$0</h2>
          <p class="text-[#1a1a1a]/50 max-w-md leading-relaxed mb-8">
            Every core feature, no limits, no account. Premium adds cross-device sync — nothing else goes behind a paywall.
          </p>
          <p class="font-mono text-[11px] text-[#1a1a1a]/30">
            Premium exists to cover sync costs, not to hold features hostage.
          </p>
        </div>
      </div>
    </section>

    <!-- Privacy -->
    <section class="px-8 py-32 border-t border-[#1a1a1a]/10">
      <div class="max-w-6xl mx-auto grid md:grid-cols-12 gap-8">
        <div class="md:col-span-4">
          <span class="font-mono text-[11px] tracking-[0.15em] uppercase text-[#1a1a1a]/30">Trust</span>
        </div>
        <div class="md:col-span-8">
          <h2 class="text-3xl font-bold tracking-tight mb-12">Foqus cannot see your data.</h2>
          <div class="grid sm:grid-cols-2 gap-8">
            <p class="text-[#1a1a1a]/50 text-sm leading-relaxed"><span class="text-[#1a1a1a] font-bold">No analytics.</span> Zero tracking scripts.</p>
            <p class="text-[#1a1a1a]/50 text-sm leading-relaxed"><span class="text-[#1a1a1a] font-bold">No server calls.</span> Data never leaves your machine.</p>
            <p class="text-[#1a1a1a]/50 text-sm leading-relaxed"><span class="text-[#1a1a1a] font-bold">No accounts.</span> Install and go.</p>
            <p class="text-[#1a1a1a]/50 text-sm leading-relaxed"><span class="text-[#1a1a1a] font-bold">No cookie banner.</span> Nothing to track.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="px-8 py-16 border-t border-[#1a1a1a]/10">
      <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8">
        <div>
          <h2 class="text-4xl font-bold tracking-tighter mb-4">BROWSE WITH<br />INTENTION.</h2>
          <a href="#" class="inline-block font-mono text-[11px] tracking-[0.15em] uppercase px-5 py-2.5 bg-[#1a1a1a] text-[#f5f2ed] hover:bg-brand-orange transition-colors">
            Add to Chrome
          </a>
        </div>
        <div class="flex gap-6 font-mono text-[11px] text-[#1a1a1a]/30">
          <a href="#" class="hover:text-[#1a1a1a]/60 transition-colors">Ko-fi</a>
          <a href="#" class="hover:text-[#1a1a1a]/60 transition-colors">GitHub</a>
          <span>FOQUS</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'FOQUS — Not another blocker',
  meta: [
    { name: 'description', content: 'A Chrome extension that replaces guilt and restriction with intention and awareness.' },
  ],
})

const personas = [
  { title: 'The Student', quote: '"I need to finish my thesis but I keep ending up on Instagram."' },
  { title: 'The Professional', quote: '"My wife told me I might have a phone problem."' },
  { title: 'The Job Seeker', quote: '"I block one site and find three more to procrastinate on."' },
]

const features = [
  { name: 'Site intention lists', description: 'Curate your avoid list and positive alternatives.', live: true },
  { name: 'Personality-driven overlay', description: 'Beautiful 3D gradient with warm, witty messages.', live: true },
  { name: 'Graceful unblocking', description: 'Unblock for a set time. Data, not failure.', live: true },
  { name: 'Custom messages', description: 'Write your own overlay text.', live: true },
  { name: 'Dark mode', description: 'Full dark mode across popup and overlay.', live: true },
  { name: 'Reduced motion', description: 'Respects system accessibility preferences.', live: true },
  { name: 'Streak tracking', description: 'Track your intentions-kept streaks.', live: false },
  { name: 'Weekly reflections', description: 'Gentle insights on your browsing shifts.', live: false },
  { name: 'Trend lines', description: 'Visualize patterns over time.', live: false },
  { name: 'Data export', description: 'CSV and JSON. Your data is yours.', live: false },
]
</script>

<style>
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
</style>

<template>
  <div class="bg-[#f5f2ed] text-[#1a1a1a] antialiased min-h-screen">
    <!-- Nav -->
    <nav class="fixed top-0 inset-x-0 z-50 bg-[#f5f2ed]/90 backdrop-blur-sm border-b border-[#1a1a1a]/5">
      <div class="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
        <span class="font-mono font-bold text-base tracking-tight">FOQUS <span class="font-normal text-[#1a1a1a]/30">/ Font Tester</span></span>
        <NuxtLink to="/v2" class="font-mono text-[11px] tracking-[0.15em] uppercase text-[#1a1a1a]/40 hover:text-[#1a1a1a] transition-colors">
          &larr; Back
        </NuxtLink>
      </div>
    </nav>

    <div class="pt-28 pb-32 px-8 max-w-6xl mx-auto">
      <div class="mb-20">
        <p class="font-mono text-[11px] text-[#1a1a1a]/30 tracking-[0.15em] uppercase mb-4">Font Comparison</p>
        <p class="text-[#1a1a1a]/40 text-sm max-w-lg">Each section renders the same content in a different font. Only elements marked <code class="font-mono text-[10px] bg-[#1a1a1a]/5 px-1">MONO</code> use Noto Sans Mono.</p>
      </div>

      <div v-for="font in fonts" :key="font.name" :class="font.cls" class="mb-24 border-b border-[#1a1a1a]/5 pb-24 last:border-0">
        <!-- Font name rendered in its own font -->
        <div class="mb-12 flex items-baseline gap-4">
          <h2 class="text-5xl font-bold tracking-tight">{{ font.name }}</h2>
          <span class="font-mono text-[10px] text-[#1a1a1a]/25">{{ font.note }}</span>
        </div>

        <!-- Alphabet + weight sample -->
        <div class="mb-12 space-y-2">
          <p class="text-2xl tracking-tight font-normal text-[#1a1a1a]/80">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
          </p>
          <p class="text-2xl tracking-tight font-normal text-[#1a1a1a]/80">
            abcdefghijklmnopqrstuvwxyz 0123456789
          </p>
          <div class="flex gap-8 pt-2">
            <span class="text-lg font-normal text-[#1a1a1a]/40">Regular 400</span>
            <span class="text-lg font-medium text-[#1a1a1a]/50">Medium 500</span>
            <span class="text-lg font-semibold text-[#1a1a1a]/60">Semibold 600</span>
            <span class="text-lg font-bold text-[#1a1a1a]/80">Bold 700</span>
          </div>
        </div>

        <!-- Simulated Bauhaus page content -->
        <div class="grid md:grid-cols-12 gap-8">
          <div class="md:col-span-8">
            <h3 class="text-4xl sm:text-5xl font-bold tracking-tighter leading-[0.95] mb-4">
              NOT ANOTHER<br/><span class="text-[#F15A22]">BLOCKER.</span>
            </h3>
            <p class="text-base text-[#1a1a1a]/50 leading-relaxed max-w-md mb-6">
              A Chrome extension that replaces guilt and restriction with intention and awareness. Free, private, yours.
            </p>
            <a class="inline-block font-mono text-[11px] tracking-[0.15em] uppercase px-5 py-2.5 bg-[#1a1a1a] text-[#f5f2ed]">
              Add to Chrome
            </a>
          </div>
          <div class="md:col-span-4 flex flex-col justify-end gap-4 pb-2">
            <div>
              <span class="font-mono text-[11px] text-[#1a1a1a]/30 block mb-1">01</span>
              <span class="text-sm font-semibold">Intention-first</span>
            </div>
            <div>
              <span class="font-mono text-[11px] text-[#1a1a1a]/30 block mb-1">02</span>
              <span class="text-sm font-semibold">Privacy-first</span>
            </div>
            <div>
              <span class="font-mono text-[11px] text-[#1a1a1a]/30 block mb-1">03</span>
              <span class="text-sm font-semibold">No guilt</span>
            </div>
          </div>
        </div>

        <!-- Three pillars -->
        <div class="grid grid-cols-3 gap-px bg-[#1a1a1a]/10 mt-12">
          <div class="bg-[#f5f2ed] p-8">
            <span class="font-mono text-[11px] text-[#1a1a1a]/30 block mb-4">01</span>
            <h4 class="text-lg font-bold tracking-tight mb-2">Intention, not restriction</h4>
            <p class="text-[#1a1a1a]/40 text-sm leading-relaxed">
              You choose sites to be mindful about. When you visit one, Foqus asks why — it never says no.
            </p>
          </div>
          <div class="bg-[#f5f2ed] p-8">
            <span class="font-mono text-[11px] text-[#1a1a1a]/30 block mb-4">02</span>
            <h4 class="text-lg font-bold tracking-tight mb-2">Personality, not productivity</h4>
            <p class="text-[#1a1a1a]/40 text-sm leading-relaxed">
              The overlay speaks like a friend: "Come here often?" — warm, not clinical.
            </p>
          </div>
          <div class="bg-[#f5f2ed] p-8">
            <span class="font-mono text-[11px] text-[#1a1a1a]/30 block mb-4">03</span>
            <h4 class="text-lg font-bold tracking-tight mb-2">Privacy, not surveillance</h4>
            <p class="text-[#1a1a1a]/40 text-sm leading-relaxed">
              All data stays on your device. No accounts, no servers, no tracking. Period.
            </p>
          </div>
        </div>

        <!-- Dark section -->
        <div class="bg-[#1a1a1a] text-[#f5f2ed] p-10 mt-px">
          <h4 class="text-2xl font-bold tracking-tight mb-4">You tried blockers. You turned them off.</h4>
          <p class="text-[#f5f2ed]/40 text-sm max-w-lg leading-relaxed">
            That's not a failure — that's a design flaw. Brute-force blocking feels like punishment, so you find workarounds. The problem was never your willpower.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'FOQUS — Font Tester',
})

const fonts = [
  {
    name: 'Space Grotesk',
    cls: 'font-space-grotesk',
    note: 'Technical, monospace-influenced. Very Bauhaus.',
  },
  {
    name: 'DM Sans',
    cls: 'font-dm-sans',
    note: 'Geometric, warmer than Inter. Friendly + professional.',
  },
  {
    name: 'Sora',
    cls: 'font-sora',
    note: 'Precise geometry. Quiet confidence.',
  },
  {
    name: 'Outfit',
    cls: 'font-outfit',
    note: 'Wide, modern. Exhibition signage energy.',
  },
  {
    name: 'Manrope',
    cls: 'font-manrope',
    note: 'Geometric with personality. Good for long text.',
  },
]
</script>

<style>
.font-space-grotesk,
.font-space-grotesk h2,
.font-space-grotesk h3,
.font-space-grotesk h4,
.font-space-grotesk p,
.font-space-grotesk span:not(.font-mono),
.font-space-grotesk a:not(.font-mono) {
  font-family: 'Space Grotesk', sans-serif !important;
}

.font-dm-sans,
.font-dm-sans h2,
.font-dm-sans h3,
.font-dm-sans h4,
.font-dm-sans p,
.font-dm-sans span:not(.font-mono),
.font-dm-sans a:not(.font-mono) {
  font-family: 'DM Sans', sans-serif !important;
}

.font-sora,
.font-sora h2,
.font-sora h3,
.font-sora h4,
.font-sora p,
.font-sora span:not(.font-mono),
.font-sora a:not(.font-mono) {
  font-family: 'Sora', sans-serif !important;
}

.font-outfit,
.font-outfit h2,
.font-outfit h3,
.font-outfit h4,
.font-outfit p,
.font-outfit span:not(.font-mono),
.font-outfit a:not(.font-mono) {
  font-family: 'Outfit', sans-serif !important;
}

.font-manrope,
.font-manrope h2,
.font-manrope h3,
.font-manrope h4,
.font-manrope p,
.font-manrope span:not(.font-mono),
.font-manrope a:not(.font-mono) {
  font-family: 'Manrope', sans-serif !important;
}
</style>

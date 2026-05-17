<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
    <!-- Animated gradient background inspired by the overlay -->
    <div class="absolute inset-0 hero-gradient" aria-hidden="true">
      <div class="absolute inset-0 bg-gradient-to-br from-brand-orange via-brand-teal-dark to-brand-teal-darkest opacity-90" />
      <div class="absolute top-0 left-0 w-[60%] h-[60%] bg-brand-orange/60 rounded-full blur-[120px] animate-drift-1" />
      <div class="absolute bottom-0 right-0 w-[50%] h-[50%] bg-brand-teal/40 rounded-full blur-[100px] animate-drift-2" />
      <div class="absolute top-1/3 right-1/4 w-[40%] h-[40%] bg-brand-coral/30 rounded-full blur-[80px] animate-drift-3" />
      <!-- Grain overlay -->
      <div class="absolute inset-0 opacity-[0.06] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9IjEiLz48L3N2Zz4=')]" />
    </div>

    <div class="relative z-10 text-center px-6 max-w-3xl mx-auto">
      <p class="font-mono text-sm text-white/60 tracking-widest uppercase mb-6">// intention-first browsing</p>
      <h1 class="font-mono font-bold text-4xl sm:text-5xl md:text-6xl text-white leading-tight mb-6">
        Not another blocker.<br />
        <span class="text-brand-coral">A gentler way to browse.</span>
      </h1>
      <p class="text-lg sm:text-xl text-white/80 max-w-xl mx-auto mb-10 leading-relaxed">
        Take back your browsing habits — gently, without shame. Foqus asks why you're here, not "no."
      </p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href="#"
          class="inline-flex items-center gap-3 px-8 py-4 bg-white text-brand-teal-darkest font-mono font-semibold text-base rounded-full hover:bg-brand-linen transition-colors shadow-lg"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
          Add to Chrome — it's free
        </a>
        <a href="#how-it-works" class="text-white/70 font-mono text-sm hover:text-white transition-colors underline underline-offset-4">
          See how it works ↓
        </a>
      </div>
    </div>

    <!-- Scroll hint -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <svg class="w-6 h-6 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
      </svg>
    </div>
  </section>
</template>

<style scoped>
@keyframes drift-1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(5%, 8%) scale(1.05); }
  66% { transform: translate(-3%, 4%) scale(0.97); }
}
@keyframes drift-2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(-6%, -4%) scale(1.03); }
  66% { transform: translate(4%, -7%) scale(0.98); }
}
@keyframes drift-3 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(8%, -5%) scale(1.06); }
  66% { transform: translate(-5%, 6%) scale(0.95); }
}
.animate-drift-1 { animation: drift-1 12s ease-in-out infinite; }
.animate-drift-2 { animation: drift-2 15s ease-in-out infinite; }
.animate-drift-3 { animation: drift-3 10s ease-in-out infinite; }

@media (prefers-reduced-motion: reduce) {
  .animate-drift-1, .animate-drift-2, .animate-drift-3 {
    animation: none;
  }
}
</style>

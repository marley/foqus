<template>
  <div class="bg-[#f5f2ed] text-[#1a1a1a] font-sans antialiased">
    <!-- Nav -->
    <nav class="fixed top-0 inset-x-0 z-50 bg-[#f5f2ed]/90 backdrop-blur-sm border-b border-[#1a1a1a]/5">
      <div class="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
        <span class="font-mono font-bold text-base tracking-tight">FOQUS <span class="font-normal text-[#1a1a1a]/30">/ Design System</span></span>
        <NuxtLink to="/v2" class="font-mono text-[11px] tracking-[0.15em] uppercase text-[#1a1a1a]/40 hover:text-[#1a1a1a] transition-colors">
          &larr; Back to site
        </NuxtLink>
      </div>
    </nav>

    <div class="pt-28 pb-32 px-8 max-w-6xl mx-auto">

      <!-- Header -->
      <div class="mb-32">
        <p class="font-mono text-[11px] text-[#1a1a1a]/30 tracking-[0.15em] uppercase mb-4">Bauhaus Direction</p>
        <h1 class="text-5xl sm:text-7xl font-bold tracking-tighter leading-[0.95] mb-8">FOQUS<br/>DESIGN<br/>SYSTEM</h1>
        <p class="text-[#1a1a1a]/50 max-w-lg leading-relaxed">
          Visual language for the Foqus marketing site. Museum-like, typographic, Berlin-minimal. Inspired by the extension's overlay aesthetic but lighter and more inviting.
        </p>
      </div>

      <!-- ================================ -->
      <!-- 1. COLOR PALETTE -->
      <!-- ================================ -->
      <section class="mb-32">
        <p class="font-mono text-[11px] text-[#1a1a1a]/30 tracking-[0.15em] uppercase mb-8">01 — Color Palette</p>
        <h2 class="text-3xl font-bold tracking-tight mb-12">Colors</h2>

        <div class="mb-12">
          <h3 class="font-mono text-[11px] text-[#1a1a1a]/30 tracking-[0.15em] uppercase mb-4">Primary</h3>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <div class="h-28 bg-[#f5f2ed] border border-[#1a1a1a]/10 mb-3" />
              <span class="font-mono text-[11px]">Parchment</span><br/>
              <span class="font-mono text-[10px] text-[#1a1a1a]/30">#f5f2ed</span>
            </div>
            <div>
              <div class="h-28 bg-[#1a1a1a] mb-3" />
              <span class="font-mono text-[11px]">Ink</span><br/>
              <span class="font-mono text-[10px] text-[#1a1a1a]/30">#1a1a1a</span>
            </div>
            <div>
              <div class="h-28 bg-[#F15A22] mb-3" />
              <span class="font-mono text-[11px]">Flame</span><br/>
              <span class="font-mono text-[10px] text-[#1a1a1a]/30">#F15A22</span>
            </div>
            <div>
              <div class="h-28 bg-white border border-[#1a1a1a]/10 mb-3" />
              <span class="font-mono text-[11px]">White</span><br/>
              <span class="font-mono text-[10px] text-[#1a1a1a]/30">#ffffff</span>
            </div>
          </div>
        </div>

        <div class="mb-12">
          <h3 class="font-mono text-[11px] text-[#1a1a1a]/30 tracking-[0.15em] uppercase mb-4">Gradient Palette (for illustrations)</h3>
          <div class="grid grid-cols-3 sm:grid-cols-6 gap-4">
            <div>
              <div class="h-28 bg-[#F15A22] mb-3 rounded-sm" />
              <span class="font-mono text-[11px]">Flame</span><br/>
              <span class="font-mono text-[10px] text-[#1a1a1a]/30">#F15A22</span>
            </div>
            <div>
              <div class="h-28 bg-[#E8956A] mb-3 rounded-sm" />
              <span class="font-mono text-[11px]">Peach</span><br/>
              <span class="font-mono text-[10px] text-[#1a1a1a]/30">#E8956A</span>
            </div>
            <div>
              <div class="h-28 bg-[#2f6f64] mb-3 rounded-sm" />
              <span class="font-mono text-[11px]">Sage</span><br/>
              <span class="font-mono text-[10px] text-[#1a1a1a]/30">#2f6f64</span>
            </div>
            <div>
              <div class="h-28 bg-[#7BA69E] mb-3 rounded-sm" />
              <span class="font-mono text-[11px]">Seafoam</span><br/>
              <span class="font-mono text-[10px] text-[#1a1a1a]/30">#7BA69E</span>
            </div>
            <div>
              <div class="h-28 bg-[#C4A882] mb-3 rounded-sm" />
              <span class="font-mono text-[11px]">Sand</span><br/>
              <span class="font-mono text-[10px] text-[#1a1a1a]/30">#C4A882</span>
            </div>
            <div>
              <div class="h-28 bg-[#8B7355] mb-3 rounded-sm" />
              <span class="font-mono text-[11px]">Umber</span><br/>
              <span class="font-mono text-[10px] text-[#1a1a1a]/30">#8B7355</span>
            </div>
          </div>
        </div>

        <div>
          <h3 class="font-mono text-[11px] text-[#1a1a1a]/30 tracking-[0.15em] uppercase mb-4">Opacity Scale</h3>
          <div class="flex gap-4">
            <div v-for="o in [100, 60, 40, 20, 10, 5]" :key="o" class="text-center">
              <div class="w-16 h-16 mb-2" :style="{ background: `rgba(26,26,26,${o/100})` }" />
              <span class="font-mono text-[10px] text-[#1a1a1a]/30">{{ o }}%</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ================================ -->
      <!-- 2. TYPOGRAPHY -->
      <!-- ================================ -->
      <section class="mb-32">
        <p class="font-mono text-[11px] text-[#1a1a1a]/30 tracking-[0.15em] uppercase mb-8">02 — Typography</p>
        <h2 class="text-3xl font-bold tracking-tight mb-12">Type Scale</h2>

        <div class="space-y-8 mb-16">
          <div class="border-b border-[#1a1a1a]/5 pb-6">
            <span class="font-mono text-[10px] text-[#1a1a1a]/30 block mb-2">Display — Sora Bold, -0.04em</span>
            <p class="text-7xl font-bold tracking-tighter">Intention.</p>
          </div>
          <div class="border-b border-[#1a1a1a]/5 pb-6">
            <span class="font-mono text-[10px] text-[#1a1a1a]/30 block mb-2">H1 — Sora Bold, -0.03em</span>
            <p class="text-5xl font-bold tracking-tight">Not another blocker</p>
          </div>
          <div class="border-b border-[#1a1a1a]/5 pb-6">
            <span class="font-mono text-[10px] text-[#1a1a1a]/30 block mb-2">H2 — Sora Bold, -0.02em</span>
            <p class="text-3xl font-bold tracking-tight">Browse with awareness</p>
          </div>
          <div class="border-b border-[#1a1a1a]/5 pb-6">
            <span class="font-mono text-[10px] text-[#1a1a1a]/30 block mb-2">H3 — Sora Bold, -0.01em</span>
            <p class="text-xl font-bold tracking-tight">Privacy-first design</p>
          </div>
          <div class="border-b border-[#1a1a1a]/5 pb-6">
            <span class="font-mono text-[10px] text-[#1a1a1a]/30 block mb-2">Body — Sora Regular, 0em</span>
            <p class="text-sm text-[#1a1a1a]/50 leading-relaxed max-w-md">A Chrome extension that replaces guilt and restriction with intention and awareness. Free, private, yours.</p>
          </div>
          <div>
            <span class="font-mono text-[10px] text-[#1a1a1a]/30 block mb-2">Label — Noto Sans Mono, 0.15em tracking, uppercase</span>
            <p class="font-mono text-[11px] tracking-[0.15em] uppercase">Section Label</p>
          </div>
        </div>
      </section>

      <!-- ================================ -->
      <!-- 3. FLOATING GRADIENTS -->
      <!-- ================================ -->
      <section class="mb-32">
        <p class="font-mono text-[11px] text-[#1a1a1a]/30 tracking-[0.15em] uppercase mb-8">03 — Floating Gradients</p>
        <h2 class="text-3xl font-bold tracking-tight mb-4">Ambient Blurs</h2>
        <p class="text-[#1a1a1a]/40 text-sm max-w-lg mb-12 leading-relaxed">
          Soft, oversized gradient blobs that float behind content. Inspired by the extension's Three.js overlay but gentler — they add warmth without dominance. Used sparingly as section accents.
        </p>

        <!-- Gradient A: Warm (hero) -->
        <div class="mb-8">
          <span class="font-mono text-[10px] text-[#1a1a1a]/30 block mb-4">A — Warm Drift (Hero, CTA sections)</span>
          <div class="relative h-80 bg-[#f5f2ed] overflow-hidden border border-[#1a1a1a]/5">
            <div class="absolute top-[-20%] right-[-10%] w-[50%] h-[80%] bg-[#F15A22]/15 rounded-full blur-[80px] animate-float-slow" />
            <div class="absolute bottom-[-10%] left-[-5%] w-[40%] h-[70%] bg-[#E8956A]/12 rounded-full blur-[60px] animate-float-medium" />
            <div class="absolute top-[20%] left-[30%] w-[30%] h-[50%] bg-[#C4A882]/10 rounded-full blur-[50px] animate-float-fast" />
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="font-mono text-[11px] text-[#1a1a1a]/20">Flame + Peach + Sand</span>
            </div>
          </div>
        </div>

        <!-- Gradient B: Cool (middle sections) -->
        <div class="mb-8">
          <span class="font-mono text-[10px] text-[#1a1a1a]/30 block mb-4">B — Cool Drift (Features, Privacy sections)</span>
          <div class="relative h-80 bg-[#f5f2ed] overflow-hidden border border-[#1a1a1a]/5">
            <div class="absolute top-[-10%] left-[-10%] w-[45%] h-[70%] bg-[#2f6f64]/12 rounded-full blur-[80px] animate-float-medium" />
            <div class="absolute bottom-[-15%] right-[-5%] w-[50%] h-[80%] bg-[#7BA69E]/10 rounded-full blur-[70px] animate-float-slow" />
            <div class="absolute top-[30%] right-[20%] w-[25%] h-[40%] bg-[#C4A882]/8 rounded-full blur-[50px] animate-float-fast" />
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="font-mono text-[11px] text-[#1a1a1a]/20">Sage + Seafoam + Sand</span>
            </div>
          </div>
        </div>

        <!-- Gradient C: Mixed (dark sections) -->
        <div class="mb-8">
          <span class="font-mono text-[10px] text-[#1a1a1a]/30 block mb-4">C — Night Drift (Dark contrast sections)</span>
          <div class="relative h-80 bg-[#1a1a1a] overflow-hidden border border-[#1a1a1a]/5">
            <div class="absolute top-[-15%] right-[10%] w-[45%] h-[70%] bg-[#F15A22]/10 rounded-full blur-[80px] animate-float-slow" />
            <div class="absolute bottom-[-10%] left-[5%] w-[40%] h-[60%] bg-[#2f6f64]/12 rounded-full blur-[70px] animate-float-medium" />
            <div class="absolute top-[40%] left-[40%] w-[20%] h-[30%] bg-[#7BA69E]/8 rounded-full blur-[40px] animate-float-fast" />
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="font-mono text-[11px] text-white/20">Flame + Sage on Ink</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ================================ -->
      <!-- 4. SVG ILLUSTRATIONS -->
      <!-- ================================ -->
      <section class="mb-32">
        <p class="font-mono text-[11px] text-[#1a1a1a]/30 tracking-[0.15em] uppercase mb-8">04 — Illustrations</p>
        <h2 class="text-3xl font-bold tracking-tight mb-4">Geometric Figures</h2>
        <p class="text-[#1a1a1a]/40 text-sm max-w-lg mb-12 leading-relaxed">
          Bauhaus-inspired SVG illustrations. Abstract, geometric, using the gradient palette. Each maps to a concept in the product.
        </p>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Illustration: Intention (concentric circles) -->
          <div class="bg-white p-8 border border-[#1a1a1a]/5">
            <div class="aspect-square flex items-center justify-center mb-6">
              <svg viewBox="0 0 200 200" class="w-full h-full">
                <circle cx="100" cy="100" r="90" fill="none" stroke="#E8956A" stroke-width="1" opacity="0.3" />
                <circle cx="100" cy="100" r="65" fill="none" stroke="#F15A22" stroke-width="1" opacity="0.4" />
                <circle cx="100" cy="100" r="40" fill="none" stroke="#F15A22" stroke-width="1.5" opacity="0.6" />
                <circle cx="100" cy="100" r="15" fill="#F15A22" opacity="0.8" />
                <line x1="100" y1="10" x2="100" y2="40" stroke="#1a1a1a" stroke-width="0.5" opacity="0.1" />
                <line x1="100" y1="160" x2="100" y2="190" stroke="#1a1a1a" stroke-width="0.5" opacity="0.1" />
                <line x1="10" y1="100" x2="40" y2="100" stroke="#1a1a1a" stroke-width="0.5" opacity="0.1" />
                <line x1="160" y1="100" x2="190" y2="100" stroke="#1a1a1a" stroke-width="0.5" opacity="0.1" />
              </svg>
            </div>
            <span class="font-mono text-[11px] text-[#1a1a1a]/40 block">Intention</span>
            <span class="text-[10px] text-[#1a1a1a]/25">Focus radiating inward. Used in hero or "how different" section.</span>
          </div>

          <!-- Illustration: Nudge (offset circles) -->
          <div class="bg-white p-8 border border-[#1a1a1a]/5">
            <div class="aspect-square flex items-center justify-center mb-6">
              <svg viewBox="0 0 200 200" class="w-full h-full">
                <circle cx="80" cy="100" r="50" fill="#2f6f64" opacity="0.08" />
                <circle cx="120" cy="100" r="50" fill="#F15A22" opacity="0.1" />
                <circle cx="80" cy="100" r="50" fill="none" stroke="#2f6f64" stroke-width="1" opacity="0.3" />
                <circle cx="120" cy="100" r="50" fill="none" stroke="#F15A22" stroke-width="1" opacity="0.3" />
                <line x1="100" y1="55" x2="100" y2="145" stroke="#1a1a1a" stroke-width="0.5" stroke-dasharray="2,4" opacity="0.15" />
                <circle cx="100" cy="100" r="3" fill="#1a1a1a" opacity="0.3" />
              </svg>
            </div>
            <span class="font-mono text-[11px] text-[#1a1a1a]/40 block">Nudge</span>
            <span class="text-[10px] text-[#1a1a1a]/25">Gentle overlap — awareness meets habit. Used in "how it works."</span>
          </div>

          <!-- Illustration: Shield (privacy) -->
          <div class="bg-white p-8 border border-[#1a1a1a]/5">
            <div class="aspect-square flex items-center justify-center mb-6">
              <svg viewBox="0 0 200 200" class="w-full h-full">
                <path d="M100 30 L160 65 L160 110 Q160 160 100 180 Q40 160 40 110 L40 65 Z" fill="#2f6f64" opacity="0.06" />
                <path d="M100 30 L160 65 L160 110 Q160 160 100 180 Q40 160 40 110 L40 65 Z" fill="none" stroke="#2f6f64" stroke-width="1" opacity="0.3" />
                <path d="M100 55 L140 78 L140 108 Q140 145 100 160 Q60 145 60 108 L60 78 Z" fill="none" stroke="#2f6f64" stroke-width="0.5" opacity="0.15" />
                <circle cx="100" cy="110" r="15" fill="none" stroke="#2f6f64" stroke-width="1" opacity="0.4" />
                <circle cx="100" cy="110" r="5" fill="#2f6f64" opacity="0.5" />
              </svg>
            </div>
            <span class="font-mono text-[11px] text-[#1a1a1a]/40 block">Privacy</span>
            <span class="text-[10px] text-[#1a1a1a]/25">Shield with inner focus. Used in trust/privacy section.</span>
          </div>

          <!-- Illustration: Flow (three steps) -->
          <div class="bg-white p-8 border border-[#1a1a1a]/5">
            <div class="aspect-square flex items-center justify-center mb-6">
              <svg viewBox="0 0 200 200" class="w-full h-full">
                <circle cx="40" cy="100" r="20" fill="#C4A882" opacity="0.15" />
                <circle cx="40" cy="100" r="20" fill="none" stroke="#C4A882" stroke-width="1" opacity="0.4" />
                <circle cx="100" cy="100" r="20" fill="#F15A22" opacity="0.1" />
                <circle cx="100" cy="100" r="20" fill="none" stroke="#F15A22" stroke-width="1" opacity="0.4" />
                <circle cx="160" cy="100" r="20" fill="#2f6f64" opacity="0.1" />
                <circle cx="160" cy="100" r="20" fill="none" stroke="#2f6f64" stroke-width="1" opacity="0.4" />
                <line x1="60" y1="100" x2="80" y2="100" stroke="#1a1a1a" stroke-width="0.5" opacity="0.15" />
                <line x1="120" y1="100" x2="140" y2="100" stroke="#1a1a1a" stroke-width="0.5" opacity="0.15" />
                <polygon points="80,97 80,103 85,100" fill="#1a1a1a" opacity="0.15" />
                <polygon points="140,97 140,103 145,100" fill="#1a1a1a" opacity="0.15" />
                <text x="40" y="104" text-anchor="middle" font-family="monospace" font-size="10" fill="#1a1a1a" opacity="0.4">1</text>
                <text x="100" y="104" text-anchor="middle" font-family="monospace" font-size="10" fill="#1a1a1a" opacity="0.4">2</text>
                <text x="160" y="104" text-anchor="middle" font-family="monospace" font-size="10" fill="#1a1a1a" opacity="0.4">3</text>
              </svg>
            </div>
            <span class="font-mono text-[11px] text-[#1a1a1a]/40 block">Flow</span>
            <span class="text-[10px] text-[#1a1a1a]/25">Three-step process. Used in "how it works" section.</span>
          </div>

          <!-- Illustration: Personality (smiley abstract) -->
          <div class="bg-white p-8 border border-[#1a1a1a]/5">
            <div class="aspect-square flex items-center justify-center mb-6">
              <svg viewBox="0 0 200 200" class="w-full h-full">
                <rect x="30" y="30" width="140" height="140" rx="70" fill="#F15A22" opacity="0.04" />
                <rect x="30" y="30" width="140" height="140" rx="70" fill="none" stroke="#F15A22" stroke-width="1" opacity="0.2" />
                <circle cx="78" cy="90" r="6" fill="#1a1a1a" opacity="0.2" />
                <circle cx="122" cy="90" r="6" fill="#1a1a1a" opacity="0.2" />
                <path d="M75 118 Q100 140 125 118" fill="none" stroke="#F15A22" stroke-width="2" opacity="0.3" stroke-linecap="round" />
              </svg>
            </div>
            <span class="font-mono text-[11px] text-[#1a1a1a]/40 block">Personality</span>
            <span class="text-[10px] text-[#1a1a1a]/25">Friendly face. Used in "personality, not productivity" pillar.</span>
          </div>

          <!-- Illustration: Grid (features) -->
          <div class="bg-white p-8 border border-[#1a1a1a]/5">
            <div class="aspect-square flex items-center justify-center mb-6">
              <svg viewBox="0 0 200 200" class="w-full h-full">
                <rect x="30" y="30" width="55" height="55" fill="#F15A22" fill-opacity="0.1" stroke="#F15A22" stroke-width="0.5" stroke-opacity="0.2" />
                <rect x="95" y="30" width="55" height="55" fill="#2f6f64" fill-opacity="0.08" stroke="#2f6f64" stroke-width="0.5" stroke-opacity="0.2" />
                <rect x="30" y="95" width="55" height="55" fill="#C4A882" fill-opacity="0.1" stroke="#C4A882" stroke-width="0.5" stroke-opacity="0.2" />
                <rect x="95" y="95" width="55" height="55" fill="#1a1a1a" fill-opacity="0.03" stroke="#1a1a1a" stroke-width="0.5" stroke-opacity="0.1" />
                <rect x="160" y="30" width="20" height="120" fill="#7BA69E" fill-opacity="0.06" stroke="#7BA69E" stroke-width="0.5" stroke-opacity="0.15" />
                <line x1="30" y1="160" x2="180" y2="160" stroke="#1a1a1a" stroke-width="0.5" opacity="0.1" />
                <circle cx="45" cy="170" r="3" fill="#F15A22" opacity="0.4" />
                <circle cx="60" cy="170" r="3" fill="#2f6f64" opacity="0.3" />
                <circle cx="75" cy="170" r="3" fill="#C4A882" opacity="0.3" />
              </svg>
            </div>
            <span class="font-mono text-[11px] text-[#1a1a1a]/40 block">Features</span>
            <span class="text-[10px] text-[#1a1a1a]/25">Modular grid. Used in features section layout.</span>
          </div>
        </div>
      </section>

      <!-- ================================ -->
      <!-- 5. COMPONENTS -->
      <!-- ================================ -->
      <section class="mb-32">
        <p class="font-mono text-[11px] text-[#1a1a1a]/30 tracking-[0.15em] uppercase mb-8">05 — Components</p>
        <h2 class="text-3xl font-bold tracking-tight mb-12">UI Kit</h2>

        <!-- Buttons -->
        <div class="mb-16">
          <h3 class="font-mono text-[11px] text-[#1a1a1a]/30 tracking-[0.15em] uppercase mb-6">Buttons</h3>
          <div class="flex flex-wrap gap-4 items-center">
            <a class="font-mono text-[11px] tracking-[0.15em] uppercase px-5 py-2.5 bg-[#1a1a1a] text-[#f5f2ed] hover:bg-[#F15A22] transition-colors cursor-pointer">Primary CTA</a>
            <a class="font-mono text-[11px] tracking-[0.15em] uppercase px-5 py-2.5 border border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#f5f2ed] transition-colors cursor-pointer">Secondary</a>
            <a class="font-mono text-[11px] tracking-[0.15em] uppercase text-[#1a1a1a]/40 hover:text-[#1a1a1a] transition-colors cursor-pointer underline underline-offset-4">Text Link</a>
          </div>
        </div>

        <!-- Section Labels -->
        <div class="mb-16">
          <h3 class="font-mono text-[11px] text-[#1a1a1a]/30 tracking-[0.15em] uppercase mb-6">Section Labels</h3>
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <span class="font-mono text-[11px] tracking-[0.15em] uppercase text-[#1a1a1a]/30">The Problem</span>
              <span class="text-[10px] text-[#1a1a1a]/20">— Left-aligned, always uppercase mono</span>
            </div>
            <div class="flex items-center gap-4">
              <span class="font-mono text-5xl font-bold text-[#1a1a1a]/10">01</span>
              <span class="text-[10px] text-[#1a1a1a]/20">— Large number, 10% opacity, paired with content</span>
            </div>
          </div>
        </div>

        <!-- Cards -->
        <div class="mb-16">
          <h3 class="font-mono text-[11px] text-[#1a1a1a]/30 tracking-[0.15em] uppercase mb-6">Cards</h3>
          <div class="grid sm:grid-cols-3 gap-px bg-[#1a1a1a]/10">
            <div class="bg-[#f5f2ed] p-8">
              <span class="font-mono text-[11px] text-[#1a1a1a]/30 block mb-4">01</span>
              <h4 class="text-lg font-bold tracking-tight mb-2">Grid Card</h4>
              <p class="text-[#1a1a1a]/40 text-sm leading-relaxed">Separated by 1px borders. No rounded corners. Bauhaus grid.</p>
            </div>
            <div class="bg-[#f5f2ed] p-8">
              <span class="font-mono text-[11px] text-[#1a1a1a]/30 block mb-4">02</span>
              <h4 class="text-lg font-bold tracking-tight mb-2">Grid Card</h4>
              <p class="text-[#1a1a1a]/40 text-sm leading-relaxed">Equal padding, consistent type scale. Content-first.</p>
            </div>
            <div class="bg-[#f5f2ed] p-8">
              <span class="font-mono text-[11px] text-[#1a1a1a]/30 block mb-4">03</span>
              <h4 class="text-lg font-bold tracking-tight mb-2">Grid Card</h4>
              <p class="text-[#1a1a1a]/40 text-sm leading-relaxed">Sharp edges, generous whitespace. Let content breathe.</p>
            </div>
          </div>
        </div>

        <!-- Dark section -->
        <div class="mb-16">
          <h3 class="font-mono text-[11px] text-[#1a1a1a]/30 tracking-[0.15em] uppercase mb-6">Dark Contrast Section</h3>
          <div class="bg-[#1a1a1a] text-[#f5f2ed] p-12 relative overflow-hidden">
            <div class="absolute top-[-20%] right-[-10%] w-[40%] h-[80%] bg-[#F15A22]/8 rounded-full blur-[60px]" />
            <div class="absolute bottom-[-15%] left-[5%] w-[30%] h-[60%] bg-[#2f6f64]/8 rounded-full blur-[50px]" />
            <div class="relative">
              <span class="font-mono text-[11px] tracking-[0.15em] uppercase text-[#f5f2ed]/30 block mb-4">Dark Section</span>
              <h4 class="text-2xl font-bold tracking-tight mb-3">Ink background with floating gradients</h4>
              <p class="text-[#f5f2ed]/40 text-sm max-w-md leading-relaxed">Used for "problem" and "persona" sections. Subtle gradient blobs add depth without overpowering.</p>
            </div>
          </div>
        </div>

        <!-- Comparison table -->
        <div class="mb-16">
          <h3 class="font-mono text-[11px] text-[#1a1a1a]/30 tracking-[0.15em] uppercase mb-6">Table</h3>
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-[#1a1a1a]/10">
                <th class="text-left font-normal text-[#1a1a1a]/30 py-3 font-mono text-[11px]">Feature</th>
                <th class="text-center font-mono text-[11px] py-3 text-[#F15A22]">Foqus</th>
                <th class="text-center font-mono text-[11px] py-3 text-[#1a1a1a]/20">Other</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-[#1a1a1a]/5">
                <td class="py-3 text-[#1a1a1a]/60">Intention-first</td>
                <td class="py-3 text-center">&#10003;</td>
                <td class="py-3 text-center text-[#1a1a1a]/20">&#10005;</td>
              </tr>
              <tr class="border-b border-[#1a1a1a]/5">
                <td class="py-3 text-[#1a1a1a]/60">Privacy-first</td>
                <td class="py-3 text-center">&#10003;</td>
                <td class="py-3 text-center text-[#1a1a1a]/20">&#10005;</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Badge -->
        <div class="mb-16">
          <h3 class="font-mono text-[11px] text-[#1a1a1a]/30 tracking-[0.15em] uppercase mb-6">Badges</h3>
          <div class="flex gap-4">
            <span class="font-mono text-[9px] text-[#1a1a1a]/30 tracking-wider uppercase border border-[#1a1a1a]/10 px-2 py-1">Soon</span>
            <span class="font-mono text-[9px] text-[#F15A22] tracking-wider uppercase border border-[#F15A22]/20 px-2 py-1">Live</span>
            <span class="font-mono text-[9px] text-[#2f6f64] tracking-wider uppercase border border-[#2f6f64]/20 px-2 py-1">Free</span>
          </div>
        </div>
      </section>

      <!-- ================================ -->
      <!-- 6. LAYOUT -->
      <!-- ================================ -->
      <section class="mb-32">
        <p class="font-mono text-[11px] text-[#1a1a1a]/30 tracking-[0.15em] uppercase mb-8">06 — Layout</p>
        <h2 class="text-3xl font-bold tracking-tight mb-12">Grid & Spacing</h2>

        <div class="space-y-8">
          <div>
            <span class="font-mono text-[10px] text-[#1a1a1a]/30 block mb-3">12-column grid, 4/8 split for editorial layout</span>
            <div class="grid grid-cols-12 gap-px h-16">
              <div v-for="i in 12" :key="i" class="bg-[#F15A22]/5 flex items-center justify-center">
                <span class="font-mono text-[9px] text-[#1a1a1a]/15">{{ i }}</span>
              </div>
            </div>
          </div>

          <div>
            <span class="font-mono text-[10px] text-[#1a1a1a]/30 block mb-3">Section padding: py-32 (128px) between sections</span>
            <div class="flex items-center gap-4">
              <div class="h-8 bg-[#1a1a1a]/5 flex-1" />
              <span class="font-mono text-[10px] text-[#1a1a1a]/20 shrink-0">128px</span>
              <div class="h-8 bg-[#1a1a1a]/5 flex-1" />
            </div>
          </div>

          <div>
            <span class="font-mono text-[10px] text-[#1a1a1a]/30 block mb-3">Max content width: 1152px (max-w-6xl)</span>
            <div class="h-8 bg-[#1a1a1a]/5 max-w-6xl mx-auto flex items-center justify-center">
              <span class="font-mono text-[9px] text-[#1a1a1a]/20">1152px</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ================================ -->
      <!-- 7. SECTION MAP -->
      <!-- ================================ -->
      <section class="mb-32">
        <p class="font-mono text-[11px] text-[#1a1a1a]/30 tracking-[0.15em] uppercase mb-8">07 — Section Map</p>
        <h2 class="text-3xl font-bold tracking-tight mb-12">Page Structure</h2>

        <div class="space-y-4">
          <div v-for="s in sections" :key="s.name" class="flex gap-6 py-4 border-b border-[#1a1a1a]/5">
            <span class="font-mono text-[11px] text-[#1a1a1a]/20 shrink-0 w-8">{{ s.num }}</span>
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-1">
                <span class="font-bold text-sm">{{ s.name }}</span>
                <span :class="['font-mono text-[9px] px-2 py-0.5 border', s.bg === 'dark' ? 'border-[#1a1a1a] bg-[#1a1a1a] text-[#f5f2ed]' : 'border-[#1a1a1a]/10']">
                  {{ s.bg }}
                </span>
                <span v-if="s.gradient" class="font-mono text-[9px] px-2 py-0.5 border border-[#F15A22]/20 text-[#F15A22]">+ gradient</span>
                <span v-if="s.illustration" class="font-mono text-[9px] px-2 py-0.5 border border-[#2f6f64]/20 text-[#2f6f64]">+ illustration</span>
              </div>
              <span class="text-[#1a1a1a]/40 text-sm">{{ s.layout }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ================================ -->
      <!-- 8. PRINCIPLES -->
      <!-- ================================ -->
      <section>
        <p class="font-mono text-[11px] text-[#1a1a1a]/30 tracking-[0.15em] uppercase mb-8">08 — Principles</p>
        <h2 class="text-3xl font-bold tracking-tight mb-12">Design Rules</h2>

        <div class="grid sm:grid-cols-2 gap-12 max-w-3xl">
          <div>
            <h3 class="font-bold text-sm mb-2">Type does the work</h3>
            <p class="text-[#1a1a1a]/40 text-sm leading-relaxed">Bold headlines and generous whitespace create hierarchy. No decoration needed — scale and weight are the tools.</p>
          </div>
          <div>
            <h3 class="font-bold text-sm mb-2">Gradients whisper</h3>
            <p class="text-[#1a1a1a]/40 text-sm leading-relaxed">Floating blurs at 8-15% opacity. Never competing with text. Warmth in the periphery, clarity at center.</p>
          </div>
          <div>
            <h3 class="font-bold text-sm mb-2">Sharp edges</h3>
            <p class="text-[#1a1a1a]/40 text-sm leading-relaxed">No border-radius on cards. 1px borders or gap-px grids. The geometry is the aesthetic.</p>
          </div>
          <div>
            <h3 class="font-bold text-sm mb-2">4/8 editorial grid</h3>
            <p class="text-[#1a1a1a]/40 text-sm leading-relaxed">Labels in the left 4 columns, content in the right 8. Creates a consistent reading rhythm across sections.</p>
          </div>
          <div>
            <h3 class="font-bold text-sm mb-2">Ink + Parchment</h3>
            <p class="text-[#1a1a1a]/40 text-sm leading-relaxed">Alternate between light and dark sections. Dark sections get subtle gradient blobs. Light sections stay clean.</p>
          </div>
          <div>
            <h3 class="font-bold text-sm mb-2">Illustrations earn their place</h3>
            <p class="text-[#1a1a1a]/40 text-sm leading-relaxed">Each SVG maps to a product concept. Abstract enough to be Bauhaus, specific enough to communicate.</p>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'FOQUS — Design System (Bauhaus)',
})

const sections = [
  { num: '01', name: 'Hero', bg: 'parchment', gradient: true, illustration: true, layout: 'Full bleed. 8/4 split — bold headline left, description + CTA right. Warm Drift gradient.' },
  { num: '02', name: 'Problem', bg: 'dark', gradient: true, illustration: false, layout: '4/8 split — label left, headline + body right. Night Drift gradient.' },
  { num: '03', name: 'Three Pillars', bg: 'parchment', gradient: false, illustration: true, layout: '3-column grid with 1px gap. Each card gets a geometric illustration.' },
  { num: '04', name: 'How It Works', bg: 'parchment', gradient: false, illustration: true, layout: '4/8 split — label left, three steps right. Flow illustration.' },
  { num: '05', name: 'Personas', bg: 'dark', gradient: true, illustration: false, layout: '4/8 split — label left, persona list right. Night Drift gradient.' },
  { num: '06', name: 'Features', bg: 'parchment', gradient: true, illustration: false, layout: '4/8 split — label left, 2-column feature grid right. Cool Drift gradient.' },
  { num: '07', name: 'Pricing', bg: 'parchment', gradient: false, illustration: false, layout: '4/8 split — label left, price cards right. Clean, no decoration.' },
  { num: '08', name: 'Privacy', bg: 'parchment', gradient: false, illustration: true, layout: '4/8 split — label left, 2-column facts right. Shield illustration.' },
  { num: '09', name: 'Comparison', bg: 'parchment', gradient: false, illustration: false, layout: 'Full-width table. Minimal borders.' },
  { num: '10', name: 'Footer', bg: 'parchment', gradient: false, illustration: false, layout: 'Bold CTA headline + install button. Links bottom-right.' },
]
</script>

<style scoped>
@keyframes float-slow {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(3%, 5%) scale(1.02); }
}
@keyframes float-medium {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-4%, 3%) scale(1.03); }
}
@keyframes float-fast {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(5%, -3%) scale(1.01); }
}
.animate-float-slow { animation: float-slow 20s ease-in-out infinite; }
.animate-float-medium { animation: float-medium 15s ease-in-out infinite; }
.animate-float-fast { animation: float-fast 12s ease-in-out infinite; }

@media (prefers-reduced-motion: reduce) {
  .animate-float-slow, .animate-float-medium, .animate-float-fast { animation: none; }
}
</style>

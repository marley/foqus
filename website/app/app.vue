<template>
  <div class="bg-brand-parchment dark:bg-dark-bg text-brand-teal-darkest dark:text-dark-text font-sans antialiased">
    <SiteNav />
    <SiteHero />
    <TheProblem />
    <HowDifferent />
    <HowItWorks />
    <WhoItsFor />
    <Features />
    <Pricing />
    <TrustPrivacy />
    <CompetitorComparison />
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'scroll-smooth',
  },
})
</script>

<style>
html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
</style>

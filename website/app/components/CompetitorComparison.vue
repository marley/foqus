<template>
  <section class="py-24 sm:py-32 px-6 bg-brand-linen dark:bg-dark-card">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <p class="font-mono text-sm text-brand-orange tracking-widest uppercase mb-4">// the landscape</p>
        <h2 class="font-mono font-bold text-3xl sm:text-4xl mb-4">How Foqus compares</h2>
        <p class="text-brand-teal dark:text-dark-muted">Honest look at what's out there.</p>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-brand-teal/10 dark:border-dark-muted/20">
              <th class="text-left font-mono font-semibold py-4 pr-4" />
              <th class="text-center font-mono font-semibold py-4 px-4 text-brand-orange">Foqus</th>
              <th class="text-center font-mono font-semibold py-4 px-4 text-brand-teal/50 dark:text-dark-muted/50">BlockSite</th>
              <th class="text-center font-mono font-semibold py-4 px-4 text-brand-teal/50 dark:text-dark-muted/50">Cold Turkey</th>
              <th class="text-center font-mono font-semibold py-4 px-4 text-brand-teal/50 dark:text-dark-muted/50">Freedom</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in rows" :key="row.feature" class="border-b border-brand-teal/5 dark:border-dark-muted/10">
              <td class="py-3 pr-4 font-medium">{{ row.feature }}</td>
              <td class="py-3 px-4 text-center">
                <span v-if="row.foqus === true" class="text-brand-teal text-lg">&#10003;</span>
                <span v-else-if="row.foqus === false" class="text-brand-teal/20 text-lg">&#10005;</span>
                <span v-else class="font-mono text-xs">{{ row.foqus }}</span>
              </td>
              <td class="py-3 px-4 text-center text-brand-teal/40 dark:text-dark-muted/40">
                <span v-if="row.blocksite === true" class="text-lg">&#10003;</span>
                <span v-else-if="row.blocksite === false" class="text-lg">&#10005;</span>
                <span v-else class="font-mono text-xs">{{ row.blocksite }}</span>
              </td>
              <td class="py-3 px-4 text-center text-brand-teal/40 dark:text-dark-muted/40">
                <span v-if="row.coldturkey === true" class="text-lg">&#10003;</span>
                <span v-else-if="row.coldturkey === false" class="text-lg">&#10005;</span>
                <span v-else class="font-mono text-xs">{{ row.coldturkey }}</span>
              </td>
              <td class="py-3 px-4 text-center text-brand-teal/40 dark:text-dark-muted/40">
                <span v-if="row.freedom === true" class="text-lg">&#10003;</span>
                <span v-else-if="row.freedom === false" class="text-lg">&#10005;</span>
                <span v-else class="font-mono text-xs">{{ row.freedom }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const rows = [
  { feature: 'Intention-first approach', foqus: true, blocksite: false, coldturkey: false, freedom: false },
  { feature: 'Personality-driven UI', foqus: true, blocksite: false, coldturkey: false, freedom: false },
  { feature: 'Privacy-first (no data collection)', foqus: true, blocksite: false, coldturkey: true, freedom: false },
  { feature: 'No account required', foqus: true, blocksite: false, coldturkey: true, freedom: false },
  { feature: 'Graceful unblocking', foqus: true, blocksite: false, coldturkey: false, freedom: false },
  { feature: 'Positive alternatives', foqus: true, blocksite: false, coldturkey: false, freedom: false },
  { feature: 'Free core experience', foqus: true, blocksite: 'Freemium', coldturkey: 'Freemium', freedom: '$8.99/mo' },
  { feature: 'Shame-free design', foqus: true, blocksite: false, coldturkey: false, freedom: false },
]
</script>

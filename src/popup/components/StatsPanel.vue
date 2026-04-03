<script setup>
import { useStats } from '../../composables/useStats'

const { stats } = useStats()

function streakLabel(n) {
  if (n === 1) return 'day streak'
  return 'days streak'
}
</script>

<template>
  <div
    class="popup-stats"
    role="region"
    aria-label="Your progress"
    aria-live="polite"
    aria-atomic="true"
  >
    <p class="popup-stats-strip">
      <span class="popup-stats-item">
        <span class="popup-stats-num popup-stats-num--accent">{{ stats.streak }}</span>
        <span class="popup-stats-unit"> {{ streakLabel(stats.streak) }}</span>
      </span>
      <span class="popup-stats-sep" aria-hidden="true">·</span>
      <span class="popup-stats-item">
        <span class="popup-stats-num popup-stats-num--positive">{{ stats.intentionsKept }}</span>
        <span class="popup-stats-unit"> kept</span>
      </span>
      <span class="popup-stats-sep" aria-hidden="true">·</span>
      <span class="popup-stats-item">
        <span class="popup-stats-num">{{ stats.keptToday }}</span>
        <span class="popup-stats-unit"> today</span>
      </span>
    </p>
    <p
      v-if="stats.weeklyTrend && stats.weeklyTrend.change < 0"
      class="popup-stats-trend popup-stats-trend--positive"
    >
      You unblocked {{ Math.abs(stats.weeklyTrend.change) }}% less than last week
    </p>
    <p
      v-else-if="stats.weeklyTrend && stats.weeklyTrend.change === 0"
      class="popup-stats-trend"
    >
      Same unblock rate as last week — holding steady
    </p>
  </div>
</template>

<style scoped>
.popup-stats {
  margin: 0;
  padding: 8px 14px 10px;
  background: transparent;
}

.popup-stats-strip {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: center;
  column-gap: 6px;
  row-gap: 2px;
  font-size: 13px;
  line-height: 1.35;
  text-align: center;
}

.popup-stats-item {
  display: inline-flex;
  align-items: baseline;
  white-space: nowrap;
}

.popup-stats-num {
  font-weight: 700;
  font-size: 15px;
  font-variant-numeric: tabular-nums;
  color: var(--foqus-text);
}

.popup-stats-num--accent {
  color: var(--foqus-accent);
}

.popup-stats-num--positive {
  color: var(--foqus-positive);
}

.popup-stats-unit {
  font-weight: 500;
  color: var(--foqus-text-secondary);
}

.popup-stats-sep {
  color: var(--foqus-text-muted);
  font-weight: 400;
  user-select: none;
}

.popup-stats-trend {
  margin: 6px 0 0 0;
  font-size: 11px;
  line-height: 1.4;
  color: var(--foqus-text-muted);
  text-align: center;
}

.popup-stats-trend--positive {
  color: var(--foqus-positive);
}
</style>

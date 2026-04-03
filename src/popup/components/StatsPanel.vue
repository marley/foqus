<script setup>
import { useStats } from '../../composables/useStats'

const { stats } = useStats()
</script>

<template>
  <div class="popup-stats">
    <div class="popup-stats-grid">
      <div class="popup-stat">
        <span class="popup-stat-value popup-stat-value--streak">{{ stats.streak }}</span>
        <span class="popup-stat-label">day streak</span>
      </div>
      <div class="popup-stat">
        <span class="popup-stat-value popup-stat-value--kept">{{ stats.intentionsKept }}</span>
        <span class="popup-stat-label">intentions kept</span>
      </div>
      <div class="popup-stat">
        <span class="popup-stat-value">{{ stats.keptToday }}</span>
        <span class="popup-stat-label">kept today</span>
      </div>
    </div>
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
  padding: 12px 16px;
  border-top: 1px solid var(--foqus-border);
  background: var(--foqus-card);
}

.popup-stats-grid {
  display: flex;
  gap: 0;
}

.popup-stat {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 4px 0;
}

.popup-stat + .popup-stat {
  border-left: 1px solid var(--foqus-border);
}

.popup-stat-value {
  font-size: 20px;
  font-weight: 700;
  color: var(--foqus-text);
  line-height: 1;
}

.popup-stat-value--streak {
  color: var(--foqus-accent);
}

.popup-stat-value--kept {
  color: var(--foqus-positive);
}

.popup-stat-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--foqus-text-muted);
}

.popup-stats-trend {
  margin: 8px 0 0 0;
  font-size: 12px;
  color: var(--foqus-text-muted);
  text-align: center;
}

.popup-stats-trend--positive {
  color: var(--foqus-positive);
}
</style>

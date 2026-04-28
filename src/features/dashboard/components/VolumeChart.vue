<script setup lang="ts">
const props = defineProps<{ data: number[][] }>()
const days = ['L','M','M','J','V','S','D','L','M','M','J','V','S','D']
const max = 100
</script>

<template>
  <div class="volume-chart">
    <div class="volume-chart__header">
      <div>
        <div class="volume-chart__title">Volumen de mensajes</div>
        <div class="volume-chart__sub">Últimos 14 días · 1,284 mensajes</div>
      </div>
      <div class="volume-chart__legend">
        <span class="legend-item"><span class="legend-dot legend-dot--accent" />Bot</span>
        <span class="legend-item"><span class="legend-dot legend-dot--muted" />Humano</span>
      </div>
    </div>
    <div class="volume-chart__bars">
      <div v-for="(d, i) in data" :key="i" class="bar-col">
        <div class="bar-stack" :style="{ height: `${((d[0]+d[1])/max)*160}px` }">
          <div class="bar-segment bar-segment--human" :style="{ flex: d[1] }"/>
          <div class="bar-segment bar-segment--bot" :style="{ flex: d[0] }"/>
        </div>
        <span class="bar-label">{{ days[i] }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.volume-chart {
  background: var(--surface);
  border-radius: var(--radius-xl);
  padding: 24px 28px;
  box-shadow: var(--shadow-sm);
  grid-column: span 2;
}
.volume-chart__header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 24px; }
.volume-chart__title { font-size: 15px; font-weight: 600; color: var(--ink); }
.volume-chart__sub { font-size: 12px; color: var(--ink-3); margin-top: 2px; }
.volume-chart__legend { display: flex; gap: 14px; font-size: 12px; color: var(--ink-2); }
.legend-item { display: inline-flex; align-items: center; gap: 6px; }
.legend-dot { width: 8px; height: 8px; border-radius: 2px; }
.legend-dot--accent { background: var(--accent); }
.legend-dot--muted { background: var(--surface-3); }
.volume-chart__bars { display: flex; align-items: flex-end; gap: 10px; height: 160px; }
.bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px; }
.bar-stack { width: 100%; display: flex; flex-direction: column; justify-content: flex-end; border-radius: 4px; overflow: hidden; min-height: 4px; }
.bar-segment { width: 100%; }
.bar-segment--human { background: var(--surface-3); }
.bar-segment--bot { background: var(--accent); opacity: 0.9; }
.bar-label { font-size: 10px; color: var(--ink-3); font-weight: 500; }
</style>

<script setup lang="ts">
import { computed } from 'vue'
import type { VolumeDay } from '../types'

const props = defineProps<{ data: VolumeDay[]; rangeLabel?: string; totalMessages?: number }>()

const subtitle = computed(() => props.rangeLabel ?? 'Últimos 7 días')

const maxTotal = computed(() => {
  if (!props.data.length) return 1
  return Math.max(...props.data.map(d => d.bot + d.human))
})

const totalFormatted = computed(() => {
  const total = props.totalMessages ?? props.data.reduce((s, d) => s + d.bot + d.human, 0)
  return total.toLocaleString('en-US')
})

const BAR_HEIGHT = 160
</script>

<template>
  <div class="volume-chart">
    <div class="volume-chart__header">
      <div>
        <div class="volume-chart__title">Volumen de mensajes</div>
        <div class="volume-chart__sub">{{ subtitle }} · {{ totalFormatted }} mensajes</div>
      </div>
      <div class="volume-chart__legend">
        <span class="legend-item"><span class="legend-dot legend-dot--accent" />Atendido por bot</span>
        <span class="legend-item"><span class="legend-dot legend-dot--muted" />Atendido por humano</span>
      </div>
    </div>
    <div class="volume-chart__bars">
      <div v-for="(d, i) in data" :key="i" class="bar-col">
        <div
          class="bar-stack"
          :style="{ height: `${((d.bot + d.human) / maxTotal) * BAR_HEIGHT}px` }"
        >
          <div class="bar-segment bar-segment--human" :style="{ flex: d.human }" />
          <div class="bar-segment bar-segment--bot"   :style="{ flex: d.bot }" />
        </div>
        <span class="bar-label">{{ d.weekday }}</span>
      </div>
      <div v-if="!data.length" class="volume-chart__empty">Sin datos</div>
    </div>
  </div>
</template>

<style scoped>
.volume-chart { background: var(--surface); border-radius: var(--radius-xl); padding: 24px 28px; box-shadow: var(--shadow-sm); }
.volume-chart__header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 24px; gap: 16px; }
.volume-chart__title { font-size: 15px; font-weight: 600; color: var(--ink); }
.volume-chart__sub { font-size: 12px; color: var(--ink-3); margin-top: 2px; }
.volume-chart__legend { display: flex; gap: 14px; font-size: 12px; color: var(--ink-2); flex-shrink: 0; }
.legend-item { display: inline-flex; align-items: center; gap: 6px; }
.legend-dot { width: 8px; height: 8px; border-radius: 2px; }
.legend-dot--accent { background: var(--accent); }
.legend-dot--muted  { background: var(--surface-3); }
.volume-chart__bars { display: flex; align-items: flex-end; gap: 6px; height: 160px; }
.volume-chart__empty { flex: 1; display: flex; align-items: center; justify-content: center; font-size: 13px; color: var(--ink-3); }
.bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px; }
.bar-stack { width: 100%; display: flex; flex-direction: column; justify-content: flex-end; border-radius: 4px 4px 3px 3px; overflow: hidden; min-height: 4px; }
.bar-segment { width: 100%; }
.bar-segment--human { background: var(--surface-3); }
.bar-segment--bot   { background: var(--accent); }
.bar-label { font-size: 10px; color: var(--ink-3); font-weight: 500; }
</style>

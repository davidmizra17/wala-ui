<script setup lang="ts">
import { computed } from 'vue'
import type { FunnelStage } from '../types'

const props = defineProps<{
  stages: FunnelStage[]
  totalValue: number
  days?: number
}>()

const maxCount = computed(() => Math.max(...props.stages.map(s => s.count), 1))

const totalFormatted = computed(() => {
  const v = props.totalValue
  if (v >= 1000) return `$${(v / 1000).toFixed(1)}k`
  return `$${Math.round(v).toLocaleString('en-US')}`
})
</script>

<template>
  <div class="pipeline-summary">
    <div class="pipeline-summary__header">
      <div>
        <div class="pipeline-summary__title">Embudo</div>
        <div class="pipeline-summary__sub">
          Valor del embudo · <strong>{{ totalFormatted }}</strong>
        </div>
      </div>
      <span class="pipeline-summary__badge">Últimos {{ days ?? 30 }} días</span>
    </div>
    <div class="pipeline-summary__rows">
      <div v-for="(s, i) in stages" :key="i" class="ps-row">
        <div class="ps-row__label">{{ s.label }}</div>
        <div class="ps-row__bar-wrap">
          <div
            class="ps-row__bar"
            :style="{
              width: `${(s.count / maxCount) * 100}%`,
              background: s.isWon ? 'var(--good)' : 'var(--accent)',
            }"
          >
            {{ s.count }}
          </div>
        </div>
        <div class="ps-row__value">{{ s.value }}</div>
      </div>
      <div v-if="!stages.length" class="ps-empty">Sin datos</div>
    </div>
  </div>
</template>

<style scoped>
.pipeline-summary { background: var(--surface); border-radius: var(--radius-xl); padding: 24px 28px; box-shadow: var(--shadow-sm); }
.pipeline-summary__header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 22px; gap: 12px; }
.pipeline-summary__title { font-size: 15px; font-weight: 600; color: var(--ink); }
.pipeline-summary__sub { font-size: 12px; color: var(--ink-3); margin-top: 3px; }
.pipeline-summary__sub strong { color: var(--ink-2); font-weight: 600; }
.pipeline-summary__badge { font-size: 11px; color: var(--ink-3); background: var(--surface-2); border: 1px solid var(--line); border-radius: var(--radius-full); padding: 4px 10px; white-space: nowrap; flex-shrink: 0; }
.pipeline-summary__rows { display: flex; flex-direction: column; gap: 12px; }
.ps-row { display: flex; align-items: center; gap: 14px; }
.ps-row__label { width: 88px; font-size: 13px; color: var(--ink-2); font-weight: 500; flex-shrink: 0; }
.ps-row__bar-wrap { flex: 1; height: 26px; background: var(--surface-2); border-radius: 6px; overflow: hidden; }
.ps-row__bar { height: 100%; border-radius: 6px; display: flex; align-items: center; padding-left: 10px; font-size: 11px; font-weight: 700; color: rgba(0,0,0,0.65); min-width: 36px; transition: width 0.3s; }
.ps-row__value { width: 48px; text-align: right; font-size: 12px; color: var(--ink-2); font-weight: 600; font-family: var(--font-mono); flex-shrink: 0; }
.ps-empty { font-size: 13px; color: var(--ink-3); text-align: center; padding: 16px 0; }
</style>

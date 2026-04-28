<script setup lang="ts">
const props = defineProps<{
  stages: { label: string; count: number; value: string; isWon?: boolean }[]
}>()

const maxCount = Math.max(...props.stages.map(s => s.count))
</script>

<template>
  <div class="pipeline-summary">
    <div class="pipeline-summary__header">
      <div>
        <div class="pipeline-summary__title">Pipeline</div>
        <div class="pipeline-summary__sub">Valor del embudo · <strong>$24,600</strong></div>
      </div>
    </div>
    <div class="pipeline-summary__rows">
      <div v-for="(s, i) in stages" :key="i" class="ps-row">
        <div class="ps-row__label">{{ s.label }}</div>
        <div class="ps-row__bar-wrap">
          <div class="ps-row__bar"
            :style="{
              width: `${(s.count / maxCount) * 100}%`,
              background: s.isWon ? 'var(--good)' : 'var(--accent)',
              opacity: s.isWon ? 0.85 : 1 - i * 0.08
            }">
            {{ s.count }}
          </div>
        </div>
        <div class="ps-row__value">{{ s.value }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pipeline-summary { background: var(--surface); border-radius: var(--radius-xl); padding: 24px 28px; box-shadow: var(--shadow-sm); grid-column: span 2; }
.pipeline-summary__header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 22px; }
.pipeline-summary__title { font-size: 15px; font-weight: 600; color: var(--ink); }
.pipeline-summary__sub { font-size: 12px; color: var(--ink-3); margin-top: 2px; }
.pipeline-summary__rows { display: flex; flex-direction: column; gap: 14px; }
.ps-row { display: flex; align-items: center; gap: 14px; }
.ps-row__label { width: 90px; font-size: 13px; color: var(--ink-2); font-weight: 500; }
.ps-row__bar-wrap { flex: 1; height: 24px; background: var(--surface-2); border-radius: 6px; overflow: hidden; }
.ps-row__bar { height: 100%; border-radius: 6px; display: flex; align-items: center; padding-left: 10px; font-size: 11px; font-weight: 600; color: var(--accent-ink); min-width: 32px; transition: width 0.3s; }
.ps-row__value { width: 56px; text-align: right; font-size: 12px; color: var(--ink-2); font-weight: 600; font-family: var(--font-mono); }
</style>

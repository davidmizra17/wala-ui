<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  pct: number
  botHandled: number
  humanHandled: number
  avgFirstResponseSecs: number
}>()

const r = 38
const circumference = computed(() => 2 * Math.PI * r)
const dashArray = computed(() => `${(props.pct / 100) * circumference.value} ${circumference.value}`)

const avgResponseDisplay = computed(() => {
  const m = Math.floor(props.avgFirstResponseSecs / 60)
  const s = props.avgFirstResponseSecs % 60
  return `${m}:${String(s).padStart(2, '0')}`
})
</script>

<template>
  <div class="bot-health">
    <div class="bot-health__title">Resuelto por bot</div>
    <div class="bot-health__sub">Últimos 7 días</div>
    <div class="bot-health__body">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" :r="r" fill="none" stroke="var(--surface-3)" stroke-width="10"/>
        <circle cx="50" cy="50" :r="r" fill="none" stroke="var(--accent)" stroke-width="10"
          :stroke-dasharray="dashArray" stroke-dashoffset="0" stroke-linecap="round"
          transform="rotate(-90 50 50)"/>
        <text x="50" y="50" text-anchor="middle" dy="0.35em"
          style="font-family: var(--font-hero); font-size: 22px; fill: var(--ink);">
          {{ pct }}%
        </text>
      </svg>
      <div class="bot-health__stats">
        <div class="bot-stat">
          <span class="bot-stat__label"><span class="bot-stat__dot bot-stat__dot--accent"/>Bot</span>
          <span class="bot-stat__val">{{ botHandled }}</span>
        </div>
        <div class="bot-stat">
          <span class="bot-stat__label"><span class="bot-stat__dot bot-stat__dot--muted"/>Humano</span>
          <span class="bot-stat__val">{{ humanHandled }}</span>
        </div>
        <div class="bot-health__divider"/>
        <div class="bot-stat">
          <span class="bot-stat__label" style="color: var(--ink-3)">Primera respuesta</span>
          <span class="bot-stat__val" style="color: var(--good); font-family: var(--font-mono)">
            {{ avgResponseDisplay }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bot-health { background: var(--surface); border-radius: var(--radius-xl); padding: 24px 28px; box-shadow: var(--shadow-sm); }
.bot-health__title { font-size: 15px; font-weight: 600; color: var(--ink); margin-bottom: 4px; }
.bot-health__sub { font-size: 12px; color: var(--ink-3); }
.bot-health__body { display: flex; align-items: center; gap: 24px; margin-top: 18px; }
.bot-health__stats { flex: 1; display: flex; flex-direction: column; gap: 10px; min-width: 0; }
.bot-stat { display: flex; justify-content: space-between; font-size: 12px; }
.bot-stat__label { color: var(--ink-2); display: inline-flex; align-items: center; gap: 6px; }
.bot-stat__dot { width: 7px; height: 7px; border-radius: 4px; }
.bot-stat__dot--accent { background: var(--accent); }
.bot-stat__dot--muted { background: var(--surface-3); }
.bot-stat__val { font-weight: 600; color: var(--ink); }
.bot-health__divider { height: 1px; background: var(--line); margin: 2px 0; }
</style>

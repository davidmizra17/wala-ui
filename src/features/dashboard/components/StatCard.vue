<script setup lang="ts">
import Sparkline from './Sparkline.vue'
import type { StatCardData } from '../types'

defineProps<{ data: StatCardData }>()
</script>

<template>
  <div class="stat-card">
    <div class="stat-card__header">
      <span class="stat-card__label">{{ data.label }}</span>
      <span v-if="data.delta" :class="['stat-card__delta', data.positive ? 'stat-card__delta--up' : 'stat-card__delta--down']">
        <span class="stat-card__arrow">{{ data.positive ? '▲' : '▼' }}</span>
        {{ data.delta }}
      </span>
    </div>
    <div class="stat-card__value-row">
      <span class="stat-card__value">{{ data.value }}</span>
      <span v-if="data.unit" class="stat-card__unit">{{ data.unit }}</span>
    </div>
    <Sparkline v-if="data.sparkline" :pts="data.sparkline" />
  </div>
</template>

<style scoped>
.stat-card {
  background: var(--surface);
  border-radius: var(--radius-xl);
  padding: 22px 24px;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-width: 0;
}
.stat-card__header { display: flex; align-items: center; justify-content: space-between; }
.stat-card__label { font-size: 11px; font-weight: 500; color: var(--ink-3); letter-spacing: 0.05em; text-transform: uppercase; }
.stat-card__delta { font-size: 11px; font-weight: 600; padding: 2px 7px; border-radius: 6px; display: inline-flex; align-items: center; gap: 3px; }
.stat-card__delta--up { color: var(--good); background: var(--good-tint); }
.stat-card__delta--down { color: var(--bad); background: var(--bad-tint); }
.stat-card__arrow { font-size: 9px; }
.stat-card__value-row { display: flex; align-items: baseline; gap: 6px; }
.stat-card__value { font-family: var(--font-hero); font-size: 46px; font-weight: 400; color: var(--ink); letter-spacing: -0.02em; line-height: 1; }
.stat-card__unit { font-size: 16px; color: var(--ink-2); font-weight: 500; }
</style>

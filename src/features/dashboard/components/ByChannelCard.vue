<script setup lang="ts">
import type { ChannelData } from '../types'

defineProps<{ channels: ChannelData[] }>()

const barColor: Record<string, string> = {
  WhatsApp:  'var(--wa)',
  Instagram: 'var(--ig)',
}
const dotColor: Record<string, string> = {
  WhatsApp:  'var(--wa)',
  Instagram: 'var(--ig)',
}
</script>

<template>
  <div class="by-channel">
    <div class="by-channel__title">By channel</div>
    <div class="by-channel__rows">
      <div v-for="ch in channels" :key="ch.name" class="ch-row">
        <div class="ch-row__label">
          <span class="ch-dot" :style="{ background: dotColor[ch.name] }" />
          {{ ch.name }}
        </div>
        <div class="ch-bar-wrap">
          <div class="ch-bar" :style="{ width: `${ch.pct}%`, background: barColor[ch.name] }" />
        </div>
        <div class="ch-row__stats">
          <span class="ch-count">{{ ch.count }}</span>
          <span class="ch-pct">{{ ch.pct }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.by-channel { background: var(--surface); border-radius: var(--radius-xl); padding: 24px 28px; box-shadow: var(--shadow-sm); }
.by-channel__title { font-size: 15px; font-weight: 600; color: var(--ink); margin-bottom: 20px; }
.by-channel__rows { display: flex; flex-direction: column; gap: 16px; }
.ch-row { display: flex; flex-direction: column; gap: 8px; }
.ch-row__label { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--ink-2); font-weight: 500; }
.ch-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.ch-bar-wrap { height: 6px; background: var(--surface-2); border-radius: var(--radius-full); overflow: hidden; }
.ch-bar { height: 100%; border-radius: var(--radius-full); }
.ch-row__stats { display: flex; justify-content: space-between; font-size: 12px; }
.ch-count { font-weight: 600; color: var(--ink); font-family: var(--font-mono); }
.ch-pct { color: var(--ink-3); }
</style>

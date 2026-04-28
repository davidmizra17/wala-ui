<script setup lang="ts">
import WalaIcon from '@/shared/components/WalaIcon.vue'
import type { ActivityItem } from '../types'

defineProps<{ items: ActivityItem[] }>()

const dotColor: Record<string, string> = {
  bot: 'var(--accent)',
  won: 'var(--good)',
  human: 'var(--info)',
  new: 'var(--ink-3)',
}
</script>

<template>
  <div class="activity-feed">
    <div class="activity-feed__header">
      <span class="activity-feed__title">Actividad</span>
      <span class="activity-feed__live">
        <span class="live-dot" />
        Live
      </span>
    </div>
    <div class="activity-feed__list">
      <div v-for="(item, i) in items" :key="i" class="activity-item">
        <div class="activity-item__timeline">
          <span class="activity-item__dot" :style="{ background: dotColor[item.type] }" />
          <span v-if="i < items.length - 1" class="activity-item__line" />
        </div>
        <div class="activity-item__body">
          <div class="activity-item__who-row">
            <span class="activity-item__who">{{ item.who }}</span>
            <WalaIcon :name="item.channel" :size="11" :color="item.channel === 'wa' ? 'var(--wa)' : 'var(--ig)'" />
          </div>
          <div class="activity-item__text">{{ item.text }}</div>
        </div>
        <span class="activity-item__time">{{ item.time }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.activity-feed {
  background: var(--surface);
  border-radius: var(--radius-xl);
  padding: 24px 28px;
  box-shadow: var(--shadow-sm);
  grid-row: span 2;
  display: flex;
  flex-direction: column;
}
.activity-feed__header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
.activity-feed__title { font-size: 15px; font-weight: 600; color: var(--ink); }
.activity-feed__live { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; color: var(--good); font-weight: 500; }
.live-dot { width: 6px; height: 6px; border-radius: 3px; background: var(--good); box-shadow: 0 0 0 3px var(--good-tint); }
.activity-feed__list { display: flex; flex-direction: column; gap: 0; flex: 1; }
.activity-item { display: flex; gap: 12px; align-items: flex-start; }
.activity-item__timeline { display: flex; flex-direction: column; align-items: center; gap: 2px; padding-top: 4px; }
.activity-item__dot { width: 8px; height: 8px; border-radius: 4px; flex-shrink: 0; }
.activity-item__line { width: 1px; flex: 1; background: var(--line); min-height: 24px; }
.activity-item__body { flex: 1; min-width: 0; padding-bottom: 16px; }
.activity-item__who-row { display: flex; align-items: center; gap: 6px; }
.activity-item__who { font-size: 13px; font-weight: 600; color: var(--ink); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.activity-item__text { font-size: 12px; color: var(--ink-2); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.activity-item__time { font-size: 11px; color: var(--ink-3); white-space: nowrap; flex-shrink: 0; }
</style>

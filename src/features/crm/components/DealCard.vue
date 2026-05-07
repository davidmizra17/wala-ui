<script setup lang="ts">
import type { Deal } from '../types'
import WalaIcon from '@/shared/components/WalaIcon.vue'

defineProps<{ deal: Deal }>()

function formatValue(v: string) {
  return '$' + Number(v).toLocaleString('en-US')
}

function initials(name: string) {
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
}

function relativeDate(d: string | null | undefined): string | null {
  if (!d) return null
  const date = new Date(d)
  const now = new Date()
  const diffDays = Math.round((date.getTime() - now.getTime()) / 86_400_000)
  if (diffDays === 0) return 'hoy'
  if (diffDays === 1) return 'mañana'
  if (diffDays === -1) return 'ayer'
  if (diffDays < -1 && diffDays >= -6) return `hace ${Math.abs(diffDays)}d`
  if (diffDays > 1 && diffDays <= 6) return `en ${diffDays}d`
  return date.toLocaleDateString('es', { month: 'short', day: 'numeric' })
}
</script>

<template>
  <div class="deal-card">
    <div class="deal-card__head">
      <div class="deal-card__indicators">
        <span
          v-if="deal.channel"
          class="deal-card__channel"
          :class="`deal-card__channel--${deal.channel}`"
        />
        <span v-if="deal.botSourced" class="deal-card__auto">
          <WalaIcon name="sparkle" :size="10" color="currentColor" :stroke="1.2" />
          Auto
        </span>
      </div>
      <button class="deal-card__more">
        <WalaIcon name="more" :size="16" color="currentColor" />
      </button>
    </div>

    <p class="deal-card__title">
      {{ deal.title }}<span class="deal-card__contact"> — {{ deal.contact_name }}</span>
    </p>

    <p class="deal-card__value">{{ formatValue(deal.value) }}</p>

    <div v-if="deal.tags?.length" class="deal-card__tags">
      <span v-for="tag in deal.tags" :key="tag" class="deal-card__tag">{{ tag }}</span>
    </div>

    <div class="deal-card__foot">
      <span v-if="deal.due_date" class="deal-card__date">
        <WalaIcon name="calendar" :size="12" color="currentColor" />
        {{ relativeDate(deal.due_date) }}
      </span>
      <span v-else />
      <span class="deal-card__avatar">{{ initials(deal.contact_name) }}</span>
    </div>
  </div>
</template>

<style scoped>
.deal-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 12px;
  cursor: pointer;
  transition: border-color 0.15s, box-shadow 0.15s;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.deal-card:hover {
  border-color: var(--line-2);
  box-shadow: var(--shadow-sm);
}

.deal-card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 20px;
}

.deal-card__indicators {
  display: flex;
  align-items: center;
  gap: 6px;
}

.deal-card__channel {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  flex-shrink: 0;
}
.deal-card__channel--wa  { background: var(--wa); }
.deal-card__channel--ig  { background: var(--ig); }

.deal-card__auto {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 10px;
  font-weight: 600;
  color: var(--good);
  background: color-mix(in srgb, var(--good) 14%, transparent);
  border-radius: var(--radius-full);
  padding: 2px 7px 2px 5px;
  line-height: 1;
}

.deal-card__more {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: var(--ink-3);
  cursor: pointer;
  padding: 2px;
  border-radius: var(--radius-sm);
  opacity: 0;
  transition: opacity 0.12s, background 0.12s;
}
.deal-card:hover .deal-card__more { opacity: 1; }
.deal-card__more:hover { background: var(--surface-2); color: var(--ink); }

.deal-card__title {
  font-size: 13px;
  font-weight: 500;
  color: var(--ink);
  line-height: 1.4;
  margin: 0;
}
.deal-card__contact {
  color: var(--ink-2);
  font-weight: 400;
}

.deal-card__value {
  font-size: 20px;
  font-weight: 600;
  color: var(--ink);
  margin: 0;
  letter-spacing: -0.02em;
}

.deal-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
.deal-card__tag {
  font-size: 11px;
  font-weight: 500;
  color: var(--ink-2);
  background: var(--surface-2);
  border-radius: var(--radius-full);
  padding: 2px 8px;
  line-height: 1.6;
}

.deal-card__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
}

.deal-card__date {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: var(--ink-3);
}

.deal-card__avatar {
  width: 24px;
  height: 24px;
  border-radius: var(--radius-full);
  background: color-mix(in srgb, var(--accent) 18%, transparent);
  color: var(--accent);
  font-size: 9px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  letter-spacing: 0;
}
</style>

<script setup lang="ts">
import type { KanbanColumn } from '../types'
import DealCard from './DealCard.vue'

defineProps<{ column: KanbanColumn }>()

function colTotal(column: KanbanColumn) {
  const total = column.deals.reduce((sum, d) => sum + Number(d.value), 0)
  return '$' + total.toLocaleString('en-US')
}
</script>

<template>
  <div class="kb-col">
    <div class="kb-col__head">
      <div class="kb-col__label">
        <span class="kb-col__dot" :style="{ background: column.color }" />
        <span class="kb-col__name">{{ column.label }}</span>
        <span class="kb-col__count">{{ column.deals.length }}</span>
      </div>
      <span class="kb-col__total">{{ colTotal(column) }}</span>
    </div>

    <div class="kb-col__body">
      <DealCard
        v-for="deal in column.deals"
        :key="deal.id"
        :deal="deal"
      />
      <div v-if="!column.deals.length" class="kb-col__empty">
        Sin negocios
      </div>
    </div>
  </div>
</template>

<style scoped>
.kb-col {
  flex: 0 0 280px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.kb-col__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 8px;
  border-bottom: 1px solid var(--line);
}

.kb-col__label {
  display: flex;
  align-items: center;
  gap: 7px;
}

.kb-col__dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  flex-shrink: 0;
}

.kb-col__name {
  font-size: 13px;
  font-weight: 600;
  color: var(--ink);
}

.kb-col__count {
  font-size: 12px;
  font-weight: 500;
  color: var(--ink-3);
  background: var(--surface-2);
  border-radius: var(--radius-full);
  padding: 1px 6px;
  line-height: 1.6;
}

.kb-col__total {
  font-size: 12px;
  font-weight: 500;
  color: var(--ink-2);
}

.kb-col__body {
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
  padding-bottom: 8px;
}
.kb-col__body::-webkit-scrollbar { width: 4px; }
.kb-col__body::-webkit-scrollbar-track { background: transparent; }
.kb-col__body::-webkit-scrollbar-thumb { background: var(--line-2); border-radius: 2px; }

.kb-col__empty {
  font-size: 12px;
  color: var(--ink-3);
  text-align: center;
  padding: 24px 0;
  border: 1px dashed var(--line);
  border-radius: var(--radius-lg);
}
</style>

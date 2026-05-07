<script setup lang="ts">
import { computed, onMounted } from 'vue'
import WalaIcon from '@/shared/components/WalaIcon.vue'
import { useCrmStore } from '../stores/crm'
import KanbanColumn from '../components/KanbanColumn.vue'

const store = useCrmStore()

const activeDeals = computed(() => store.deals.filter(d => d.stage !== 'lost'))

const totalValue = computed(() => {
  const total = activeDeals.value.reduce((sum, d) => sum + Number(d.value), 0)
  return '$' + total.toLocaleString('en-US')
})

onMounted(() => store.fetchBoard())
</script>

<template>
  <div class="crm">
    <div class="crm__header">
      <div>
        <h1 class="crm__title">Sales pipeline</h1>
        <p class="crm__subtitle">
          {{ activeDeals.length }} active deals · {{ totalValue }} in motion
        </p>
      </div>
      <div class="crm__actions">
        <button class="crm__btn-filter">
          <WalaIcon name="filter" :size="14" color="currentColor" />
          Filter
        </button>
        <button class="crm__btn-new">
          <WalaIcon name="plus" :size="14" color="currentColor" />
          New deal
        </button>
      </div>
    </div>

    <div class="crm__board">
      <KanbanColumn
        v-for="col in store.columns"
        :key="col.stage"
        :column="col"
      />
    </div>
  </div>
</template>

<style scoped>
.crm {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 24px;
  padding: 28px 32px;
  overflow: hidden;
}

.crm__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-shrink: 0;
}

.crm__title {
  font-family: var(--font-hero);
  font-size: 28px;
  font-weight: 400;
  color: var(--ink);
  margin: 0 0 4px;
  line-height: 1.2;
}

.crm__subtitle {
  font-size: 13px;
  color: var(--ink-2);
  margin: 0;
}

.crm__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.crm__btn-filter {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 500;
  color: var(--ink-2);
  background: transparent;
  border: 1px solid var(--line-2);
  border-radius: var(--radius-md);
  padding: 7px 14px;
  cursor: pointer;
  transition: color 0.12s, border-color 0.12s, background 0.12s;
}
.crm__btn-filter:hover {
  color: var(--ink);
  background: var(--surface-2);
}

.crm__btn-new {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--accent-ink);
  background: var(--accent);
  border: none;
  border-radius: var(--radius-md);
  padding: 7px 14px;
  cursor: pointer;
  transition: opacity 0.12s;
}
.crm__btn-new:hover { opacity: 0.88; }

.crm__board {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  overflow-y: hidden;
  flex: 1;
  padding-bottom: 8px;
  align-items: flex-start;
}
.crm__board::-webkit-scrollbar { height: 6px; }
.crm__board::-webkit-scrollbar-track { background: transparent; }
.crm__board::-webkit-scrollbar-thumb { background: var(--line-2); border-radius: 3px; }
</style>

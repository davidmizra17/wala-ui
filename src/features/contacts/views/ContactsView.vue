<script setup lang="ts">
import { ref, computed } from 'vue'
import { useContactsStore } from '../stores/contacts'
import ContactListItem from '../components/ContactListItem.vue'
import ContactDetail from '../components/ContactDetail.vue'
import WalaIcon from '@/shared/components/WalaIcon.vue'

const store = useContactsStore()

type Filter = 'Todos' | 'Lead' | 'VIP' | 'B2B'
const activeFilter = ref<Filter>('Todos')

const FILTERS: Filter[] = ['Todos', 'Lead', 'VIP', 'B2B']

const displayList = computed(() => {
  const base = store.filtered
  if (activeFilter.value === 'Todos') return base
  return base.filter(c => c.tags.includes(activeFilter.value))
})
</script>

<template>
  <div class="contacts-view">

    <!-- ── Left panel: contact list ── -->
    <aside class="cl">
      <div class="cl__top">
        <div class="cl__header-row">
          <div>
            <h1 class="cl__title">Contactos <span class="cl__count">{{ displayList.length }}</span></h1>
          </div>
          <button class="add-btn">
            <WalaIcon name="plus" :size="12" />
            Agregar contacto
          </button>
        </div>

        <div class="cl__search">
          <WalaIcon name="search" :size="14" color="var(--ink-3)" />
          <input
            v-model="store.search"
            class="cl__search-input"
            placeholder="Buscar..."
            type="search"
          />
        </div>

        <div class="cl__filters">
          <button
            v-for="f in FILTERS"
            :key="f"
            :class="['filter-tab', { 'filter-tab--active': activeFilter === f }]"
            @click="activeFilter = f"
          >
            {{ f }}
            <span v-if="f === 'Todos'" class="filter-tab__badge">1,204</span>
          </button>
        </div>
      </div>

      <div class="cl__list">
        <ContactListItem
          v-for="c in displayList"
          :key="c.id"
          :contact="c"
          :active="c.id === store.selectedId"
          @click="store.select(c.id)"
        />
      </div>
    </aside>

    <!-- ── Right panel: contact detail ── -->
    <main class="cr">
      <ContactDetail v-if="store.selected" :contact="store.selected" />
      <div v-else class="cr__empty">
        <WalaIcon name="contacts" :size="36" color="var(--ink-3)" />
        <p>Selecciona un contacto</p>
      </div>
    </main>

  </div>
</template>

<style scoped>
/* ── Shell ── */
.contacts-view {
  display: flex;
  height: 100%;
  overflow: hidden;
}

/* ── Left panel ── */
.cl {
  width: 264px;
  flex-shrink: 0;
  background: var(--surface);
  border-right: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.cl__top {
  padding: 20px 14px 8px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cl__header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.cl__title {
  font-size: 15px;
  font-weight: 700;
  color: var(--ink);
  display: flex;
  align-items: baseline;
  gap: 6px;
}
.cl__count {
  font-size: 12px;
  font-weight: 500;
  color: var(--ink-3);
}

.add-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: var(--surface-3);
  border: none;
  border-radius: var(--radius-md);
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 600;
  color: var(--ink);
  white-space: nowrap;
  flex-shrink: 0;
  transition: background 0.12s;
}
.add-btn:hover { background: var(--accent-tint); color: var(--accent-ink); }

.cl__search {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--surface-2);
  border-radius: var(--radius-md);
  padding: 8px 12px;
  border: 1px solid transparent;
  transition: border-color 0.12s;
}
.cl__search:focus-within { border-color: var(--accent); }
.cl__search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: 13px;
  color: var(--ink);
  min-width: 0;
}
.cl__search-input::placeholder { color: var(--ink-3); }

.cl__filters {
  display: flex;
  gap: 1px;
  padding-bottom: 4px;
}
.filter-tab {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background: transparent;
  border: none;
  padding: 6px 6px;
  font-size: 12px;
  font-weight: 500;
  color: var(--ink-3);
  border-radius: var(--radius-sm);
  transition: all 0.12s;
}
.filter-tab--active {
  background: var(--surface-3);
  color: var(--ink);
  font-weight: 600;
}
.filter-tab:hover:not(.filter-tab--active) { color: var(--ink-2); }
.filter-tab__badge {
  font-size: 10px;
  color: var(--ink-3);
  font-weight: 400;
}

.cl__list {
  flex: 1;
  overflow-y: auto;
  padding: 4px 6px 12px;
}
.cl__list::-webkit-scrollbar { width: 4px; }
.cl__list::-webkit-scrollbar-thumb { background: var(--surface-3); border-radius: 2px; }

/* ── Right panel ── */
.cr {
  flex: 1;
  min-width: 0;
  overflow-y: auto;
  background: var(--bg);
}
.cr__empty {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: var(--ink-3);
  font-size: 14px;
}
</style>

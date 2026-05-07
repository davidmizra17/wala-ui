<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import WalaIcon from '@/shared/components/WalaIcon.vue'
import { useTasksStore } from '../stores/tasks'
import { useAuthStore } from '@/stores/auth'
import TaskRow from '../components/TaskRow.vue'

const store = useTasksStore()
const auth = useAuthStore()

onMounted(() => store.fetchTasks())

type ViewKey = 'all' | 'mine' | 'created' | 'overdue' | 'unassigned'
const activeView = ref<ViewKey>('all')

const CURRENT_USER = computed(() => auth.user?.id ?? null)

const TAGS = ['#seguimiento', '#catálogo', '#cotización', '#evento']

const allActive    = computed(() => store.tasks.filter(t => !t.is_done))
const mineTasks    = computed(() => store.tasks.filter(t => t.assigned_to === CURRENT_USER.value && !t.is_done))
const createdByMe  = computed(() => store.tasks.filter(t => !t.is_done))
const overdueCount = computed(() => store.overdue.length)
const unassigned   = computed(() => store.tasks.filter(t => !t.assigned_to && !t.is_done))

const visibleOverdue = computed(() => {
  if (activeView.value === 'mine')       return store.overdue.filter(t => t.assigned_to === CURRENT_USER.value)
  if (activeView.value === 'unassigned') return store.overdue.filter(t => !t.assigned_to)
  if (activeView.value === 'overdue')    return store.overdue
  return store.overdue
})

const visibleToday = computed(() => {
  if (activeView.value === 'overdue')    return []
  if (activeView.value === 'mine')       return store.today.filter(t => t.assigned_to === CURRENT_USER.value)
  if (activeView.value === 'unassigned') return store.today.filter(t => !t.assigned_to)
  return store.today
})

const visibleUpcoming = computed(() => {
  if (activeView.value === 'overdue')    return []
  if (activeView.value === 'mine')       return store.upcoming.filter(t => t.assigned_to === CURRENT_USER.value)
  if (activeView.value === 'unassigned') return store.upcoming.filter(t => !t.assigned_to)
  return store.upcoming
})

const totalVisible = computed(() =>
  visibleOverdue.value.length + visibleToday.value.length + visibleUpcoming.value.length
)

const subtitle = computed(() => {
  const parts = [`${allActive.value.length} tareas`]
  if (overdueCount.value) parts.push(`${overdueCount.value} vencidas`)
  const todayCount = store.today.filter(t => !t.is_done).length
  if (todayCount) parts.push(`${todayCount} para hoy`)
  return parts.join(' · ')
})

const overdueOpen  = ref(true)
const todayOpen    = ref(true)
const upcomingOpen = ref(true)
</script>

<template>
  <div class="tasks">

    <!-- Left sidebar -->
    <aside class="tasks__sidebar">
      <div class="tasks__sidebar-section">
        <p class="tasks__section-label">VISTAS</p>
        <nav>
          <button
            class="tasks__nav-item"
            :class="{ 'tasks__nav-item--active': activeView === 'all' }"
            @click="activeView = 'all'"
          >
            <span>Todas las tareas</span>
            <span class="tasks__nav-badge">{{ allActive.length }}</span>
          </button>
          <button
            class="tasks__nav-item"
            :class="{ 'tasks__nav-item--active': activeView === 'mine' }"
            @click="activeView = 'mine'"
          >
            <span>Asignadas a mí</span>
            <span v-if="mineTasks.length" class="tasks__nav-badge">{{ mineTasks.length }}</span>
          </button>
          <button
            class="tasks__nav-item"
            :class="{ 'tasks__nav-item--active': activeView === 'created' }"
            @click="activeView = 'created'"
          >
            <span>Creadas por mí</span>
            <span v-if="createdByMe.length" class="tasks__nav-badge">{{ createdByMe.length }}</span>
          </button>
          <button
            class="tasks__nav-item"
            :class="{ 'tasks__nav-item--active': activeView === 'overdue' }"
            @click="activeView = 'overdue'"
          >
            <span>Vencida</span>
            <span v-if="overdueCount" class="tasks__nav-badge tasks__nav-badge--bad">{{ overdueCount }}</span>
          </button>
          <button
            class="tasks__nav-item"
            :class="{ 'tasks__nav-item--active': activeView === 'unassigned' }"
            @click="activeView = 'unassigned'"
          >
            <span>Sin asignar</span>
            <span v-if="unassigned.length" class="tasks__nav-badge">{{ unassigned.length }}</span>
          </button>
        </nav>
      </div>

      <div class="tasks__sidebar-section">
        <p class="tasks__section-label">ETIQUETAS</p>
        <nav>
          <button v-for="tag in TAGS" :key="tag" class="tasks__nav-item tasks__nav-item--tag">
            <span class="tasks__tag-dot" />
            {{ tag }}
          </button>
        </nav>
      </div>
    </aside>

    <!-- Main content -->
    <div class="tasks__main">
      <div class="tasks__main-header">
        <div>
          <h1 class="tasks__title">Tareas</h1>
          <p class="tasks__subtitle">{{ subtitle }}</p>
        </div>
        <button class="tasks__btn-new">
          <WalaIcon name="plus" :size="14" color="currentColor" />
          Nueva tarea
        </button>
      </div>

      <div class="tasks__groups">

        <!-- Vencida -->
        <section v-if="visibleOverdue.length" class="tasks__group">
          <button class="tasks__group-head" @click="overdueOpen = !overdueOpen">
            <WalaIcon
              name="chevron-down"
              :size="14"
              color="currentColor"
              :style="{ transform: overdueOpen ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.15s' }"
            />
            <span class="tasks__group-dot" style="background: var(--bad)" />
            <span class="tasks__group-name">Vencida</span>
            <span class="tasks__group-count">{{ visibleOverdue.length }}</span>
          </button>
          <div v-if="overdueOpen" class="tasks__group-body">
            <TaskRow
              v-for="task in visibleOverdue"
              :key="task.id"
              :task="task"
              group="overdue"
              @toggle="store.toggleDone"
            />
          </div>
        </section>

        <!-- Vence hoy -->
        <section v-if="visibleToday.length" class="tasks__group">
          <button class="tasks__group-head" @click="todayOpen = !todayOpen">
            <WalaIcon
              name="chevron-down"
              :size="14"
              color="currentColor"
              :style="{ transform: todayOpen ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.15s' }"
            />
            <span class="tasks__group-dot" style="background: var(--accent)" />
            <span class="tasks__group-name">Vence hoy</span>
            <span class="tasks__group-count">{{ visibleToday.length }}</span>
          </button>
          <div v-if="todayOpen" class="tasks__group-body">
            <TaskRow
              v-for="task in visibleToday"
              :key="task.id"
              :task="task"
              group="today"
              @toggle="store.toggleDone"
            />
          </div>
        </section>

        <!-- Próxima -->
        <section v-if="visibleUpcoming.length" class="tasks__group">
          <button class="tasks__group-head" @click="upcomingOpen = !upcomingOpen">
            <WalaIcon
              name="chevron-down"
              :size="14"
              color="currentColor"
              :style="{ transform: upcomingOpen ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.15s' }"
            />
            <span class="tasks__group-dot" style="background: var(--good)" />
            <span class="tasks__group-name">Próxima</span>
            <span class="tasks__group-count">{{ visibleUpcoming.length }}</span>
          </button>
          <div v-if="upcomingOpen" class="tasks__group-body">
            <TaskRow
              v-for="task in visibleUpcoming"
              :key="task.id"
              :task="task"
              group="upcoming"
              @toggle="store.toggleDone"
            />
          </div>
        </section>

        <p v-if="!totalVisible" class="tasks__empty">
          No hay tareas en esta vista.
        </p>

      </div>
    </div>
  </div>
</template>

<style scoped>
.tasks {
  display: flex;
  height: 100%;
  overflow: hidden;
}

/* ── Sidebar ── */
.tasks__sidebar {
  width: 220px;
  flex-shrink: 0;
  border-right: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px 0;
  overflow-y: auto;
}
.tasks__sidebar::-webkit-scrollbar { display: none; }

.tasks__sidebar-section {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0 8px;
}

.tasks__section-label {
  font-size: 10px;
  font-weight: 700;
  color: var(--ink-3);
  letter-spacing: 0.08em;
  padding: 8px 8px 4px;
  margin: 0;
}

.tasks__nav-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  padding: 7px 8px;
  font-size: 13px;
  font-weight: 500;
  color: var(--ink-2);
  cursor: pointer;
  text-align: left;
  transition: background 0.1s, color 0.1s;
  gap: 8px;
}
.tasks__nav-item:hover { background: var(--surface-2); color: var(--ink); }
.tasks__nav-item--active { background: var(--surface-2); color: var(--ink); font-weight: 600; }
.tasks__nav-item--tag {
  justify-content: flex-start;
  gap: 8px;
  color: var(--ink-3);
  font-size: 12.5px;
  font-weight: 400;
}
.tasks__nav-item--tag:hover { color: var(--ink-2); }

.tasks__nav-badge {
  font-size: 11px;
  font-weight: 600;
  color: var(--ink-3);
  background: var(--surface-3);
  border-radius: var(--radius-full);
  padding: 1px 6px;
  line-height: 1.6;
  flex-shrink: 0;
}
.tasks__nav-badge--bad {
  color: var(--bad);
  background: color-mix(in srgb, var(--bad) 12%, transparent);
}

.tasks__tag-dot {
  width: 7px;
  height: 7px;
  border-radius: var(--radius-full);
  background: var(--ink-3);
  flex-shrink: 0;
}

/* ── Main ── */
.tasks__main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.tasks__main-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 28px 32px 20px;
  flex-shrink: 0;
  border-bottom: 1px solid var(--line);
}

.tasks__title {
  font-family: var(--font-hero);
  font-size: 28px;
  font-weight: 400;
  color: var(--ink);
  margin: 0 0 4px;
  line-height: 1.2;
}

.tasks__subtitle {
  font-size: 13px;
  color: var(--ink-2);
  margin: 0;
}

.tasks__btn-new {
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
  flex-shrink: 0;
}
.tasks__btn-new:hover { opacity: 0.88; }

.tasks__groups {
  flex: 1;
  overflow-y: auto;
  padding: 12px 0;
}
.tasks__groups::-webkit-scrollbar { width: 4px; }
.tasks__groups::-webkit-scrollbar-track { background: transparent; }
.tasks__groups::-webkit-scrollbar-thumb { background: var(--line-2); border-radius: 2px; }

/* ── Groups ── */
.tasks__group { margin-bottom: 4px; }

.tasks__group-head {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  background: transparent;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  color: var(--ink-2);
  transition: background 0.1s;
}
.tasks__group-head:hover { background: color-mix(in srgb, var(--ink) 3%, transparent); }

.tasks__group-dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  flex-shrink: 0;
}

.tasks__group-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--ink);
}

.tasks__group-count {
  font-size: 12px;
  font-weight: 500;
  color: var(--ink-3);
  background: var(--surface-2);
  border-radius: var(--radius-full);
  padding: 1px 6px;
  line-height: 1.6;
}

.tasks__group-body {
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  margin-bottom: 4px;
}

.tasks__empty {
  text-align: center;
  color: var(--ink-3);
  font-size: 13px;
  padding: 40px 0;
  margin: 0;
}
</style>

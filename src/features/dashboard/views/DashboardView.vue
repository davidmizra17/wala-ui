<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useDashboardStore } from '../stores/dashboard'
import { useAuthStore } from '@/stores/auth'
import StatCard from '../components/StatCard.vue'
import VolumeChart from '../components/VolumeChart.vue'
import ActivityFeed from '../components/ActivityFeed.vue'
import BotHealthCard from '../components/BotHealthCard.vue'
import PipelineSummaryCard from '../components/PipelineSummaryCard.vue'
import ByChannelCard from '../components/ByChannelCard.vue'

const store = useDashboardStore()
const auth  = useAuthStore()

type Range = 'today' | '7d' | '30d'
const selectedRange = ref<Range>('7d')

const rangeLabel = computed(() => {
  if (selectedRange.value === 'today') return 'Hoy'
  if (selectedRange.value === '7d')    return 'Últimos 7 días'
  return 'Últimos 30 días'
})

const rangeButtons: { key: Range; label: string }[] = [
  { key: 'today', label: 'Hoy' },
  { key: '7d',    label: 'Últimos 7 días' },
  { key: '30d',   label: 'Últimos 30 días' },
]

const greeting = computed(() => {
  const h = new Date().getHours()
  if (h < 12) return 'Buenos días'
  if (h < 20) return 'Buenas tardes'
  return 'Buenas noches'
})

const greetingName = computed(() => {
  const email = auth.user?.email
  if (!email) return ''
  return ', ' + email.split('@')[0]
})

const greetingSub = computed(() => {
  if (store.loading) return 'Cargando datos…'
  const bot   = store.botHandled
  const human = store.humanHandled
  if (!bot && !human) return 'Sin actividad reciente.'
  return `Tu bot manejó ${bot} conversaciones · ${human} con agente.`
})

onMounted(() => store.fetchDashboard())
</script>

<template>
  <div class="dashboard">

    <!-- Greeting + date range toggle -->
    <div class="dashboard__header">
      <div>
        <h2 class="dashboard__greeting">{{ greeting }}{{ greetingName }}.</h2>
        <p class="dashboard__greeting-sub">{{ greetingSub }}</p>
      </div>
      <div class="date-toggle">
        <button
          v-for="btn in rangeButtons"
          :key="btn.key"
          :class="['date-toggle__btn', { 'date-toggle__btn--active': selectedRange === btn.key }]"
          @click="selectedRange = btn.key"
        >
          {{ btn.label }}
        </button>
      </div>
    </div>

    <!-- KPI stat cards -->
    <div class="dashboard__stats">
      <StatCard v-for="s in store.stats" :key="s.label" :data="s" />
    </div>

    <!-- Main content grid -->
    <div class="dashboard__grid">
      <VolumeChart
        :data="store.volumeData"
        :range-label="rangeLabel"
        :total-messages="store.totalMessages"
        class="g-volume"
      />
      <ActivityFeed
        :items="store.activity"
        class="g-activity"
      />
      <BotHealthCard
        :pct="store.botPct"
        :bot-handled="store.botHandled"
        :human-handled="store.humanHandled"
        :avg-first-response-secs="store.avgFirstResponseSecs"
        class="g-bot"
      />
      <PipelineSummaryCard
        :stages="store.pipelineStages"
        :total-value="store.funnelTotalValue"
        :days="store.funnelDays"
        class="g-pipeline"
      />
      <ByChannelCard
        :channels="store.channels"
        class="g-channel"
      />
    </div>

  </div>
</template>

<style scoped>
.dashboard {
  padding: 32px 36px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-height: 100%;
}

/* ── Header ── */
.dashboard__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}
.dashboard__greeting {
  font-family: var(--font-hero);
  font-size: 40px;
  font-weight: 400;
  color: var(--ink);
  letter-spacing: -0.02em;
  line-height: 1.1;
}
.dashboard__greeting-sub {
  font-size: 14px;
  color: var(--ink-3);
  margin-top: 8px;
}

/* ── Date toggle ── */
.date-toggle {
  display: flex;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 4px;
  gap: 2px;
  flex-shrink: 0;
}
.date-toggle__btn {
  background: transparent;
  border: none;
  padding: 7px 16px;
  font-size: 13px;
  font-weight: 500;
  color: var(--ink-2);
  border-radius: 7px;
  transition: background 0.15s, color 0.15s;
  white-space: nowrap;
}
.date-toggle__btn:hover:not(.date-toggle__btn--active) {
  color: var(--ink);
}
.date-toggle__btn--active {
  background: var(--ink);
  color: var(--bg);
  font-weight: 600;
}

/* ── Stat cards row ── */
.dashboard__stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

/* ── Main grid ── */
.dashboard__grid {
  display: grid;
  grid-template-columns: 2fr 1.5fr 1.5fr;
  grid-template-rows: auto auto;
  gap: 16px;
}
.g-volume   { grid-column: 1; grid-row: 1; }
.g-activity { grid-column: 2; grid-row: 1 / 3; }
.g-bot      { grid-column: 3; grid-row: 1; }
.g-pipeline { grid-column: 1; grid-row: 2; }
.g-channel  { grid-column: 3; grid-row: 2; }
</style>

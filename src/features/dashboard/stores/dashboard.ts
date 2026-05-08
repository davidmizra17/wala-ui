import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from '@/shared/api'
import type { StatCardData, VolumeDay, ActivityItem, ChannelData, FunnelStage } from '../types'

// ── API shape ────────────────────────────────────────────────────────────────

interface KpiEntry {
  value: number
  change_pct: number | null
  sparkline: number[]
}

interface ApiResponse {
  kpis: {
    conversations: KpiEntry
    active_deals: KpiEntry
    avg_response_time_secs: KpiEntry
    conversion_rate_pct: KpiEntry
  }
  message_volume: { date: string; weekday: string; bot: number; human: number }[]
  activity: {
    conversation_id: string
    contact_name: string
    channel: string
    status: string
    last_message: string
    minutes_ago: number
  }[]
  bot_resolution: {
    bot_count: number
    human_count: number
    bot_pct: number
    avg_first_response_secs: number
  }
  by_channel: { channel: string; count: number; pct: number }[]
  funnel: {
    days: number
    total_value: number
    stages: { stage: string; label: string; count: number; value: number }[]
  }
}

// ── Formatters ───────────────────────────────────────────────────────────────

function formatSecondsAsTime(secs: number): string {
  const m = Math.floor(secs / 60)
  const s = secs % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

function formatMinutesAgo(mins: number): string {
  if (mins < 60) return `${mins}m`
  if (mins < 1440) return `${Math.round(mins / 60)}h`
  return `${Math.round(mins / 1440)}d`
}

function formatCurrency(value: number): string {
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}k`
  return `$${Math.round(value).toLocaleString('en-US')}`
}

function buildDelta(changePct: number | null): Pick<StatCardData, 'delta' | 'positive'> {
  if (changePct === null) return {}
  const positive = changePct >= 0
  return { delta: `${positive ? '+' : ''}${changePct.toFixed(1)}%`, positive }
}

function statusToType(status: string): ActivityItem['type'] {
  if (status === 'human_handling') return 'human'
  if (status === 'bot_handling') return 'bot'
  return 'new'
}

function channelName(raw: string): string {
  if (raw === 'whatsapp') return 'WhatsApp'
  if (raw === 'instagram') return 'Instagram'
  return raw
}

// ── Store ────────────────────────────────────────────────────────────────────

export const useDashboardStore = defineStore('dashboard', () => {
  const loading = ref(false)
  const error   = ref<string | null>(null)

  const stats              = ref<StatCardData[]>([])
  const volumeData         = ref<VolumeDay[]>([])
  const activity           = ref<ActivityItem[]>([])
  const botPct             = ref(0)
  const botHandled         = ref(0)
  const humanHandled       = ref(0)
  const avgFirstResponseSecs = ref(0)
  const pipelineStages     = ref<FunnelStage[]>([])
  const funnelTotalValue   = ref(0)
  const channels           = ref<ChannelData[]>([])

  const funnelDays = ref(30)

  const totalMessages = computed(() =>
    volumeData.value.reduce((sum, d) => sum + d.bot + d.human, 0)
  )

  async function fetchDashboard(): Promise<void> {
    loading.value = true
    error.value = null
    try {
      const data = await api.get<ApiResponse>('/api/v1/reporting/dashboard/')

      // KPI stat cards
      const kpi = data.kpis
      stats.value = [
        {
          label: 'Conversaciones',
          value: kpi.conversations.value.toLocaleString('en-US'),
          sparkline: kpi.conversations.sparkline,
          ...buildDelta(kpi.conversations.change_pct),
        },
        {
          label: 'Negocios activos',
          value: kpi.active_deals.value.toLocaleString('en-US'),
          sparkline: kpi.active_deals.sparkline,
          ...buildDelta(kpi.active_deals.change_pct),
        },
        {
          label: 'Tiempo de respuesta',
          value: formatSecondsAsTime(kpi.avg_response_time_secs.value),
          unit: 'min',
          sparkline: kpi.avg_response_time_secs.sparkline,
          ...buildDelta(kpi.avg_response_time_secs.change_pct),
        },
        {
          label: 'Tasa de conversión',
          value: kpi.conversion_rate_pct.value.toFixed(1),
          unit: '%',
          sparkline: kpi.conversion_rate_pct.sparkline,
          ...buildDelta(kpi.conversion_rate_pct.change_pct),
        },
      ]

      // Volume chart
      volumeData.value = data.message_volume.map(d => ({
        weekday: d.weekday,
        bot: d.bot,
        human: d.human,
      }))

      // Activity feed
      activity.value = data.activity.map(a => ({
        type: statusToType(a.status),
        who: a.contact_name,
        text: a.last_message,
        time: formatMinutesAgo(a.minutes_ago),
        channel: a.channel === 'whatsapp' ? 'wa' : 'ig',
      }))

      // Bot health
      const br = data.bot_resolution
      botPct.value               = Math.round(br.bot_pct)
      botHandled.value           = br.bot_count
      humanHandled.value         = br.human_count
      avgFirstResponseSecs.value = br.avg_first_response_secs

      // Funnel / pipeline
      funnelDays.value       = data.funnel.days
      funnelTotalValue.value = data.funnel.total_value
      pipelineStages.value   = data.funnel.stages.map(s => ({
        label: s.label,
        count: s.count,
        value: formatCurrency(s.value),
        isWon: s.stage === 'won',
      }))

      // By channel
      channels.value = data.by_channel.map(c => ({
        name: channelName(c.channel),
        count: c.count,
        pct: Math.round(c.pct * 10) / 10,
      }))
    } catch (err) {
      error.value = 'No se pudieron cargar los datos del dashboard'
      console.error('fetchDashboard error:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    loading, error,
    stats, volumeData, activity,
    botPct, botHandled, humanHandled, avgFirstResponseSecs,
    pipelineStages, funnelTotalValue, funnelDays,
    channels, totalMessages,
    fetchDashboard,
  }
})

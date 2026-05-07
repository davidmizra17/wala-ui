import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from '@/shared/api'
import type { Deal, KanbanColumn } from '../types'
import type { DealStage } from '@/shared/types'

const COLUMN_META: Record<DealStage, { label: string; color: string }> = {
  new:       { label: 'Nuevo',      color: 'var(--ink-3)'  },
  contacted: { label: 'Contactado', color: 'var(--info)'   },
  qualified: { label: 'Calificado', color: 'var(--accent)' },
  won:       { label: 'Ganado',     color: 'var(--good)'   },
  lost:      { label: 'Perdido',    color: 'var(--bad)'    },
}

const STAGE_ORDER: DealStage[] = ['new', 'contacted', 'qualified', 'won', 'lost']

interface BoardResponse {
  pipeline: { id: string; name: string; created: string; modified: string }
  columns: Array<{ stage: DealStage; label: string; deals: Deal[] }>
}

export const useCrmStore = defineStore('crm', () => {
  const deals = ref<Deal[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const columns = computed<KanbanColumn[]>(() =>
    STAGE_ORDER.map(stage => ({
      stage,
      ...COLUMN_META[stage],
      deals: deals.value.filter(d => d.stage === stage),
    }))
  )

  async function fetchBoard(): Promise<void> {
    loading.value = true
    error.value = null
    try {
      const data = await api.get<BoardResponse>('/api/v1/crm/board/')
      deals.value = data.columns.flatMap(col => col.deals)
    } catch (err: unknown) {
      const e = err as { status?: number }
      if (e.status === 404) {
        // No pipeline yet — create one, then retry
        await api.post('/api/v1/crm/pipelines/', { name: 'Main Pipeline' })
        const data = await api.get<BoardResponse>('/api/v1/crm/board/')
        deals.value = data.columns.flatMap(col => col.deals)
      } else {
        error.value = 'No se pudo cargar el pipeline'
        console.error('fetchBoard error:', err)
      }
    } finally {
      loading.value = false
    }
  }

  async function moveDeal(dealId: string, newStage: DealStage): Promise<void> {
    const deal = deals.value.find(d => d.id === dealId)
    if (!deal) return
    const previousStage = deal.stage
    deal.stage = newStage // optimistic update
    try {
      await api.patch(`/api/v1/crm/deals/${dealId}/`, { stage: newStage })
    } catch (err) {
      deal.stage = previousStage // rollback on failure
      console.error('moveDeal error:', err)
    }
  }

  async function createDeal(payload: {
    pipeline: string
    contact: string
    title: string
    stage?: DealStage
    value?: string
    conversation?: string
  }): Promise<Deal | null> {
    try {
      const deal = await api.post<Deal>('/api/v1/crm/deals/', payload)
      deals.value.unshift(deal)
      return deal
    } catch (err) {
      console.error('createDeal error:', err)
      return null
    }
  }

  async function deleteDeal(dealId: string): Promise<void> {
    try {
      await api.delete(`/api/v1/crm/deals/${dealId}/`)
      deals.value = deals.value.filter(d => d.id !== dealId)
    } catch (err) {
      console.error('deleteDeal error:', err)
    }
  }

  return { deals, loading, error, columns, fetchBoard, moveDeal, createDeal, deleteDeal }
})

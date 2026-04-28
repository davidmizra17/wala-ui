import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Deal, KanbanColumn } from '../types'
import type { DealStage } from '@/shared/types'

const COLUMNS: { stage: DealStage; label: string; color: string }[] = [
  { stage: 'new',       label: 'Nuevo',      color: 'var(--ink-3)' },
  { stage: 'contacted', label: 'Contactado', color: 'var(--info)' },
  { stage: 'qualified', label: 'Calificado', color: 'var(--accent)' },
  { stage: 'won',       label: 'Ganado',     color: 'var(--good)' },
  { stage: 'lost',      label: 'Perdido',    color: 'var(--bad)' },
]

const DUMMY_DEALS: Deal[] = [
  { id:'d1', pipeline:'p1', contact:'c1', contact_name:'Ana Zamora',     title:'Ramo de cumpleaños',           stage:'new',       value:'45.00',    conversation:'cv1', order:null, tasks:[], channel:'wa', botSourced:true,  tags:['ramo'],     created:'2026-04-20T10:00:00Z', modified:'2026-04-22T09:00:00Z' },
  { id:'d2', pipeline:'p1', contact:'c2', contact_name:'Carmen Rivas',   title:'Arreglo de bautizo',           stage:'new',       value:'120.00',   conversation:'cv2', order:null, tasks:[], channel:'wa', botSourced:true,               created:'2026-04-20T11:00:00Z', modified:'2026-04-22T09:00:00Z' },
  { id:'d3', pipeline:'p1', contact:'c3', contact_name:'Juan Paredes',   title:'Rosas San Valentín',           stage:'new',       value:'280.00',   conversation:null,  order:null, tasks:[], channel:'ig', tags:['VIP'],                   created:'2026-04-20T12:00:00Z', modified:'2026-04-22T09:00:00Z' },
  { id:'d4', pipeline:'p1', contact:'c4', contact_name:'BBVA Empresas',  title:'Flores corporativas',          stage:'contacted', value:'1200.00',  conversation:'cv4', order:null, tasks:[], channel:'wa', tags:['B2B'],  priority:'high',   created:'2026-04-19T10:00:00Z', modified:'2026-04-22T09:00:00Z' },
  { id:'d5', pipeline:'p1', contact:'c5', contact_name:'Rita Morales',   title:'Centro de mesa',               stage:'contacted', value:'180.00',   conversation:'cv5', order:null, tasks:[], channel:'wa',                                 created:'2026-04-19T11:00:00Z', modified:'2026-04-22T09:00:00Z' },
  { id:'d6', pipeline:'p1', contact:'c6', contact_name:'Mariana Flores', title:'Boda Mariana & José',          stage:'qualified', value:'2800.00',  conversation:'cv6', order:null, tasks:[], channel:'wa', tags:['boda','VIP'], priority:'high', created:'2026-04-18T10:00:00Z', modified:'2026-04-22T09:00:00Z' },
  { id:'d7', pipeline:'p1', contact:'c7', contact_name:'Bancamiga',      title:'Evento corporativo Bancamiga', stage:'qualified', value:'1420.00',  conversation:'cv7', order:null, tasks:[], channel:'wa', tags:['B2B'],                   created:'2026-04-18T11:00:00Z', modified:'2026-04-22T09:00:00Z' },
  { id:'d8', pipeline:'p1', contact:'c8', contact_name:'Valeria García', title:'15 años — Valeria G.',         stage:'won',       value:'1600.00',  conversation:'cv8', order:null, tasks:[], channel:'ig', tags:['evento'],                created:'2026-04-15T10:00:00Z', modified:'2026-04-22T09:00:00Z' },
  { id:'d9', pipeline:'p1', contact:'c9', contact_name:'Gabriela Pérez', title:'Cumpleaños — Gabriela P.',     stage:'won',       value:'65.00',    conversation:'cv9', order:null, tasks:[], channel:'wa',                                 created:'2026-04-14T10:00:00Z', modified:'2026-04-22T09:00:00Z' },
  { id:'d10',pipeline:'p1', contact:'c10',contact_name:'Lucas Medina',   title:'Arreglo rechazado',            stage:'lost',      value:'95.00',    conversation:null,  order:null, tasks:[], channel:'wa',                                 created:'2026-04-10T10:00:00Z', modified:'2026-04-22T09:00:00Z' },
]

export const useCrmStore = defineStore('crm', () => {
  const deals = ref<Deal[]>(DUMMY_DEALS)

  const columns = computed<KanbanColumn[]>(() =>
    COLUMNS.map(col => ({
      ...col,
      deals: deals.value.filter(d => d.stage === col.stage),
    }))
  )

  function moveDeal(dealId: string, newStage: DealStage) {
    const deal = deals.value.find(d => d.id === dealId)
    if (deal) deal.stage = newStage
  }

  return { deals, columns, moveDeal }
})

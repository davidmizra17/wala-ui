import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { StatCardData, ActivityItem, AgentRow } from '../types'

export const useDashboardStore = defineStore('dashboard', () => {
  const stats = ref<StatCardData[]>([
    { label: 'Conversaciones', value: '1,284', delta: '+12%', positive: true, sparkline: [20,28,22,34,30,42,38,50,46,58,52,68] },
    { label: 'Negocios activos', value: '63', delta: '+8%', positive: true, sparkline: [40,42,48,44,52,58,55,62,60,66,64,63] },
    { label: 'Tiempo de respuesta', value: '0:04', unit: 'min', delta: '−24%', positive: true, sparkline: [12,10,11,9,10,8,7,6,6,5,4,4] },
    { label: 'Tasa de conversión', value: '18', unit: '%', delta: '+2.4%', positive: true, sparkline: [12,13,14,13,15,14,16,15,17,16,18,18] },
  ])

  const volumeData = ref([
    [42,28],[38,31],[55,40],[48,36],[61,45],[52,39],[29,20],
    [44,32],[58,43],[67,48],[72,55],[63,47],[70,52],[89,68],
  ])

  const pipelineStages = ref([
    { label: 'Nuevo', count: 24, value: '$4.2k' },
    { label: 'Contactado', count: 18, value: '$6.8k' },
    { label: 'Calificado', count: 9,  value: '$5.1k' },
    { label: 'Ganado', count: 7,  value: '$4.6k', isWon: true },
  ])

  const activity = ref<ActivityItem[]>([
    { type: 'bot',   who: 'Carolina Pérez',  text: 'Preguntó por arreglos de novia', time: '2m',  channel: 'wa' },
    { type: 'won',   who: 'Luis Meléndez',   text: '→ Ganado · $340',                time: '14m', channel: 'wa' },
    { type: 'human', who: 'Andreína Silva',  text: 'Escaló a humano',                time: '27m', channel: 'ig' },
    { type: 'new',   who: 'Rodrigo Ibarra',  text: 'Nuevo contacto',                 time: '41m', channel: 'wa' },
    { type: 'bot',   who: 'Verónica Mata',   text: 'Consulta sobre entrega',         time: '1h',  channel: 'wa' },
    { type: 'human', who: 'Gabriel Torres',  text: 'Respondió la propuesta',         time: '1h',  channel: 'ig' },
  ])

  const agents = ref<AgentRow[]>([
    { name: 'Andrés L.', initials: 'AL', messages: 148, responseTime: '0:06', closed: 12 },
    { name: 'Sofía R.',  initials: 'SR', messages: 112, responseTime: '0:09', closed: 8 },
    { name: 'Miguel T.', initials: 'MT', messages: 94,  responseTime: '0:12', closed: 6 },
  ])

  const botPct = ref(72)
  const botHandled = ref(924)
  const humanHandled = ref(360)

  return { stats, volumeData, pipelineStages, activity, agents, botPct, botHandled, humanHandled }
})

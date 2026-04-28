import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { SettingsTab, BotTone, EscalationRule, Channel } from '../types'

export const useSettingsStore = defineStore('settings', () => {
  const activeTab = ref<SettingsTab>('bot')

  const botTone = ref<BotTone>('friendly')

  const botInstructions = ref(
    `Eres el asistente de Florería La Orquídea, en Caracas.\nAyuda a clientes a elegir arreglos florales para bodas, cumpleaños, funerales y fechas especiales.\nEntregamos dentro de Caracas (flota propia) y al interior por encomienda.\nPrecios desde $25. Siempre pide: fecha del evento, colores preferidos, presupuesto aproximado.\nSi piden arreglo de luto o piden hablar con una persona, escala de inmediato.`
  )

  const escalationRules = ref<EscalationRule[]>([
    { id:'low-conf',  label:'Confianza baja',   description:'El bot no está seguro de la respuesta', enabled:true },
    { id:'req-human', label:'Cliente lo pide',   description:'Cliente pide hablar con una persona',   enabled:true },
    { id:'sensitive', label:'Tema delicado',      description:'Funerales, reclamos, salud',            enabled:true },
    { id:'off-hours', label:'Fuera de horario',   description:'Notificar pero no responder',           enabled:false },
  ])

  const channels = ref<Channel[]>([
    { id:'ch1', platform:'whatsapp', name:'WhatsApp Business', handle:'+58 414 231 0988', is_active:true, messages_this_month:1204 },
    { id:'ch2', platform:'instagram', name:'Instagram DM',    handle:'@floreria_la_orquidea', is_active:true, messages_this_month:178 },
  ])

  function toggleEscalation(id: string) {
    const rule = escalationRules.value.find(r => r.id === id)
    if (rule) rule.enabled = !rule.enabled
  }

  return { activeTab, botTone, botInstructions, escalationRules, channels, toggleEscalation }
})

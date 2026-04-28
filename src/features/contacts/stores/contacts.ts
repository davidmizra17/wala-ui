import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Contact } from '../types'

const DUMMY: Contact[] = [
  {
    id: 'c1', external_id: '+584142310988',
    name: 'Carolina Pérez', phone: '+58 414 231 0988', email: '',
    platform: 'whatsapp', location: 'Caracas, VE',
    tags: ['Lead', 'VIP', 'recomendada', 'novia'],
    notes: 'Se casa en julio. Paleta blanco/verde, busca cascada de rosas. Le gustó el arreglo #4 del catálogo. Su novio se llama Javier.',
    botSuggestion: 'Según el historial, probablemente pregunte por precios esta semana.',
    lastSeen: '2m', firstContact: 'Mar 14, 2026', lastContact: 'hace 2 min',
    conversations: 3, deals: '1 · $45',
    timeline: [
      { type: 'bot',   time: 'Hoy 10:42', title: 'Bot respondió sobre arreglos de novia', sub: 'WhatsApp · 3 msg' },
      { type: 'deal',  time: 'Hoy 10:40', title: 'Negocio creado automáticamente · $45',  sub: 'Etapa: Nuevo' },
      { type: 'human', time: 'Abr 22',    title: 'Andrés envió el catálogo',               sub: 'PDF · 2.4 MB' },
      { type: 'new',   time: 'Mar 14',    title: 'Primer contacto',                        sub: 'WhatsApp' },
    ],
    created: '2026-03-14T10:00:00Z', modified: '2026-04-28T10:42:00Z',
  },
  {
    id: 'c2', external_id: '+584245512004',
    name: 'Luis Meléndez', phone: '+58 406 551 2004', email: '',
    platform: 'whatsapp', location: 'Caracas, VE',
    tags: ['cliente'], notes: '',
    lastSeen: '14m', firstContact: 'Abr 1, 2026', lastContact: 'hace 14 min',
    conversations: 5, deals: '1 · $340',
    timeline: [
      { type: 'deal', time: 'Hoy 10:40', title: '→ Won · $340', sub: 'Etapa: Ganado' },
      { type: 'new',  time: 'Abr 1',     title: 'Primer contacto', sub: 'WhatsApp' },
    ],
    created: '2026-04-01T10:00:00Z', modified: '2026-04-28T10:14:00Z',
  },
  {
    id: 'c3', external_id: '@andreina_s',
    name: 'Andreína Silva', phone: '', email: '',
    platform: 'instagram', location: 'Valencia, VE',
    tags: ['Lead'], notes: '',
    lastSeen: '27m', firstContact: 'Abr 5, 2026', lastContact: 'hace 27 min',
    conversations: 2, deals: '0',
    timeline: [
      { type: 'human', time: 'Hoy 10:01', title: 'Escalado a humano', sub: 'Instagram' },
      { type: 'new',   time: 'Abr 5',     title: 'Primer contacto',   sub: 'Instagram' },
    ],
    created: '2026-04-05T10:00:00Z', modified: '2026-04-28T10:01:00Z',
  },
  {
    id: 'c4', external_id: '+584129934771',
    name: 'Rodrigo Ibarra', phone: '+58 414 994 9773', email: 'rodrigo@bbva.com',
    platform: 'whatsapp', location: 'Caracas, VE',
    tags: ['B2B'], notes: 'Contacto corporativo BBVA',
    lastSeen: '41m', firstContact: 'Abr 10, 2026', lastContact: 'hace 41 min',
    conversations: 1, deals: '0',
    timeline: [
      { type: 'new', time: 'Abr 10', title: 'Nuevo contacto', sub: 'WhatsApp' },
    ],
    created: '2026-04-10T10:00:00Z', modified: '2026-04-28T09:47:00Z',
  },
  {
    id: 'c5', external_id: '+584141124503',
    name: 'Verónica Mata', phone: '+58 414 112 4503', email: '',
    platform: 'whatsapp', location: 'Maracaibo, VE',
    tags: ['cliente', 'VIP'], notes: '',
    lastSeen: '1h', firstContact: 'Abr 12, 2026', lastContact: 'hace 1h',
    conversations: 4, deals: '2 · $180',
    timeline: [
      { type: 'bot', time: 'Hoy 09:28', title: 'Consulta sobre entrega', sub: 'WhatsApp · 2 msg' },
      { type: 'new', time: 'Abr 12',    title: 'Primer contacto',        sub: 'WhatsApp' },
    ],
    created: '2026-04-12T10:00:00Z', modified: '2026-04-28T09:28:00Z',
  },
  {
    id: 'c6', external_id: '@gabtorres',
    name: 'Gabriel Torres', phone: '', email: '',
    platform: 'instagram', location: 'Caracas, VE',
    tags: ['Lead'], notes: '',
    lastSeen: '1h', firstContact: 'Abr 14, 2026', lastContact: 'hace 1h',
    conversations: 1, deals: '0',
    timeline: [
      { type: 'human', time: 'Hoy 09:28', title: 'Respondió la propuesta', sub: 'Instagram' },
      { type: 'new',   time: 'Abr 14',    title: 'Primer contacto',        sub: 'Instagram' },
    ],
    created: '2026-04-14T10:00:00Z', modified: '2026-04-28T09:28:00Z',
  },
  {
    id: 'c7', external_id: '+584247790012',
    name: 'Mariana Flores', phone: '+58 424 779 0012', email: 'mariana@email.com',
    platform: 'whatsapp', location: 'Caracas, VE',
    tags: ['VIP', 'boda'], notes: 'Boda en julio con Javier.',
    lastSeen: '3h', firstContact: 'Abr 15, 2026', lastContact: 'hace 3h',
    conversations: 2, deals: '0',
    timeline: [
      { type: 'new', time: 'Abr 15', title: 'Primer contacto', sub: 'WhatsApp' },
    ],
    created: '2026-04-15T10:00:00Z', modified: '2026-04-28T07:28:00Z',
  },
  {
    id: 'c8', external_id: '+584123345601',
    name: 'José Paredes', phone: '+58 419 334 5601', email: '',
    platform: 'whatsapp', location: 'Valencia, VE',
    tags: [], notes: '',
    lastSeen: '5h', firstContact: 'Abr 16, 2026', lastContact: 'hace 5h',
    conversations: 1, deals: '0',
    timeline: [
      { type: 'new', time: 'Abr 16', title: 'Primer contacto', sub: 'WhatsApp' },
    ],
    created: '2026-04-16T10:00:00Z', modified: '2026-04-28T05:28:00Z',
  },
  {
    id: 'c9', external_id: '@carmenrivas_',
    name: 'Carmen Rivas', phone: '', email: '',
    platform: 'instagram', location: 'Caracas, VE',
    tags: ['Lead'], notes: '',
    lastSeen: '1d', firstContact: 'Abr 17, 2026', lastContact: 'ayer',
    conversations: 1, deals: '0',
    timeline: [
      { type: 'new', time: 'Abr 17', title: 'Primer contacto', sub: 'Instagram' },
    ],
    created: '2026-04-17T10:00:00Z', modified: '2026-04-27T10:00:00Z',
  },
  {
    id: 'c10', external_id: '+584142200194',
    name: 'Juan Ramírez', phone: '+58 414 220 0194', email: '',
    platform: 'whatsapp', location: 'Barquisimeto, VE',
    tags: [], notes: '',
    lastSeen: '2d', firstContact: 'Abr 18, 2026', lastContact: 'hace 2d',
    conversations: 1, deals: '0',
    timeline: [
      { type: 'new', time: 'Abr 18', title: 'Primer contacto', sub: 'WhatsApp' },
    ],
    created: '2026-04-18T10:00:00Z', modified: '2026-04-26T10:00:00Z',
  },
  {
    id: 'c11', external_id: '+584244878015',
    name: 'Elena Montes', phone: '+58 424 487 8015', email: '',
    platform: 'whatsapp', location: 'Caracas, VE',
    tags: ['Lead'], notes: '',
    lastSeen: '2d', firstContact: 'Abr 19, 2026', lastContact: 'hace 2d',
    conversations: 1, deals: '0',
    timeline: [
      { type: 'new', time: 'Abr 19', title: 'Primer contacto', sub: 'WhatsApp' },
    ],
    created: '2026-04-19T10:00:00Z', modified: '2026-04-26T10:00:00Z',
  },
]

export const useContactsStore = defineStore('contacts', () => {
  const contacts  = ref<Contact[]>(DUMMY)
  const selectedId = ref<string | null>('c1')
  const search     = ref('')

  const filtered = computed(() => {
    const q = search.value.toLowerCase()
    return q
      ? contacts.value.filter(c =>
          c.name.toLowerCase().includes(q) ||
          c.phone.includes(q) ||
          c.external_id.includes(q)
        )
      : contacts.value
  })

  const selected = computed(() =>
    contacts.value.find(c => c.id === selectedId.value) ?? null
  )

  function select(id: string) { selectedId.value = id }

  return { contacts, selectedId, search, filtered, selected, select }
})

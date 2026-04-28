import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Contact } from '../types'

const DUMMY: Contact[] = [
  { id:'c1', external_id:'+584142310988', name:'Carolina Pérez',  phone:'+58 414 231 0988', email:'',                     platform:'whatsapp', tags:['Lead','VIP'],      notes:'Se casa en julio. Paleta blanco/verde.',   created:'2026-03-14T10:00:00Z', modified:'2026-04-22T10:40:00Z' },
  { id:'c2', external_id:'+584245512004', name:'Luis Meléndez',   phone:'+58 424 551 2004', email:'',                     platform:'whatsapp', tags:['cliente'],         notes:'',                                        created:'2026-04-01T10:00:00Z', modified:'2026-04-22T09:14:00Z' },
  { id:'c3', external_id:'@andreina_s',   name:'Andreína Silva',  phone:'',                 email:'',                     platform:'instagram', tags:['Lead'],           notes:'',                                        created:'2026-04-05T10:00:00Z', modified:'2026-04-22T09:27:00Z' },
  { id:'c4', external_id:'+584129934771', name:'Rodrigo Ibarra',  phone:'+58 412 993 4771', email:'rodrigo@bbva.com',     platform:'whatsapp', tags:['B2B'],             notes:'Contacto corporativo BBVA',               created:'2026-04-10T10:00:00Z', modified:'2026-04-22T08:41:00Z' },
  { id:'c5', external_id:'+584141124503', name:'Verónica Mata',   phone:'+58 414 112 4503', email:'',                     platform:'whatsapp', tags:['cliente','VIP'],   notes:'',                                        created:'2026-04-12T10:00:00Z', modified:'2026-04-22T09:00:00Z' },
  { id:'c6', external_id:'@gabtorres',    name:'Gabriel Torres',  phone:'',                 email:'',                     platform:'instagram', tags:['Lead'],           notes:'',                                        created:'2026-04-14T10:00:00Z', modified:'2026-04-22T09:00:00Z' },
  { id:'c7', external_id:'+584247790012', name:'Mariana Flores',  phone:'+58 424 779 0012', email:'mariana@email.com',    platform:'whatsapp', tags:['VIP','boda'],      notes:'Boda en julio con Javier.',               created:'2026-04-15T10:00:00Z', modified:'2026-04-22T08:00:00Z' },
  { id:'c8', external_id:'+584123345601', name:'José Paredes',    phone:'+58 412 334 5601', email:'',                     platform:'whatsapp', tags:[],                  notes:'',                                        created:'2026-04-16T10:00:00Z', modified:'2026-04-22T07:00:00Z' },
  { id:'c9', external_id:'@carmenrivas_', name:'Carmen Rivas',    phone:'',                 email:'',                     platform:'instagram', tags:['Lead'],           notes:'',                                        created:'2026-04-17T10:00:00Z', modified:'2026-04-21T10:00:00Z' },
  { id:'c10',external_id:'+584142200194', name:'Juan Ramírez',    phone:'+58 414 220 0194', email:'',                     platform:'whatsapp', tags:[],                  notes:'',                                        created:'2026-04-18T10:00:00Z', modified:'2026-04-20T10:00:00Z' },
]

export const useContactsStore = defineStore('contacts', () => {
  const contacts = ref<Contact[]>(DUMMY)
  const selectedId = ref<string | null>('c1')
  const search = ref('')

  const filtered = computed(() => {
    const q = search.value.toLowerCase()
    return q ? contacts.value.filter(c => c.name.toLowerCase().includes(q) || c.phone.includes(q)) : contacts.value
  })

  const selected = computed(() => contacts.value.find(c => c.id === selectedId.value) ?? null)

  function select(id: string) { selectedId.value = id }

  return { contacts, selectedId, search, filtered, selected, select }
})

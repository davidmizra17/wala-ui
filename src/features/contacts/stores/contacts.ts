import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from '@/shared/api'
import type { Contact } from '../types'
import type { UUID } from '@/shared/types'

interface ApiContact {
  id: UUID
  external_id: string
  name: string
  phone: string
  email: string
  platform: 'whatsapp' | 'instagram'
  tags: string[]
  notes: string
  created: string
  modified: string
}

function mapApiContact(c: ApiContact): Contact {
  return {
    id: c.id,
    external_id: c.external_id,
    name: c.name,
    phone: c.phone,
    email: c.email,
    platform: c.platform,
    tags: c.tags,
    notes: c.notes,
    created: c.created,
    modified: c.modified,
  }
}

export const useContactsStore = defineStore('contacts', () => {
  const contacts   = ref<Contact[]>([])
  const selectedId = ref<string | null>(null)
  const search     = ref('')
  const loading    = ref(false)
  const error      = ref<string | null>(null)

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

  async function fetchContacts(): Promise<void> {
    loading.value = true
    error.value = null
    try {
      const data = await api.get<ApiContact[]>('/api/v1/contacts/')
      contacts.value = data.map(mapApiContact)
      if (contacts.value.length && !selectedId.value) {
        selectedId.value = contacts.value[0].id
      }
    } catch (err) {
      error.value = 'No se pudieron cargar los contactos'
      console.error('fetchContacts error:', err)
    } finally {
      loading.value = false
    }
  }

  async function updateContact(id: string, patch: { tags?: string[]; notes?: string; name?: string }): Promise<void> {
    try {
      const data = await api.patch<ApiContact>(`/api/v1/contacts/${id}/`, patch)
      const idx = contacts.value.findIndex(c => c.id === id)
      if (idx !== -1) contacts.value[idx] = mapApiContact(data)
    } catch (err) {
      console.error('updateContact error:', err)
    }
  }

  function select(id: string): void {
    selectedId.value = id
  }

  return { contacts, selectedId, search, loading, error, filtered, selected, fetchContacts, updateContact, select }
})

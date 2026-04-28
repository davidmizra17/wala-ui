import type { BaseEntity, Platform } from '@/shared/types'

export interface Contact extends BaseEntity {
  external_id: string
  name: string
  phone: string
  email: string
  platform: Platform
  tags: string[]
  notes: string
  location?: string
  lastSeen?: string
  firstContact?: string
  lastContact?: string
  conversations?: number
  deals?: string
  timeline?: TimelineEvent[]
  botSuggestion?: string
}

export interface TimelineEvent {
  type: 'bot' | 'deal' | 'human' | 'new'
  time: string
  title: string
  sub: string
}

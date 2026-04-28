export type UUID = string

export type Platform = 'whatsapp' | 'instagram'

export type ConversationStatus = 'bot_handling' | 'human_handling' | 'closed'

export type DealStage = 'new' | 'contacted' | 'qualified' | 'won' | 'lost'

export type UserRole = 'owner' | 'agent'

export type OrderStatus = 'NEW' | 'CONTACTED' | 'PAID' | 'SHIPPED'

export interface BaseEntity {
  id: UUID
  created: string
  modified: string
}

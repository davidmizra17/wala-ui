import type { UUID, BaseEntity, Platform, DealStage } from '@/shared/types'

export interface DealTask {
  id: UUID
  deal: UUID
  title: string
  due_date: string | null
  assigned_to: UUID | null
  is_done: boolean
  created: string
}

export interface Deal extends BaseEntity {
  pipeline: UUID
  contact: UUID
  contact_name: string
  title: string
  stage: DealStage
  value: string
  conversation: UUID | null
  order: UUID | null
  tasks: DealTask[]
  channel?: Platform
  priority?: 'high' | 'med' | 'low'
  tags?: string[]
  botSourced?: boolean
}

export interface KanbanColumn {
  stage: DealStage
  label: string
  color: string
  deals: Deal[]
}

import type { UUID, BaseEntity, Platform } from '@/shared/types'

export interface Task extends BaseEntity {
  deal: UUID | null
  title: string
  subtitle?: string
  deal_label?: string
  due_date: string | null
  due_display: string
  assigned_to: UUID | null
  assignee_initials: string
  is_done: boolean
  overdue: boolean
  priority?: 'high' | 'med' | 'low'
  channel?: Platform
}

export type TaskGroup = 'overdue' | 'today' | 'upcoming'

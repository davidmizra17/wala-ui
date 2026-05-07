import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from '@/shared/api'
import type { Task } from '../types'
import type { UUID } from '@/shared/types'

interface ApiTask {
  id: UUID
  deal: UUID | null
  title: string
  due_date: string | null
  assigned_to: UUID | null
  is_done: boolean
  created: string
}

function todayStr(): string {
  return new Date().toISOString().split('T')[0]
}

function isOverdue(due_date: string | null): boolean {
  return !!due_date && due_date < todayStr()
}

function isToday(due_date: string | null): boolean {
  return due_date === todayStr()
}

function formatDueDisplay(due_date: string | null): string {
  if (!due_date) return ''
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due = new Date(due_date + 'T00:00:00')
  const diffDays = Math.round((due.getTime() - today.getTime()) / 86400000)
  if (diffDays < -1) return `hace ${Math.abs(diffDays)} días`
  if (diffDays === -1) return 'ayer'
  if (diffDays === 0) return 'hoy'
  if (diffDays === 1) return 'mañana'
  return due.toLocaleDateString('es', { month: 'short', day: 'numeric' })
}

function mapApiTask(t: ApiTask): Task {
  return {
    id: t.id,
    deal: t.deal,
    title: t.title,
    due_date: t.due_date,
    due_display: formatDueDisplay(t.due_date),
    assigned_to: t.assigned_to,
    assignee_initials: '',
    is_done: t.is_done,
    overdue: isOverdue(t.due_date),
    created: t.created,
    modified: t.created,
  }
}

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])
  const activeView = ref('all')
  const loading = ref(false)
  const error = ref<string | null>(null)

  const overdue  = computed(() => tasks.value.filter(t => isOverdue(t.due_date) && !t.is_done))
  const today    = computed(() => tasks.value.filter(t => isToday(t.due_date)))
  const upcoming = computed(() => tasks.value.filter(t => !isOverdue(t.due_date) && !isToday(t.due_date) && !t.is_done))

  async function fetchTasks(dealId?: string): Promise<void> {
    loading.value = true
    error.value = null
    try {
      const path = dealId
        ? `/api/v1/crm/tasks/?deal=${dealId}`
        : '/api/v1/crm/tasks/'
      const data = await api.get<ApiTask[]>(path)
      tasks.value = data.map(mapApiTask)
    } catch (err) {
      error.value = 'No se pudieron cargar las tareas'
      console.error('fetchTasks error:', err)
    } finally {
      loading.value = false
    }
  }

  async function toggleDone(id: string): Promise<void> {
    const task = tasks.value.find(t => t.id === id)
    if (!task) return
    task.is_done = !task.is_done // optimistic
    try {
      await api.patch(`/api/v1/crm/tasks/${id}/`, { is_done: task.is_done })
    } catch (err) {
      task.is_done = !task.is_done // rollback
      console.error('toggleDone error:', err)
    }
  }

  async function createTask(payload: {
    deal: string
    title: string
    due_date?: string
    assigned_to?: string
  }): Promise<Task | null> {
    try {
      const data = await api.post<ApiTask>('/api/v1/crm/tasks/', payload)
      const task = mapApiTask(data)
      tasks.value.push(task)
      return task
    } catch (err) {
      console.error('createTask error:', err)
      return null
    }
  }

  async function deleteTask(id: string): Promise<void> {
    try {
      await api.delete(`/api/v1/crm/tasks/${id}/`)
      tasks.value = tasks.value.filter(t => t.id !== id)
    } catch (err) {
      console.error('deleteTask error:', err)
    }
  }

  return { tasks, activeView, loading, error, overdue, today, upcoming, fetchTasks, toggleDone, createTask, deleteTask }
})

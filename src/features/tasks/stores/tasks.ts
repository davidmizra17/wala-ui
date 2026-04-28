import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Task } from '../types'

const DUMMY: Task[] = [
  { id:'t1', deal:'d4', title:'Enviar catálogo a BBVA Empresas',          subtitle:'Rodrigo Ibarra', deal_label:'BBVA · $1,200', due_date:'2026-04-20', due_display:'hace 2 días', assigned_to:'u1', assignee_initials:'AL', is_done:false, overdue:true,  priority:'high', channel:'wa',  created:'2026-04-18T10:00:00Z', modified:'2026-04-22T09:00:00Z' },
  { id:'t2', deal:'d6', title:'Confirmar paleta de colores — Boda Mariana', subtitle:'Mariana Flores', deal_label:'Boda · $2,800', due_date:'2026-04-21', due_display:'hace 1 día',  assigned_to:'u2', assignee_initials:'MC', is_done:false, overdue:true,  priority:'high', channel:'wa',  created:'2026-04-18T10:00:00Z', modified:'2026-04-22T09:00:00Z' },
  { id:'t3', deal:'d7', title:'Cotizar arreglos para funeral',              subtitle:'Reyes',          deal_label:'',             due_date:'2026-04-21', due_display:'ayer',          assigned_to:'u3', assignee_initials:'SR', is_done:false, overdue:true,  priority:'med',  channel:'wa',  created:'2026-04-19T10:00:00Z', modified:'2026-04-22T09:00:00Z' },
  { id:'t4', deal:'d1', title:'Llamar a Carolina Pérez sobre su boda',     subtitle:'Carolina Pérez', deal_label:'$45 → $2,800?', due_date:'2026-04-22', due_display:'3:00 PM',       assigned_to:'u1', assignee_initials:'AL', is_done:false, overdue:false, priority:'high', channel:'wa',  created:'2026-04-20T10:00:00Z', modified:'2026-04-22T09:00:00Z' },
  { id:'t5', deal:'d7', title:'Revisar propuesta de Bancamiga',             subtitle:'Evento corp.',   deal_label:'Bancamiga · $1,420', due_date:'2026-04-22', due_display:'5:00 PM', assigned_to:'u2', assignee_initials:'MC', is_done:false, overdue:false, priority:'med',  channel:'wa',  created:'2026-04-20T10:00:00Z', modified:'2026-04-22T09:00:00Z' },
  { id:'t6', deal:'d8', title:'Preparar muestra — 15 años Valeria',        subtitle:'Valeria G.',     deal_label:'',             due_date:'2026-04-22', due_display:'6:00 PM',       assigned_to:'u3', assignee_initials:'MT', is_done:false, overdue:false, priority:'low',  channel:'ig',  created:'2026-04-20T10:00:00Z', modified:'2026-04-22T09:00:00Z' },
  { id:'t7', deal:'d2', title:'Enviar confirmación a Luis Meléndez',       subtitle:'Luis Meléndez',  deal_label:'$340',         due_date:'2026-04-22', due_display:'hecho 10:12',   assigned_to:'u1', assignee_initials:'AL', is_done:true,  overdue:false, priority:'low',  channel:'wa',  created:'2026-04-20T10:00:00Z', modified:'2026-04-22T10:12:00Z' },
  { id:'t8', deal:'d3', title:'Llamar a Andreína para cierre',             subtitle:'Andreína Silva', deal_label:'',             due_date:'2026-04-23', due_display:'mañana',        assigned_to:'u3', assignee_initials:'SR', is_done:false, overdue:false, priority:'low',  channel:'ig',  created:'2026-04-20T10:00:00Z', modified:'2026-04-22T09:00:00Z' },
  { id:'t9', deal:'d4', title:'Enviar muestras a Bancamiga',               subtitle:'Bancamiga',      deal_label:'B2B',          due_date:'2026-04-25', due_display:'en 3 días',     assigned_to:'u1', assignee_initials:'AL', is_done:false, overdue:false, priority:'low',  channel:'wa',  created:'2026-04-20T10:00:00Z', modified:'2026-04-22T09:00:00Z' },
  { id:'t10',deal:null, title:'Seguimiento campaña Día de la Madre',       subtitle:'48 clientes',    deal_label:'',             due_date:'2026-05-04', due_display:'May 04',        assigned_to:'u2', assignee_initials:'MC', is_done:false, overdue:false, priority:'low',  channel:undefined, created:'2026-04-20T10:00:00Z', modified:'2026-04-22T09:00:00Z' },
]

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>(DUMMY)
  const activeView = ref('all')

  const overdue  = computed(() => tasks.value.filter(t => t.overdue && !t.is_done))
  const today    = computed(() => tasks.value.filter(t => !t.overdue && t.due_display.includes(':') || t.due_display.startsWith('hecho')))
  const upcoming = computed(() => tasks.value.filter(t => !t.overdue && !t.due_display.includes(':') && !t.due_display.startsWith('hecho')))

  function toggleDone(id: string) {
    const task = tasks.value.find(t => t.id === id)
    if (task) task.is_done = !task.is_done
  }

  return { tasks, activeView, overdue, today, upcoming, toggleDone }
})

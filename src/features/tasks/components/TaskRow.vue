<script setup lang="ts">
import type { Task } from '../types'
import WalaIcon from '@/shared/components/WalaIcon.vue'

defineProps<{
  task: Task
  group: 'overdue' | 'today' | 'upcoming'
}>()

const emit = defineEmits<{ toggle: [id: string] }>()
</script>

<template>
  <div
    class="task-row"
    :class="{
      'task-row--done':    task.is_done,
      'task-row--overdue': group === 'overdue',
      'task-row--today':   group === 'today' && !task.is_done,
      'task-row--done-today': group === 'today' && task.is_done,
    }"
  >
    <!-- Checkbox -->
    <button
      class="task-row__check"
      :class="{
        'task-row__check--done':    task.is_done,
        'task-row__check--overdue': group === 'overdue',
      }"
      @click="emit('toggle', task.id)"
    >
      <WalaIcon v-if="task.is_done" name="check" :size="12" color="currentColor" :stroke="2.2" />
    </button>

    <!-- Body -->
    <div class="task-row__body">
      <p class="task-row__title">{{ task.title }}</p>
      <p v-if="task.subtitle || task.deal_label" class="task-row__meta">
        <span v-if="task.channel" class="task-row__channel-dot" :class="`task-row__channel-dot--${task.channel}`" />
        <span>{{ task.subtitle }}</span>
        <template v-if="task.deal_label">
          <span class="task-row__sep">·</span>
          <span>{{ task.deal_label }}</span>
        </template>
      </p>
    </div>

    <!-- Right: due + assignee -->
    <div class="task-row__right">
      <span
        class="task-row__due"
        :class="{
          'task-row__due--overdue': group === 'overdue',
          'task-row__due--done':    task.is_done,
        }"
      >
        <WalaIcon v-if="group === 'overdue'" name="clock" :size="11" color="currentColor" />
        {{ task.due_display }}
      </span>
      <span class="task-row__avatar">{{ task.assignee_initials }}</span>
    </div>
  </div>
</template>

<style scoped>
.task-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  border-bottom: 1px solid var(--line);
  transition: background 0.1s;
  position: relative;
}
.task-row:last-child { border-bottom: none; }
.task-row:hover { background: color-mix(in srgb, var(--ink) 3%, transparent); }

/* left accent bar for today group */
.task-row--today::before,
.task-row--done-today::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  bottom: 8px;
  width: 3px;
  border-radius: 0 2px 2px 0;
}
.task-row--today::before      { background: var(--accent); }
.task-row--done-today::before { background: var(--good); }

/* Checkbox */
.task-row__check {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  border-radius: var(--radius-full);
  border: 1.5px solid var(--line-2);
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--bg);
  transition: border-color 0.12s, background 0.12s;
}
.task-row__check:hover { border-color: var(--ink-2); }
.task-row__check--done    { background: var(--good); border-color: var(--good); }
.task-row__check--overdue { border-color: var(--bad); }
.task-row__check--overdue:hover { background: color-mix(in srgb, var(--bad) 12%, transparent); }

/* Body */
.task-row__body {
  flex: 1;
  min-width: 0;
}

.task-row__title {
  font-size: 13.5px;
  font-weight: 500;
  color: var(--ink);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.task-row--done .task-row__title {
  color: var(--ink-3);
  text-decoration: line-through;
}

.task-row__meta {
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 3px 0 0;
  font-size: 12px;
  color: var(--ink-3);
}
.task-row__sep { opacity: 0.5; }

.task-row__channel-dot {
  width: 6px;
  height: 6px;
  border-radius: var(--radius-full);
  flex-shrink: 0;
}
.task-row__channel-dot--wa { background: var(--wa); }
.task-row__channel-dot--ig { background: var(--ig); }

/* Right */
.task-row__right {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.task-row__due {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 500;
  color: var(--ink-3);
  white-space: nowrap;
}
.task-row__due--overdue {
  color: var(--bad);
  background: color-mix(in srgb, var(--bad) 12%, transparent);
  border-radius: var(--radius-full);
  padding: 2px 8px;
  font-size: 11px;
}
.task-row__due--done {
  color: var(--good);
}

.task-row__avatar {
  width: 26px;
  height: 26px;
  border-radius: var(--radius-full);
  background: color-mix(in srgb, var(--accent) 16%, transparent);
  color: var(--accent);
  font-size: 9px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.02em;
  flex-shrink: 0;
}
</style>

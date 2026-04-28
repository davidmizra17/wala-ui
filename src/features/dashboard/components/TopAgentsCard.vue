<script setup lang="ts">
import type { AgentRow } from '../types'
defineProps<{ agents: AgentRow[] }>()
</script>

<template>
  <div class="top-agents">
    <div class="top-agents__title">Agentes destacados</div>
    <div class="top-agents__sub">Últimos 7 días</div>
    <table class="agents-table">
      <thead>
        <tr class="agents-table__head">
          <th>Agente</th><th>Mensajes</th><th>Resp.</th><th>Cerrados</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="a in agents" :key="a.initials" class="agents-table__row">
          <td>
            <div class="agent-name">
              <div class="agent-avatar">{{ a.initials }}</div>
              {{ a.name }}
            </div>
          </td>
          <td class="mono">{{ a.messages }}</td>
          <td class="mono good">{{ a.responseTime }}</td>
          <td class="mono">{{ a.closed }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.top-agents { background: var(--surface); border-radius: var(--radius-xl); padding: 24px 28px; box-shadow: var(--shadow-sm); }
.top-agents__title { font-size: 15px; font-weight: 600; color: var(--ink); margin-bottom: 4px; }
.top-agents__sub { font-size: 12px; color: var(--ink-3); margin-bottom: 18px; }
.agents-table { width: 100%; border-collapse: collapse; font-size: 12px; }
.agents-table__head th { text-align: left; color: var(--ink-3); font-weight: 500; padding: 0 0 8px; }
.agents-table__head th:not(:first-child) { text-align: right; }
.agents-table__row { border-top: 1px solid var(--line); }
.agents-table__row td { padding: 10px 0; color: var(--ink-2); }
.agents-table__row td:not(:first-child) { text-align: right; }
.agent-name { display: flex; align-items: center; gap: 8px; color: var(--ink); font-weight: 500; }
.agent-avatar { width: 22px; height: 22px; border-radius: 11px; background: var(--surface-3); display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; color: var(--ink-2); }
.mono { font-family: var(--font-mono); }
.good { color: var(--good); }
</style>

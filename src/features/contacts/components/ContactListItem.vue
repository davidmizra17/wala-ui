<script setup lang="ts">
import { computed } from 'vue'
import WalaIcon from '@/shared/components/WalaIcon.vue'
import type { Contact } from '../types'

const props = defineProps<{ contact: Contact; active?: boolean }>()
defineEmits<{ click: [] }>()

const initials = computed(() =>
  props.contact.name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
)
</script>

<template>
  <div :class="['ci', { 'ci--active': active }]" @click="$emit('click')">
    <div :class="['ci__avatar', active ? 'ci__avatar--accent' : '']">
      {{ initials }}
    </div>
    <div class="ci__body">
      <div class="ci__name-row">
        <span class="ci__name">{{ contact.name }}</span>
        <WalaIcon
          :name="contact.platform === 'whatsapp' ? 'wa' : 'ig'"
          :size="11"
          :color="contact.platform === 'whatsapp' ? 'var(--wa)' : 'var(--ig)'"
          :stroke="2"
        />
      </div>
      <div class="ci__sub">{{ contact.phone || contact.external_id }}</div>
    </div>
    <span class="ci__time">{{ contact.lastSeen }}</span>
  </div>
</template>

<style scoped>
.ci {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 10px;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background 0.12s;
}
.ci:hover:not(.ci--active) { background: var(--surface-2); }
.ci--active { background: var(--accent-tint); }

.ci__avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--surface-3);
  color: var(--ink-2);
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.ci__avatar--accent {
  background: linear-gradient(135deg, var(--accent), var(--accent-dk));
  color: #1a1614;
}

.ci__body   { flex: 1; min-width: 0; }
.ci__name-row { display: flex; align-items: center; gap: 5px; }
.ci__name {
  font-size: 13px;
  font-weight: 600;
  color: var(--ink);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ci--active .ci__name { color: var(--accent-ink); }

.ci__sub {
  font-size: 11px;
  color: var(--ink-3);
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ci__time {
  font-size: 11px;
  color: var(--ink-3);
  flex-shrink: 0;
}
</style>

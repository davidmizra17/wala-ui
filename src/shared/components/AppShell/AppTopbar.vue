<script setup lang="ts">
import WalaIcon from '@/shared/components/WalaIcon.vue'

defineProps<{
  title?: string
  subtitle?: string
}>()
</script>

<template>
  <header class="topbar">
    <div class="topbar__title-group">
      <h1 v-if="title" class="topbar__title">{{ title }}</h1>
      <p v-if="subtitle" class="topbar__subtitle">{{ subtitle }}</p>
    </div>

    <div class="topbar__search">
      <WalaIcon name="search" :size="15" />
      <span class="topbar__search-placeholder">Buscar…</span>
      <kbd class="topbar__search-kbd">⌘K</kbd>
    </div>

    <button class="topbar__btn" aria-label="Notificaciones">
      <WalaIcon name="bell" :size="16" />
      <span class="topbar__notif-dot" />
    </button>

    <slot name="right" />
  </header>
</template>

<style scoped>
.topbar {
  height: 64px;
  padding: 0 32px;
  border-bottom: 1px solid var(--line);
  background: var(--surface);
  display: flex;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
}
.topbar__title-group { min-width: 0; }
.topbar__title { font-size: 17px; font-weight: 600; color: var(--ink); letter-spacing: -0.01em; }
.topbar__subtitle { font-size: 12px; color: var(--ink-3); margin-top: 1px; }
.topbar__search {
  flex: 1;
  max-width: 380px;
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--surface-2);
  border-radius: 8px;
  padding: 8px 12px;
  color: var(--ink-3);
  font-size: 13px;
  cursor: text;
}
.topbar__search-placeholder { flex: 1; }
.topbar__search-kbd {
  font-family: var(--font-mono);
  font-size: 10px;
  background: var(--surface);
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--ink-3);
  border: 1px solid var(--line);
}
.topbar__btn {
  background: transparent;
  border: 1px solid var(--line-2);
  border-radius: 8px;
  padding: 7px 9px;
  color: var(--ink-2);
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
}
.topbar__notif-dot {
  position: absolute;
  top: 5px;
  right: 6px;
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background: var(--accent);
}
</style>

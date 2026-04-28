<script setup lang="ts">
import AppSidebar from './AppSidebar.vue'
import AppTopbar from './AppTopbar.vue'

defineProps<{
  title?: string
  subtitle?: string
}>()
</script>

<template>
  <div class="app-shell">
    <AppSidebar />
    <div class="app-shell__main">
      <AppTopbar :title="title" :subtitle="subtitle">
        <template #right><slot name="topbar-right" /></template>
      </AppTopbar>
      <main class="app-shell__content">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.app-shell {
  display: flex;
  width: 100%;
  height: 100%;
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-ui);
  overflow: hidden;
}
.app-shell__main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.app-shell__content {
  flex: 1;
  overflow: auto;
  background: var(--bg);
}
</style>

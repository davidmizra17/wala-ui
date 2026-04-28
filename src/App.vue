<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'
import AppShell from '@/shared/components/AppShell/AppShell.vue'

const route = useRoute()
const isAppLayout = computed(() => route.meta.layout === 'app')
</script>

<template>
  <Toast position="top-right" />
  <AppShell v-if="isAppLayout" :title="route.meta.title as string" :subtitle="route.meta.subtitle as string">
    <RouterView />
  </AppShell>
  <RouterView v-else />
</template>

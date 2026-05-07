<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Toast from 'primevue/toast'
import AppShell from '@/shared/components/AppShell/AppShell.vue'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const auth = useAuthStore()
const isAppLayout = computed(() => route.meta.layout === 'app')

onMounted(() => auth.fetchMe())
</script>

<template>
  <Toast position="top-right" />
  <AppShell v-if="isAppLayout" :title="route.meta.title as string" :subtitle="route.meta.subtitle as string">
    <RouterView />
  </AppShell>
  <RouterView v-else />
</template>

import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export type Theme = 'light' | 'dark'
export type Lang = 'es' | 'en'

export const useUiStore = defineStore('ui', () => {
  const theme = ref<Theme>('light')
  const lang = ref<Lang>('es')
  const sidebarCollapsed = ref(false)

  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  function toggleSidebar() {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  watch(theme, (val) => {
    document.documentElement.dataset.theme = val
  }, { immediate: true })

  return { theme, lang, sidebarCollapsed, toggleTheme, toggleSidebar }
}, { persist: false })

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { UUID } from '@/shared/types'

export interface AuthUser {
  id: UUID
  email: string
  role: 'owner' | 'agent'
  tenant: UUID
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(null)
  const accessToken = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)

  const isAuthenticated = computed(() => !!accessToken.value)

  function setTokens(access: string, refresh: string) {
    accessToken.value = access
    refreshToken.value = refresh
  }

  function setUser(u: AuthUser) {
    user.value = u
  }

  function logout() {
    user.value = null
    accessToken.value = null
    refreshToken.value = null
  }

  return { user, accessToken, refreshToken, isAuthenticated, setTokens, setUser, logout }
})

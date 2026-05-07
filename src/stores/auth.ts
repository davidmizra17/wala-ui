import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { UUID } from '@/shared/types'

const BASE_URL = 'http://localhost:8000'

export interface AuthUser {
  id: UUID
  email: string
  role: 'owner' | 'agent'
  tenant: UUID
  created?: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!localStorage.getItem('access_token'))

  async function login(email: string, password: string): Promise<boolean> {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${BASE_URL}/api/v1/auth/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) {
        const data = await res.json()
        error.value = data.non_field_errors?.[0] ?? 'Credenciales incorrectas'
        return false
      }
      const data = await res.json()
      localStorage.setItem('access_token', data.access)
      localStorage.setItem('refresh_token', data.refresh)
      user.value = data.user
      return true
    } catch {
      error.value = 'Error de red. Verifica tu conexión.'
      return false
    } finally {
      loading.value = false
    }
  }

  async function fetchMe(): Promise<void> {
    const token = localStorage.getItem('access_token')
    if (!token) return
    try {
      const res = await fetch(`${BASE_URL}/api/v1/auth/me/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) user.value = await res.json()
    } catch {
      // silently ignore — guest state is handled by the router guard
    }
  }

  function logout(): void {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    user.value = null
  }

  return { user, loading, error, isAuthenticated, login, fetchMe, logout }
})

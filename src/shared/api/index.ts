const BASE_URL = 'http://localhost:8000'

async function silentRefresh(): Promise<string | null> {
  const refresh = localStorage.getItem('refresh_token')
  if (!refresh) return null
  try {
    const res = await fetch(`${BASE_URL}/api/v1/auth/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh }),
    })
    if (!res.ok) return null
    const { access } = await res.json()
    localStorage.setItem('access_token', access)
    return access
  } catch {
    return null
  }
}

function buildHeaders(token: string | null): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`
  return headers
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  let token = localStorage.getItem('access_token')
  let res = await fetch(`${BASE_URL}${path}`, { ...init, headers: buildHeaders(token) })

  if (res.status === 401) {
    token = await silentRefresh()
    if (!token) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      window.location.href = '/login'
      throw new Error('Session expired')
    }
    res = await fetch(`${BASE_URL}${path}`, { ...init, headers: buildHeaders(token) })
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw Object.assign(new Error(`HTTP ${res.status}`), { status: res.status, body })
  }

  return res.status === 204 ? (undefined as T) : res.json()
}

export const api = {
  get:    <T>(path: string)              => request<T>(path),
  post:   <T>(path: string, body: unknown) => request<T>(path, { method: 'POST',   body: JSON.stringify(body) }),
  patch:  <T>(path: string, body: unknown) => request<T>(path, { method: 'PATCH',  body: JSON.stringify(body) }),
  delete: (path: string)                   => request<void>(path, { method: 'DELETE' }),
}

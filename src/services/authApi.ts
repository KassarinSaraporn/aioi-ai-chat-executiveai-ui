import { apiFetch, setAuth } from './httpClient'
import type { AuthUser, LoginRequest, LoginResponse } from '../types/api'

export async function login(payload: LoginRequest) {
  const result = await apiFetch<LoginResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

  setAuth(result.token, result.user)
  return result
}

export function getCurrentUser() {
  const raw = localStorage.getItem('auth_user')
  if (!raw) return null

  try {
    return JSON.parse(raw) as AuthUser
  } catch {
    return null
  }
}

import type { ApiError } from '../types/api'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5148'

export function getApiUrl() {
  return API_URL
}

export function getToken() {
  return localStorage.getItem('access_token')
}

export function setAuth(token: string, user: unknown) {
  localStorage.setItem('access_token', token)
  localStorage.setItem('auth_user', JSON.stringify(user))
}

export function clearAuth() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('auth_user')
}

export function getStoredUser<T>() {
  const raw = localStorage.getItem('auth_user')
  if (!raw) return null

  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken()

  const headers = new Headers(options.headers)
  headers.set('Content-Type', 'application/json')

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    let message = `API Error: ${response.status}`
    try {
      const body = (await response.json()) as ApiError
      message = body.message || message
    } catch {
      const text = await response.text().catch(() => '')
      message = text || message
    }
    throw new Error(message)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

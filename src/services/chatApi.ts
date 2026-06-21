import { apiFetch } from './httpClient'
import type { ChatMessage, ChatSession } from '../types/api'

export async function getChatSessions() {
  return apiFetch<ChatSession[]>('/api/chat/sessions')
}

export async function createChatSession(title?: string) {
  return apiFetch<{ id: string; title: string }>('/api/chat/sessions', {
    method: 'POST',
    body: JSON.stringify({ title }),
  })
}

export async function getChatMessages(sessionId: string) {
  return apiFetch<ChatMessage[]>(`/api/chat/sessions/${sessionId}/messages`)
}

export async function deleteChatSession(sessionId: string) {
  return apiFetch<{ message: string }>(`/api/chat/sessions/${sessionId}`, {
    method: 'DELETE',
  })
}

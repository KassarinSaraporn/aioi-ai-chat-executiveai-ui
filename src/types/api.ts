export type Language = 'th' | 'en'

export type AuthUser = {
  id: string
  name: string
  email: string
  role: string
}

export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  token: string
  user: AuthUser
}

export type ChatSession = {
  id: string
  title: string | null
  createdAt: string
  updatedAt: string
}

export type ChatRole = 'user' | 'assistant' | 'system'

export type ChatMessage = {
  id: string
  sessionId: string
  role: ChatRole | string
  content: string
  sources?: unknown
  createdAt: string
}

export type AiAskRequest = {
  question: string
  period: string
  language: Language
  sessionId?: string | null
}

export type AiAskResponse = {
  sessionId: string
  question: string
  period: string
  language: Language
  intent: string
  data: unknown
  answer: string
}

export type ApiError = {
  message?: string
}

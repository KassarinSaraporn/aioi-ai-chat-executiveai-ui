import type { ReactNode } from 'react'
import type { AuthUser, ChatSession, Language } from '../../types/api'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

type Props = {
  user: AuthUser
  language: Language
  sessions: ChatSession[]
  activeSessionId: string | null
  sessionsLoading?: boolean
  onLanguageChange: (language: Language) => void
  onLogout: () => void
  onSelectSession: (sessionId: string) => void
  onNewChat: () => void
  children: ReactNode
}

export function AppShell({
  user,
  language,
  sessions,
  activeSessionId,
  sessionsLoading,
  onLanguageChange,
  onLogout,
  onSelectSession,
  onNewChat,
  children,
}: Props) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[300px_1fr]">
      <div className="hidden lg:block">
        <Sidebar
          language={language}
          sessions={sessions}
          activeSessionId={activeSessionId}
          loading={sessionsLoading}
          onSelectSession={onSelectSession}
          onNewChat={onNewChat}
        />
      </div>

      <main className="min-w-0">
        <TopBar
          user={user}
          language={language}
          onLanguageChange={onLanguageChange}
          onLogout={onLogout}
        />
        {children}
      </main>
    </div>
  )
}

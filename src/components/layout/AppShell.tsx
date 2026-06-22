import { useState, type ReactNode } from 'react'
import { X } from 'lucide-react'
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
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  function handleSelectSession(sessionId: string) {
    onSelectSession(sessionId)
    setMobileSidebarOpen(false)
  }

  function handleNewChat() {
    onNewChat()
    setMobileSidebarOpen(false)
  }

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[300px_minmax(0,1fr)]">
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

      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu overlay"
            onClick={() => setMobileSidebarOpen(false)}
            className="absolute inset-0 bg-slate-950/45 backdrop-blur-sm"
          />
          <div className="relative h-full w-[86vw] max-w-[330px] bg-white shadow-2xl">
            <button
              type="button"
              aria-label="Close sidebar"
              onClick={() => setMobileSidebarOpen(false)}
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/90 text-slate-600 shadow-sm ring-1 ring-slate-200"
            >
              <X className="h-5 w-5" />
            </button>
            <Sidebar
              language={language}
              sessions={sessions}
              activeSessionId={activeSessionId}
              loading={sessionsLoading}
              onSelectSession={handleSelectSession}
              onNewChat={handleNewChat}
            />
          </div>
        </div>
      )}

      <main className="min-w-0">
        <TopBar
          user={user}
          language={language}
          onLanguageChange={onLanguageChange}
          onLogout={onLogout}
          onMenuClick={() => setMobileSidebarOpen(true)}
        />
        {children}
      </main>
    </div>
  )
}

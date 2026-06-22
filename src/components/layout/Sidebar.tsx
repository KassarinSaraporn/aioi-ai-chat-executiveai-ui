import { Bot, LayoutDashboard, MessageSquare, Plus, Search } from 'lucide-react'
import type { ChatSession, Language } from '../../types/api'
import { getCopy } from '../../data/i18n'
import { compactDate, truncate } from '../../utils/format'

type Props = {
  language: Language
  sessions: ChatSession[]
  activeSessionId: string | null
  loading?: boolean
  onSelectSession: (sessionId: string) => void
  onNewChat: () => void
}

export function Sidebar({
  language,
  sessions,
  activeSessionId,
  loading,
  onSelectSession,
  onNewChat,
}: Props) {
  const t = getCopy(language)

  return (
    <aside className="flex h-screen w-full flex-col border-r border-slate-200 bg-white/95 backdrop-blur-xl lg:w-[300px]">
      <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-5 sm:px-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1D4499] to-[#ED1F29] text-white shadow-lg shadow-blue-900/15">
          <Bot className="h-6 w-6" />
        </div>
        <div>
          <p className="text-lg font-extrabold text-[#1D4499]">AIOI AI</p>
          <p className="text-xs font-medium text-slate-500">Insurance Assistant</p>
        </div>
      </div>

      <div className="px-3 py-4 sm:px-4">
        <button className="flex w-full items-center gap-3 rounded-2xl bg-blue-50 px-4 py-3 text-left font-semibold text-[#1D4499] ring-1 ring-blue-100">
          <LayoutDashboard className="h-5 w-5" />
          {String(t.dashboard)}
        </button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col px-3 pb-4 sm:px-4">
        <div className="mb-3 flex items-center justify-between px-1">
          <h2 className="text-sm font-bold text-slate-700">{String(t.recentConversations)}</h2>
          <Search className="h-4 w-4 text-slate-400" />
        </div>

        <div className="scrollbar-soft min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
          {loading && (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
              Loading...
            </div>
          )}

          {!loading && sessions.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
              {String(t.noRecent)}
            </div>
          )}

          {sessions.map((session) => {
            const isActive = session.id === activeSessionId
            return (
              <button
                type="button"
                key={session.id}
                onClick={() => onSelectSession(session.id)}
                className={`flex w-full items-start gap-3 rounded-2xl px-3 py-3 text-left transition ${
                  isActive
                    ? 'bg-[#1D4499] text-white shadow-lg shadow-blue-900/15'
                    : 'bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                    isActive ? 'bg-white/18' : 'bg-blue-50 text-[#1D4499]'
                  }`}
                >
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">
                    {truncate(session.title || 'บทสนทนาใหม่', 30)}
                  </p>
                  <p className={`mt-1 text-xs ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                    {compactDate(session.updatedAt)}
                  </p>
                </div>
              </button>
            )
          })}
        </div>

        <button
          type="button"
          onClick={onNewChat}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#1D4499] to-[#ED1F29] px-4 py-3 font-bold text-white shadow-lg shadow-blue-900/15 transition hover:scale-[1.01]"
        >
          <Plus className="h-5 w-5" />
          {String(t.newChat)}
        </button>
      </div>
    </aside>
  )
}

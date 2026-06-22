import { Bot } from 'lucide-react'
import type { ChatMessage, Language } from '../../types/api'
import { getCopy } from '../../data/i18n'
import { MessageBubble } from './MessageBubble'
import { PromptChips } from './PromptChips'
import { ChatInput } from './ChatInput'

type Props = {
  language: Language
  messages: ChatMessage[]
  input: string
  loading?: boolean
  error?: string
  onInputChange: (value: string) => void
  onSubmit: () => void
  onSelectPrompt: (prompt: string) => void
}

export function ChatWindow({
  language,
  messages,
  input,
  loading,
  error,
  onInputChange,
  onSubmit,
  onSelectPrompt,
}: Props) {
  const t = getCopy(language)

  return (
    <section className="rounded-[1.5rem] border border-slate-200 bg-white p-3 shadow-sm sm:p-4 lg:rounded-[2rem] lg:p-5">
      <div className="scrollbar-soft max-h-[58vh] min-h-[360px] space-y-4 overflow-y-auto rounded-[1.3rem] bg-slate-50/70 p-3 sm:min-h-[430px] sm:space-y-5 sm:p-4 lg:max-h-[610px] lg:rounded-[1.6rem]">
        {messages.length === 0 && !loading && (
          <div className="flex min-h-[300px] flex-col items-center justify-center text-center sm:min-h-[380px]">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-50 text-[#1D4499]">
              <Bot className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-950 sm:text-xl">{String(t.emptyTitle)}</h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              {String(t.emptyDescription)}
            </p>
          </div>
        )}

        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} language={language} />
        ))}

        {loading && (
          <div className="flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-semibold text-[#1D4499]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#1D4499]" />
            {String(t.loading)}
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}
      </div>

      <div className="mt-4 space-y-4">
        <PromptChips language={language} onSelect={onSelectPrompt} />
        <ChatInput
          language={language}
          value={input}
          disabled={loading}
          onChange={onInputChange}
          onSubmit={onSubmit}
        />
      </div>
    </section>
  )
}

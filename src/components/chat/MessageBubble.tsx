import { Bot, Copy, ThumbsDown, ThumbsUp, UserRound } from 'lucide-react'
import type { ChatMessage, Language } from '../../types/api'
import { getCopy } from '../../data/i18n'
import { compactDate } from '../../utils/format'

type Props = {
  message: ChatMessage
  language: Language
}

export function MessageBubble({ message, language }: Props) {
  const t = getCopy(language)
  const isUser = message.role === 'user'

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[82%] rounded-[1.4rem] rounded-tr-md bg-[#1D4499] px-5 py-4 text-white shadow-lg shadow-blue-900/15">
          <div className="flex items-start gap-3">
            <div className="min-w-0">
              <p className="whitespace-pre-wrap text-sm leading-7">{message.content}</p>
              <p className="mt-2 text-xs text-blue-100">{compactDate(message.createdAt)}</p>
            </div>
            <UserRound className="h-5 w-5 shrink-0 text-blue-100" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1D4499] to-[#ED1F29] text-white shadow-lg shadow-blue-900/15">
        <Bot className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1 rounded-[1.4rem] rounded-tl-md border border-blue-100 bg-blue-50/60 px-5 py-4 text-slate-800">
        <pre className="whitespace-pre-wrap font-sans text-sm leading-7">{message.content}</pre>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <span>{compactDate(message.createdAt)}</span>
          <button className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-slate-500 hover:text-[#1D4499]">
            <Copy className="h-3.5 w-3.5" />
            Copy
          </button>
          <button className="rounded-full bg-white p-1.5 text-slate-500 hover:text-[#1D4499]">
            <ThumbsUp className="h-3.5 w-3.5" />
          </button>
          <button className="rounded-full bg-white p-1.5 text-slate-500 hover:text-[#ED1F29]">
            <ThumbsDown className="h-3.5 w-3.5" />
          </button>
        </div>

        {message.sources !== undefined && message.sources !== null && (
          <details className="mt-4 rounded-2xl border border-blue-100 bg-white p-3">
            <summary className="cursor-pointer text-sm font-semibold text-[#1D4499]">
              {String(t.rawData)}
            </summary>
            <pre className="scrollbar-soft mt-3 max-h-72 overflow-auto rounded-xl bg-slate-950 p-4 text-xs leading-5 text-slate-100">
              {typeof message.sources === 'string'
                ? message.sources
                : JSON.stringify(message.sources, null, 2)}
            </pre>
          </details>
        )}
      </div>
    </div>
  )
}

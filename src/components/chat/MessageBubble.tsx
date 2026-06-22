import { useState } from 'react'
import { Bot, Copy, ThumbsDown, ThumbsUp, UserRound } from 'lucide-react'
import type { ChatMessage, Language } from '../../types/api'
import { getCopy } from '../../data/i18n'
import { compactDate } from '../../utils/format'
import { saveAiFeedback } from '../../services/executiveAiApi'


type Props = {
  message: ChatMessage
  language: Language
}

export function MessageBubble({ message, language }: Props) {
  const t = getCopy(language)
  const isUser = message.role === 'user'
const [copied, setCopied] = useState(false)
const [feedbackStatus, setFeedbackStatus] = useState<'helpful' | 'not_helpful' | ''>('')
const [feedbackLoading, setFeedbackLoading] = useState(false)
const [feedbackError, setFeedbackError] = useState('')
  async function handleCopy() {
    await navigator.clipboard.writeText(message.content)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1500)
  }

async function handleFeedback(rating: 'helpful' | 'not_helpful') {
  if (feedbackLoading || feedbackStatus) return

  setFeedbackLoading(true)
  setFeedbackError('')

  try {
    await saveAiFeedback({
      sessionId: message.sessionId,
      messageId: message.id,
      intent: null,
      period: null,
      rating,
      comment: null,
    })

    setFeedbackStatus(rating)
  } catch (error) {
    console.error(error)
    setFeedbackError('บันทึก Feedback ไม่สำเร็จ')
  } finally {
    setFeedbackLoading(false)
  }
}

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[92%] rounded-[1.2rem] rounded-tr-md bg-[#1D4499] px-4 py-3 text-white shadow-lg shadow-blue-900/15 sm:max-w-[82%] sm:rounded-[1.4rem] sm:px-5 sm:py-4">
          <div className="flex items-start gap-3">
            <div className="min-w-0">
              <p className="whitespace-pre-wrap break-words text-sm leading-7">{message.content}</p>
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
      <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1D4499] to-[#ED1F29] text-white shadow-lg shadow-blue-900/15 sm:flex">
        <Bot className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1 rounded-[1.2rem] rounded-tl-md border border-blue-100 bg-blue-50/60 px-4 py-3 text-slate-800 sm:rounded-[1.4rem] sm:px-5 sm:py-4">
        <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-7">{message.content}</pre>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <span>{compactDate(message.createdAt)}</span>
          <button
  onClick={handleCopy}
  className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-slate-500 hover:text-[#1D4499]"
>
  <Copy className="h-3.5 w-3.5" />
  {copied ? 'Copied' : 'Copy'}
</button>

<button
  onClick={() => handleFeedback('helpful')}
  disabled={feedbackLoading || Boolean(feedbackStatus)}
  className={`rounded-full bg-white p-1.5 hover:text-[#1D4499] disabled:cursor-not-allowed disabled:opacity-60 ${
    feedbackStatus === 'helpful'
      ? 'text-[#1D4499]'
      : 'text-slate-500'
  }`}
  title="มีประโยชน์"
>
  <ThumbsUp className="h-3.5 w-3.5" />
</button>

<button
  onClick={() => handleFeedback('not_helpful')}
  disabled={feedbackLoading || Boolean(feedbackStatus)}
  className={`rounded-full bg-white p-1.5 hover:text-[#ED1F29] disabled:cursor-not-allowed disabled:opacity-60 ${
    feedbackStatus === 'not_helpful'
      ? 'text-[#ED1F29]'
      : 'text-slate-500'
  }`}
  title="ไม่ถูกต้อง"
>
  <ThumbsDown className="h-3.5 w-3.5" />
</button>

{feedbackLoading && (
  <span className="text-xs font-medium text-slate-400">
    กำลังบันทึก...
  </span>
)}

{feedbackStatus && (
  <span className="text-xs font-medium text-slate-400">
    ขอบคุณสำหรับ Feedback
  </span>
)}

{feedbackError && (
  <span className="text-xs font-medium text-red-500">
    {feedbackError}
  </span>
)}
        </div>

        {message.sources !== undefined && message.sources !== null && (
          <details className="mt-4 rounded-2xl border border-blue-100 bg-white p-3">
            <summary className="cursor-pointer text-sm font-semibold text-[#1D4499]">
              {String(t.rawData)}
            </summary>
            <pre className="scrollbar-soft mt-3 max-h-72 overflow-auto rounded-xl bg-slate-950 p-3 text-[11px] leading-5 text-slate-100 sm:p-4 sm:text-xs">
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

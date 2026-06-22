import type { KeyboardEvent } from 'react'
import { Paperclip, SendHorizonal } from 'lucide-react'
import type { Language } from '../../types/api'
import { getCopy } from '../../data/i18n'

type Props = {
  language: Language
  value: string
  disabled?: boolean
  onChange: (value: string) => void
  onSubmit: () => void
}

export function ChatInput({ language, value, disabled, onChange, onSubmit }: Props) {
  const t = getCopy(language)

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      onSubmit()
    }
  }

  return (
    <div className="rounded-[1.4rem] border border-slate-200 bg-white p-2 shadow-sm sm:rounded-[1.6rem] sm:p-3">
      <div className="flex items-end gap-2 sm:gap-3">
        <button className="mb-1 hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-slate-500 hover:text-[#1D4499] sm:flex">
          <Paperclip className="h-5 w-5" />
        </button>
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder={String(t.inputPlaceholder)}
          className="scrollbar-soft max-h-40 min-h-[44px] flex-1 resize-none bg-transparent px-2 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 sm:px-1"
          disabled={disabled}
        />
        <button
          type="button"
          onClick={onSubmit}
          disabled={disabled || !value.trim()}
          className="mb-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1D4499] to-[#ED1F29] text-white shadow-lg shadow-blue-900/15 transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <SendHorizonal className="h-5 w-5" />
        </button>
      </div>
      <p className="px-2 pb-1 pt-2 text-[11px] text-slate-400 sm:text-xs">{String(t.disclaimer)}</p>
    </div>
  )
}

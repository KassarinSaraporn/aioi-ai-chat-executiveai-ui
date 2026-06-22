import { RefreshCw } from 'lucide-react'
import type { Language } from '../../types/api'
import { getCopy } from '../../data/i18n'

type Props = {
  language: Language
  onSelect: (prompt: string) => void
}

export function PromptChips({ language, onSelect }: Props) {
  const t = getCopy(language)
  const prompts = t.samplePrompts as string[]

  return (
    <div className="scrollbar-soft -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible">
      {prompts.map((prompt) => (
        <button
          key={prompt}
          type="button"
          onClick={() => onSelect(prompt)}
          className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-[#1D4499] hover:text-[#1D4499] sm:px-4 sm:text-sm"
        >
          {prompt}
        </button>
      ))}
      <button
        type="button"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm hover:text-[#1D4499] sm:h-10 sm:w-10"
      >
        <RefreshCw className="h-4 w-4" />
      </button>
    </div>
  )
}

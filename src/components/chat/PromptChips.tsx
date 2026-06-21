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
    <div className="flex flex-wrap items-center gap-2">
      {prompts.map((prompt) => (
        <button
          key={prompt}
          type="button"
          onClick={() => onSelect(prompt)}
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-[#1D4499] hover:text-[#1D4499]"
        >
          {prompt}
        </button>
      ))}
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm hover:text-[#1D4499]"
      >
        <RefreshCw className="h-4 w-4" />
      </button>
    </div>
  )
}

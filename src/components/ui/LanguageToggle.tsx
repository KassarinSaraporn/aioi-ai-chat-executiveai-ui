import type { Language } from '../../types/api'

type Props = {
  language: Language
  onChange: (language: Language) => void
}

export function LanguageToggle({ language, onChange }: Props) {
  return (
    <div className="flex items-center rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
      <button
        type="button"
        onClick={() => onChange('th')}
        className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
          language === 'th'
            ? 'bg-[#1D4499] text-white shadow-sm'
            : 'text-slate-500 hover:text-slate-900'
        }`}
      >
        TH
      </button>
      <button
        type="button"
        onClick={() => onChange('en')}
        className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
          language === 'en'
            ? 'bg-[#1D4499] text-white shadow-sm'
            : 'text-slate-500 hover:text-slate-900'
        }`}
      >
        EN
      </button>
    </div>
  )
}

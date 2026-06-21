import { Moon, LogOut } from 'lucide-react'
import type { AuthUser, Language } from '../../types/api'
import { getCopy } from '../../data/i18n'
import { LanguageToggle } from '../ui/LanguageToggle'
import { StatusPill } from '../ui/StatusPill'

type Props = {
  user: AuthUser
  language: Language
  onLanguageChange: (language: Language) => void
  onLogout: () => void
}

export function TopBar({ user, language, onLanguageChange, onLogout }: Props) {
  const t = getCopy(language)

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white/80 px-5 py-4 backdrop-blur-xl lg:px-7">
      <div>
        <h1 className="text-xl font-bold text-slate-950">{String(t.pageTitle)}</h1>
        <p className="text-sm text-slate-500">{String(t.pageSubtitle)}</p>
      </div>

      <div className="flex items-center gap-3">
       
        <LanguageToggle language={language} onChange={onLanguageChange} />
       
        <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm sm:flex">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1D4499] text-sm font-bold text-white">
            {user.name
              .split(' ')
              .map((item) => item[0])
              .join('')
              .slice(0, 2)
              .toUpperCase() || 'AI'}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">{user.name}</p>
            <p className="text-xs text-slate-500">{user.role}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="inline-flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 shadow-sm hover:text-red-600"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden md:inline">{String(t.logout)}</span>
        </button>
      </div>
    </header>
  )
}

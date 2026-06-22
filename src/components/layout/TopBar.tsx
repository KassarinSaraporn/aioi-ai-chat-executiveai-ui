import { Moon, LogOut } from 'lucide-react'
import type { AuthUser, Language } from '../../types/api'
import { getCopy } from '../../data/i18n'
import { LanguageToggle } from '../ui/LanguageToggle'
import { StatusPill } from '../ui/StatusPill'
import { Menu } from 'lucide-react'


type Props = {
  user: AuthUser
  language: Language
  onLanguageChange: (language: Language) => void
  onLogout: () => void
  onMenuClick: () => void
}
export function TopBar({  user,
  language,
  onLanguageChange,
  onLogout,
  onMenuClick,}: Props) {
  const t = getCopy(language)

  return (
     <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <p className="text-sm font-semibold text-slate-900">
            Executive AI
          </p>
          <p className="text-xs text-slate-500">
            Welcome, {user.name}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value as Language)}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
        >
          <option value="th">TH</option>
          <option value="en">EN</option>
        </select>

        <button
          type="button"
          onClick={onLogout}
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
        >
          Logout
        </button>
      </div>
    </header>
  )
}

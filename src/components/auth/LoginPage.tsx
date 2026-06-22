import type { FormEvent } from 'react'
import { useState } from 'react'
import { Bot, LockKeyhole, Mail, ShieldCheck } from 'lucide-react'
import { login } from '../../services/authApi'
import type { AuthUser, Language } from '../../types/api'
import { getCopy } from '../../data/i18n'
import { LanguageToggle } from '../ui/LanguageToggle'

type Props = {
  language: Language
  onLanguageChange: (language: Language) => void
  onLoginSuccess: (user: AuthUser) => void
}

export function LoginPage({ language, onLanguageChange, onLoginSuccess }: Props) {
  const t = getCopy(language)
  const [email, setEmail] = useState('admin@aioi.local')
  const [password, setPassword] = useState('admin123')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await login({ email, password })
      onLoginSuccess(result.user)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(t.loginError))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-slate-200 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative hidden bg-[#1D4499] p-10 text-white lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.28),transparent_28%),radial-gradient(circle_at_80%_70%,rgba(237,31,41,0.34),transparent_28%)]" />
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25">
                <Bot className="h-8 w-8" />
              </div>
              <h1 className="mt-8 text-4xl font-bold leading-tight">
                AI Executive Assistant
              </h1>
              <p className="mt-4 max-w-md text-blue-100">
                Sales, Loss Ratio, Claims, Renewal, Broker Risk and Executive Insight in one secure workspace.
              </p>
            </div>

            <div className="grid gap-3 rounded-3xl bg-white/10 p-5 ring-1 ring-white/20 backdrop-blur">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-emerald-200" />
                <span className="text-sm text-blue-50">Secure Login</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-emerald-200" />
                <span className="text-sm text-blue-50">Conversation History</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-emerald-200" />
                <span className="text-sm text-blue-50">AI-Powered Business Insight</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 sm:p-10">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1D4499] text-lg font-bold text-white shadow-lg shadow-blue-900/20">
                AI
              </div>
              <div>
                <p className="font-bold text-slate-950">AIOI AI</p>
                <p className="text-xs text-slate-500">Insurance Assistant</p>
              </div>
            </div>
            <LanguageToggle language={language} onChange={onLanguageChange} />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-950">{String(t.loginTitle)}</h2>
            <p className="mt-2 text-slate-500">{String(t.loginSubtitle)}</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="text-sm font-semibold text-slate-700">{String(t.email)}</label>
              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-[#1D4499] focus-within:bg-white">
                <Mail className="h-5 w-5 text-slate-400" />
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full bg-transparent text-slate-900 outline-none"
                  placeholder="admin@aioi.local"
                  type="email"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">{String(t.password)}</label>
              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-[#1D4499] focus-within:bg-white">
                <LockKeyhole className="h-5 w-5 text-slate-400" />
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full bg-transparent text-slate-900 outline-none"
                  placeholder="admin123"
                  type="password"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-[#1D4499] to-[#ED1F29] px-5 py-3.5 font-bold text-white shadow-lg shadow-blue-900/20 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? String(t.signingIn) : String(t.login)}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

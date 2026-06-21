import { Bot, Globe2, MessageCircle } from 'lucide-react'
import type { Language } from '../../types/api'
import { getCopy } from '../../data/i18n'

export function HeroSection({ language }: { language: Language }) {
  const t = getCopy(language)

  return (
    <section className="glass-card relative overflow-hidden rounded-[2rem] p-4 lg:p-7">
      <div className="absolute right-0 top-0 h-38 w-48 rounded-full bg-[#ED1F29]/10 blur-3xl" />
      <div className="absolute right-28 top-6 h-30 w-40 rounded-full bg-[#1D4499]/10 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
         
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1D4499] text-white shadow-lg shadow-blue-900/20">
              <Bot className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-950 lg:text-3xl">
                {String(t.heroTitle)}
              </h2>
              <p className="mt-1 text-slate-500">{String(t.heroSubtitle)}</p>
            </div>
          </div>
       
        </div>

        <div className="relative flex h-36 min-w-[230px] items-center justify-center rounded-[2rem] bg-gradient-to-br from-blue-50 to-red-50 ring-1 ring-slate-100">
          <div className="absolute left-7 top-5 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-[#1D4499] shadow-lg">
            KPI
          </div>
          <div className="absolute bottom-5 right-7 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-[#ED1F29] shadow-lg">
            Insight
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-[#1D4499] to-[#ED1F29] text-white shadow-xl">
            <MessageCircle className="h-8 w-8" />
          </div>
        </div>
      </div>
    </section>
  )
}

import { Bot, Globe2, MessageCircle } from 'lucide-react'
import type { Language } from '../../types/api'
import { getCopy } from '../../data/i18n'

export function HeroSection({ language }: { language: Language }) {
  const t = getCopy(language)

  return (
    <section className="glass-card relative overflow-hidden rounded-[1.5rem] p-4 sm:rounded-[2rem] lg:p-7">
      <div className="absolute right-0 top-0 h-38 w-48 rounded-full bg-[#ED1F29]/10 blur-3xl" />
      <div className="absolute right-28 top-6 h-30 w-40 rounded-full bg-[#1D4499]/10 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
         
          <div className="flex items-start gap-3 sm:items-center sm:gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1D4499] text-white shadow-lg shadow-blue-900/20 sm:h-14 sm:w-14">
              <Bot className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold leading-tight text-slate-950 sm:text-2xl lg:text-3xl">
                {String(t.heroTitle)}
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-500 sm:text-base">{String(t.heroSubtitle)}</p>
            </div>
          </div>
       
        </div>

        <div className="relative flex h-28 w-full items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-blue-50 to-red-50 ring-1 ring-slate-100 sm:h-36 lg:min-w-[230px] lg:w-auto lg:rounded-[2rem]">
          <div className="absolute left-4 top-4 rounded-2xl bg-white px-3 py-2 text-xs font-semibold text-[#1D4499] shadow-lg sm:left-7 sm:top-5 sm:px-4 sm:py-3 sm:text-sm">
            KPI
          </div>
          <div className="absolute bottom-4 right-4 rounded-2xl bg-white px-3 py-2 text-xs font-semibold text-[#ED1F29] shadow-lg sm:bottom-5 sm:right-7 sm:px-4 sm:py-3 sm:text-sm">
            Insight
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-[#1D4499] to-[#ED1F29] text-white shadow-xl sm:h-16 sm:w-16">
            <MessageCircle className="h-8 w-8" />
          </div>
        </div>
      </div>
    </section>
  )
}

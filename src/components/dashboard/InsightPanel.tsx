import type { ReactNode } from 'react'
import { Activity, ArrowDownRight, ArrowUpRight, Database, ShieldCheck, TrendingUp } from 'lucide-react'
import type { Language } from '../../types/api'
import { getCopy } from '../../data/i18n'

export function InsightPanel({ language }: { language: Language }) {
  const t = getCopy(language)

  return (
    <aside className="space-y-5">
      <section className="rounded-[1.7rem] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-extrabold text-slate-950">{String(t.insightToday)}</h2>
          <Activity className="h-5 w-5 text-[#1D4499]" />
        </div>

        <div className="space-y-3">
          <InsightItem
            tone="red"
            icon={<TrendingUp className="h-5 w-5" />}
            title="เบี้ยประกันเติบโตดี"
            desc="ยอดขายเบี้ยประกันรวมเพิ่มขึ้น"
            value="12.6%"
            trend={<ArrowUpRight className="h-4 w-4" />}
          />
          <InsightItem
            tone="green"
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Loss Ratio ลดลง"
            desc="อัตราสินไหมสุทธิลดลง"
            value="-4.8%"
            trend={<ArrowDownRight className="h-4 w-4" />}
          />
          <InsightItem
            tone="blue"
            icon={<Activity className="h-5 w-5" />}
            title="Renewal Rate ดีขึ้น"
            desc="อัตราต่ออายุกรมธรรม์เพิ่มขึ้น"
            value="+3.2%"
            trend={<ArrowUpRight className="h-4 w-4" />}
          />
        </div>
      </section>

      <section className="rounded-[1.7rem] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-extrabold text-slate-950">{String(t.dataSources)}</h2>
          <Database className="h-5 w-5 text-[#1D4499]" />
        </div>
        <div className="space-y-3">
          {['Data Warehouse', 'Claims System', 'Policy Admin'].map((source, index) => (
            <div key={source} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
              <span className="text-sm font-semibold text-slate-700">{source}</span>
              <span className="text-xs text-slate-400">อัปเดต 10:{30 - index * 2}</span>
            </div>
          ))}
        </div>
        <button className="mt-4 text-sm font-bold text-[#1D4499] hover:underline">
          {String(t.viewAllSources)}
        </button>
      </section>
    </aside>
  )
}

type InsightItemProps = {
  tone: 'red' | 'green' | 'blue'
  icon: ReactNode
  title: string
  desc: string
  value: string
  trend: ReactNode
}

function InsightItem({ tone, icon, title, desc, value, trend }: InsightItemProps) {
  const styles = {
    red: 'bg-red-50 text-[#ED1F29] ring-red-100',
    green: 'bg-emerald-50 text-emerald-600 ring-emerald-100',
    blue: 'bg-blue-50 text-[#1D4499] ring-blue-100',
  }

  return (
    <div className={`rounded-2xl p-4 ring-1 ${styles[tone]}`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/70">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-extrabold">{title}</p>
          <p className="mt-1 text-xs opacity-75">{desc}</p>
          <div className="mt-3 flex items-center gap-1 text-2xl font-extrabold">
            {trend}
            {value}
          </div>
        </div>
      </div>
    </div>
  )
}

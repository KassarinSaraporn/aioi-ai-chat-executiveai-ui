import {
  AlertTriangle,
  CheckCircle2,
  Database,
  FileText,
  Lightbulb,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import type { DailyBriefResponse } from '../../types/executive'
import type { Language } from '../../types/api'

type Props = {
  language: Language
  brief: DailyBriefResponse | null
  loading?: boolean
}

type SectionCardProps = {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
  tone?: 'blue' | 'green' | 'red' | 'amber'
}

export function InsightPanel({ brief, loading }: Props) {
  if (loading) {
    return (
      <section className="rounded-[1.5rem] border border-blue-100 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 animate-pulse items-center justify-center rounded-2xl bg-blue-50 text-[#1D4499]">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#1D4499]">
              Executive Daily Brief
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-500">
              กำลังสร้าง Insight วันนี้...
            </p>
          </div>
        </div>
      </section>
    )
  }

  if (!brief) {
    return (
      <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-50 text-slate-400">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">
              Executive Daily Brief
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-500">
              ยังไม่มี Insight วันนี้
            </p>
          </div>
        </div>
      </section>
    )
  }

  const summary = cleanText(brief.summary)

  const snapshot = pickSection(summary, [
    'Executive Snapshot',
    'Executive Summary',
    'ภาพรวมธุรกิจ',
  ])

  const keyPerformance = pickSection(summary, [
    'Key Performance',
    'Key Numbers',
    'ตัวเลขสำคัญ',
  ])

  const insight = pickSection(summary, [
    'What AI Found',
    'Insight',
    'สิ่งที่ AI พบ',
  ])

  const risk = pickSection(summary, [
    'Risk Watch',
    'Risk / Warning',
    'ความเสี่ยง',
  ])

  const recommendation = pickSection(summary, [
    'Recommended Actions',
    'Recommendation',
    'คำแนะนำ',
  ])

  return (
    <aside className="rounded-[1.6rem] border border-blue-100 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#1D4499]">
            Executive Daily Brief
          </p>
          <h2 className="mt-1 flex items-center gap-2 text-xl font-black text-slate-950">
            Insight วันนี้
            <Sparkles className="h-4 w-4 text-[#1D4499]" />
          </h2>
        </div>

        <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#1D4499]">
          {brief.period}
        </div>
      </div>

      <div className="space-y-4">
        <SectionCard
          tone="blue"
          icon={<TrendingUp className="h-4 w-4" />}
          title="ภาพรวมธุรกิจ"
        >
          <BriefText text={snapshot || firstParagraph(summary)} />
        </SectionCard>

        {keyPerformance && (
          <SectionCard
            tone="green"
            icon={<Database className="h-4 w-4" />}
            title="ตัวเลขสำคัญ"
          >
            <BriefList text={keyPerformance} />
          </SectionCard>
        )}

        {insight && (
          <SectionCard
            tone="blue"
            icon={<Lightbulb className="h-4 w-4" />}
            title="สิ่งที่ AI พบ"
          >
            <BriefList text={insight} />
          </SectionCard>
        )}

        {risk && (
          <SectionCard
            tone="amber"
            icon={<AlertTriangle className="h-4 w-4" />}
            title="ความเสี่ยงที่ควรติดตาม"
          >
            <BriefList text={risk} />
          </SectionCard>
        )}

        {recommendation && (
          <SectionCard
            tone="green"
            icon={<CheckCircle2 className="h-4 w-4" />}
            title="คำแนะนำสำหรับผู้บริหาร"
          >
            <BriefList text={recommendation} />
          </SectionCard>
        )}
      </div>

      <div className="mt-5 border-t border-slate-100 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-medium text-slate-400">
          <span>Period: {brief.period}</span>
          <span>
            Generated: {new Date(brief.generatedAt).toLocaleString('th-TH')}
          </span>
        </div>
      </div>
    </aside>
  )
}

function SectionCard({ icon, title, children, tone = 'blue' }: SectionCardProps) {
  const styles = {
    blue: {
      card: 'bg-blue-50/50 ring-blue-100',
      icon: 'bg-white text-[#1D4499]',
      title: 'text-[#1D4499]',
    },
    green: {
      card: 'bg-emerald-50/50 ring-emerald-100',
      icon: 'bg-white text-emerald-600',
      title: 'text-emerald-700',
    },
    red: {
      card: 'bg-red-50/50 ring-red-100',
      icon: 'bg-white text-[#ED1F29]',
      title: 'text-[#ED1F29]',
    },
    amber: {
      card: 'bg-amber-50/60 ring-amber-100',
      icon: 'bg-white text-amber-600',
      title: 'text-amber-700',
    },
  }

  return (
    <div className={`rounded-2xl p-4 ring-1 ${styles[tone].card}`}>
      <div className="flex items-start gap-3">
        <div
          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl shadow-sm ${styles[tone].icon}`}
        >
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <p className={`text-sm font-black ${styles[tone].title}`}>
            {title}
          </p>
          <div className="mt-2 text-sm leading-6 text-slate-700">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

function BriefText({ text }: { text: string }) {
  return (
    <p className="whitespace-pre-wrap break-words">
      {removeBullets(text)}
    </p>
  )
}

function BriefList({ text }: { text: string }) {
  const lines = toLines(text)

  if (lines.length === 0) {
    return null
  }

  return (
    <ul className="space-y-1.5">
      {lines.slice(0, 5).map((line, index) => (
        <li key={`${line}-${index}`} className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50" />
          <span>{line}</span>
        </li>
      ))}
    </ul>
  )
}

function cleanText(value: string) {
  return value
    .replace(/\*\*/g, '')
    .replace(/###/g, '')
    .replace(/##/g, '')
    .replace(/#/g, '')
    .trim()
}

function removeBullets(value: string) {
  return value
    .replace(/^[-•]\s?/gm, '')
    .replace(/^\d+\.\s?/gm, '')
    .trim()
}

function toLines(value: string) {
  return value
    .split('\n')
    .map((line) =>
      line
        .replace(/^[-•]\s?/g, '')
        .replace(/^\d+\.\s?/g, '')
        .replace(/^[:：]\s?/g, '')
        .trim(),
    )
    .filter(Boolean)
    .filter((line) => !isHeading(line))
}

function firstParagraph(value: string) {
  return (
    value
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .find((line) => !isHeading(line)) || value
  )
}

function pickSection(text: string, headings: string[]) {
  const lines = text.split('\n')
  const startIndex = lines.findIndex((line) =>
    headings.some((heading) =>
      normalize(line).includes(normalize(heading)),
    ),
  )

  if (startIndex === -1) return ''

  const result: string[] = []

  for (let i = startIndex + 1; i < lines.length; i += 1) {
    const line = lines[i]

    if (isHeading(line) && result.length > 0) {
      break
    }

    result.push(line)
  }

  return result.join('\n').trim()
}

function isHeading(value: string) {
  const text = normalize(value)

  return [
    'executive snapshot',
    'executive summary',
    'key performance',
    'key numbers',
    'what ai found',
    'insight',
    'risk watch',
    'risk warning',
    'recommendation',
    'recommended actions',
    'ภาพรวมธุรกิจ',
    'ตัวเลขสำคัญ',
    'สิ่งที่ ai พบ',
    'ความเสี่ยง',
    'คำแนะนำ',
  ].some((heading) => text.includes(normalize(heading)))
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[📊💰🔎⚠️✅*:#]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}
import {
  ArrowDownRight,
  ArrowUpRight,
  BadgePercent,
  CircleDollarSign,
  FileText,
  RefreshCw,
  ShieldAlert,
  PackageCheck,
  ClipboardList,
} from 'lucide-react'
import type { KpiOverview } from '../../types/executive'

type KpiCardsProps = {
  kpi: KpiOverview | null
}

function formatNumber(value: number | null | undefined) {
  return new Intl.NumberFormat('th-TH', {
    maximumFractionDigits: 0,
  }).format(value ?? 0)
}

function formatMoneyShort(value: number | null | undefined) {
  const amount = value ?? 0

  if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(1)}M`
  }

  if (amount >= 1_000) {
    return `${(amount / 1_000).toFixed(1)}K`
  }

  return formatNumber(amount)
}

export function KpiCards({ kpi }: KpiCardsProps) {
  if (!kpi) {
    return (
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7].map((item) => (
          <article
            key={item}
            className="h-32 animate-pulse rounded-[1.4rem] border border-slate-200 bg-white p-4 shadow-sm sm:h-36 sm:rounded-[1.6rem] sm:p-5"
          >
            <div className="h-4 w-28 rounded bg-slate-200" />
            <div className="mt-5 h-8 w-24 rounded bg-slate-200" />
            <div className="mt-5 h-4 w-36 rounded bg-slate-100" />
          </article>
        ))}
      </section>
    )
  }

  const cards = [
    {
      title: 'ยอดรวมเบี้ยประกัน',
      value: formatMoneyShort(kpi.totalPremium),
      suffix: 'บาท',
      change: 'ข้อมูลปัจจุบัน',
      direction: 'up',
      icon: CircleDollarSign,
      status: 'normal',
    },
    {
      title: 'Policy Count',
      value: formatNumber(kpi.policyCount),
      suffix: 'ฉบับ',
      change: 'จำนวนกรมธรรม์',
      direction: 'up',
      icon: ClipboardList,
      status: 'normal',
    },
    {
      title: 'Loss Ratio',
      value: `${kpi.lossRatioPercent ?? 0}%`,
      suffix: '',
      change:
        (kpi.lossRatioPercent ?? 0) >= 80
          ? 'High Risk'
          : (kpi.lossRatioPercent ?? 0) >= 60
            ? 'Watch'
            : 'Good',
      direction: (kpi.lossRatioPercent ?? 0) >= 80 ? 'up' : 'down',
      icon: BadgePercent,
      status:
        (kpi.lossRatioPercent ?? 0) >= 80
          ? 'danger'
          : (kpi.lossRatioPercent ?? 0) >= 60
            ? 'warning'
            : 'good',
    },
    {
      title: 'ค่าสินไหมรวม',
      value: formatMoneyShort(kpi.totalClaimAmount),
      suffix: 'บาท',
      change: `${formatNumber(kpi.claimCount)} claims`,
      direction: 'up',
      icon: FileText,
      status: 'warning',
    },
    {
      title: 'Renewal Rate',
      value: `${kpi.renewalRatePercent ?? 0}%`,
      suffix: '',
      change: `${formatNumber(kpi.renewedCount)} / ${formatNumber(kpi.renewalDueCount)} renewed`,
      direction: (kpi.renewalRatePercent ?? 0) >= 80 ? 'up' : 'down',
      icon: RefreshCw,
      status:
        (kpi.renewalRatePercent ?? 0) >= 80
          ? 'good'
          : (kpi.renewalRatePercent ?? 0) >= 60
            ? 'warning'
            : 'danger',
    },
    {
      title: 'Broker Risk',
      value: formatNumber(kpi.highRiskBrokerCount),
      suffix: 'ราย',
      change: `${formatNumber(kpi.mediumRiskBrokerCount)} medium risk`,
      direction: (kpi.highRiskBrokerCount ?? 0) > 0 ? 'up' : 'down',
      icon: ShieldAlert,
      status: (kpi.highRiskBrokerCount ?? 0) > 0 ? 'danger' : 'good',
    },
    {
      title: 'Product Profitability',
      value: formatMoneyShort(kpi.totalUnderwritingProfit),
      suffix: 'บาท',
      change: `${formatNumber(kpi.lossProductCount)} products loss`,
      direction: (kpi.totalUnderwritingProfit ?? 0) >= 0 ? 'up' : 'down',
      icon: PackageCheck,
      status: (kpi.totalUnderwritingProfit ?? 0) >= 0 ? 'good' : 'danger',
    },
  ]

  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon
        const DirectionIcon = card.direction === 'down' ? ArrowDownRight : ArrowUpRight

        const statusClass =
          card.status === 'danger'
            ? 'text-red-600'
            : card.status === 'warning'
              ? 'text-amber-600'
              : card.status === 'good'
                ? 'text-emerald-600'
                : 'text-emerald-600'

        return (
          <article
            key={card.title}
            className="rounded-[1.4rem] border border-slate-200 bg-white p-4 shadow-sm sm:rounded-[1.6rem] sm:p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  {card.title}
                </p>

                <div className="mt-3 flex items-end gap-2">
                  <p className="text-2xl font-extrabold text-slate-950 sm:text-3xl">
                    {card.value}
                  </p>

                  {card.suffix && (
                    <p className="pb-1 text-sm font-medium text-slate-400">
                      {card.suffix}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#1D4499] sm:h-12 sm:w-12">
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
            </div>

            <div className={`mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold sm:text-sm ${statusClass}`}>
              <DirectionIcon className="h-4 w-4" />
              {card.change}
            </div>
          </article>
        )
      })}
    </section>
  )
}
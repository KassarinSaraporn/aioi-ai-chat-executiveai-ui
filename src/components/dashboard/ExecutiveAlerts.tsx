import { AlertTriangle, Bot, Database } from 'lucide-react'
import type { ExecutiveAlert } from '../../types/executive'

type ExecutiveAlertsProps = {
  alerts: ExecutiveAlert[]
  onAskAi?: (question: string) => void
}

function formatValue(value: number) {
  return new Intl.NumberFormat('th-TH', {
    maximumFractionDigits: 2,
  }).format(value)
}

export function ExecutiveAlerts({ alerts, onAskAi }: ExecutiveAlertsProps) {
  if (!alerts.length) {
    return (
      <section className="rounded-[1.6rem] border border-emerald-200 bg-emerald-50 p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-bold text-emerald-800">ไม่พบ Alert สำคัญ</h2>
            <p className="mt-1 text-sm text-emerald-700">
              ข้อมูลช่วงเวลานี้ยังไม่พบความเสี่ยงที่เกินเกณฑ์
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-extrabold text-slate-950">
            Executive Alerts
          </h2>
          <p className="text-sm text-slate-500">
            รายการที่ผู้บริหารควรติดตามเป็นพิเศษ
          </p>
        </div>

        <div className="rounded-full bg-red-50 px-3 py-1 text-sm font-bold text-red-600">
          {alerts.length} alerts
        </div>
      </div>

      <div className="space-y-3">
        {alerts.map((alert, index) => {
          const severityClass =
            alert.severity === 'High'
              ? 'border-red-200 bg-red-50 text-red-700'
              : alert.severity === 'Medium'
                ? 'border-amber-200 bg-amber-50 text-amber-700'
                : 'border-blue-200 bg-blue-50 text-blue-700'

          const question = `${alert.alertType}: ${alert.title} ${alert.description} ค่า ${formatValue(alert.value)} ช่วยวิเคราะห์สาเหตุ ผลกระทบ และคำแนะนำสำหรับผู้บริหาร`

          return (
            <article
              key={`${alert.alertType}-${alert.title}-${index}`}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-red-600">
                    <AlertTriangle className="h-5 w-5" />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-slate-950">
                        {alert.title}
                      </h3>

                      <span className={`rounded-full border px-2 py-0.5 text-xs font-bold ${severityClass}`}>
                        {alert.severity}
                      </span>
                    </div>

                    <p className="mt-1 text-sm font-medium text-slate-600">
                      {alert.description}
                    </p>

                    <p className="mt-2 text-sm text-slate-500">
                      Value:{' '}
                      <span className="font-bold text-slate-800">
                        {formatValue(alert.value)}
                      </span>
                    </p>

                    <div className="mt-2 flex items-center gap-1 text-xs text-slate-400">
                      <Database className="h-3.5 w-3.5" />
                      {alert.dataSource}
                    </div>
                  </div>
                </div>

                {onAskAi && (
                  <button
                    onClick={() => onAskAi(question)}
                    className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#1D4499] px-3 py-2 text-sm font-bold text-white hover:bg-[#16377d]"
                  >
                    <Bot className="h-4 w-4" />
                    Ask AI
                  </button>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
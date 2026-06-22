import { Bot, UsersRound } from 'lucide-react'
import type { CustomerRenewalRiskGroup } from '../../types/executive'

type Props = {
  groups: CustomerRenewalRiskGroup[]
  onAskAi?: (question: string) => void
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('th-TH', {
    maximumFractionDigits: 0,
  }).format(value ?? 0)
}

export function CustomerRenewalRisk({ groups, onAskAi }: Props) {
  if (!groups.length) {
    return (
      <section className="rounded-[1.4rem] border border-slate-200 bg-white p-4 shadow-sm sm:rounded-[1.6rem] sm:p-5">
        <h2 className="text-lg font-extrabold text-slate-950">
          Customer Renewal Risk
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          ยังไม่พบข้อมูลกลุ่มลูกค้าเสี่ยงไม่ต่ออายุในช่วงเวลานี้
        </p>
      </section>
    )
  }

  return (
    <section className="rounded-[1.4rem] border border-slate-200 bg-white p-4 shadow-sm sm:rounded-[1.6rem] sm:p-5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-slate-950">
            Customer Renewal Risk
          </h2>
          <p className="text-sm text-slate-500">
            กลุ่มลูกค้าที่มีความเสี่ยงไม่ต่ออายุ
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-[#1D4499]">
          <UsersRound className="h-5 w-5" />
        </div>
      </div>

      <div className="space-y-3">
        {groups.map((item) => {
          const question =
            `กลุ่มลูกค้า ${item.customerGroup} มีความเสี่ยงไม่ต่ออายุ ` +
            `${item.highRiskPercent}% จำนวน ${item.highRiskCount} ราย ` +
            `จากทั้งหมด ${item.renewalDueCount} ราย ` +
            `ช่วยวิเคราะห์สาเหตุ ผลกระทบ และแนวทางรักษาลูกค้าสำหรับผู้บริหาร`

          return (
            <article
              key={item.customerGroup}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-slate-950">
                    {item.customerGroup}
                  </h3>

                  <div className="mt-2 grid gap-2 text-sm text-slate-600 sm:grid-cols-2 xl:grid-cols-4">
                    <p>
                      Renewal Due:{' '}
                      <span className="font-bold text-slate-900">
                        {formatNumber(item.renewalDueCount)}
                      </span>
                    </p>

                    <p>
                      High Risk:{' '}
                      <span className="font-bold text-red-600">
                        {formatNumber(item.highRiskCount)}
                      </span>
                    </p>

                    <p>
                      Risk %:{' '}
                      <span className="font-bold text-red-600">
                        {item.highRiskPercent}%
                      </span>
                    </p>

                    <p>
                      Avg Probability:{' '}
                      <span className="font-bold text-slate-900">
                        {item.avgRenewalProbabilityPercent}%
                      </span>
                    </p>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-red-500"
                      style={{
                        width: `${Math.min(item.highRiskPercent, 100)}%`,
                      }}
                    />
                  </div>
                </div>

                {onAskAi && (
                  <button
                    onClick={() => onAskAi(question)}
                    className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#1D4499] px-3 py-2 text-sm font-bold text-white hover:bg-[#16377d] sm:w-auto"
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
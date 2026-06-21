export type KpiOverview = {
  dataPeriod: string
  policyCount: number
  totalPremium: number
  totalSumInsured: number
  claimCount: number
  totalClaimAmount: number
  lossRatioPercent: number
  renewalDueCount: number
  renewedCount: number
  renewalRatePercent: number
  highRiskBrokerCount: number
  mediumRiskBrokerCount: number
  lossProductCount: number
  profitableProductCount: number
  totalUnderwritingProfit: number
}

export type ExecutiveAlert = {
  alertType: string
  title: string
  description: string
  value: number
  severity: 'High' | 'Medium' | 'Low'
  dataSource: string
}

export type ExecutiveAlertsResponse = {
  period: string
  alerts: ExecutiveAlert[]
}

export type AskExecutiveRequest = {
  question: string
  period: string
  language: 'th' | 'en'
  sessionId?: string | null
}

export type AskExecutiveResponse = {
  sessionId: string
  question: string
  period: string
  language: string
  intent: string
  data: unknown
  answer: string
}

export type CustomerRenewalRiskGroup = {
  dataPeriod: string
  customerGroup: string
  renewalDueCount: number
  highRiskCount: number
  mediumRiskCount: number
  lowRiskCount: number
  avgRenewalProbabilityPercent: number
  highRiskPercent: number
}

export type CustomerRenewalRiskGroupsResponse = {
  period: string
  groups: CustomerRenewalRiskGroup[]
}
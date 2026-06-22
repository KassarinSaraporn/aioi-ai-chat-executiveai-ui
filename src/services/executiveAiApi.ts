import { apiFetch } from './httpClient'
import type { AiAskRequest, AiAskResponse } from '../types/api'
import type { CustomerRenewalRiskGroupsResponse,ExecutiveAlertsResponse,
  KpiOverview, } from '../types/executive'
import type { AiFeedbackRequest } from '../types/executive'
const apiUrl = import.meta.env.VITE_API_URL
import type { DailyBriefResponse } from '../types/executive'
function getToken() {
  return localStorage.getItem('access_token')
}

export async function askExecutiveAi(payload: AiAskRequest) {
  return apiFetch<AiAskResponse>('/api/ai-executive/ask', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function saveAiFeedback(payload: AiFeedbackRequest) {
  return apiFetch<{ message: string }>('/api/ai-feedback', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}


export async function getKpiOverview(period: string) {
  return apiFetch<KpiOverview>(
    `/api/executive/kpi-overview?period=${encodeURIComponent(period)}`
  )
}


export async function getExecutiveAlerts(period: string) {
  return apiFetch<ExecutiveAlertsResponse>(
    `/api/executive/alerts?period=${encodeURIComponent(period)}`
  )
}

export async function getCustomerRenewalRiskGroups(period: string) {
  return apiFetch<CustomerRenewalRiskGroupsResponse>(
    `/api/executive/customer-renewal-risk-groups?period=${encodeURIComponent(period)}`
  )
}

export async function getDailyBrief(period: string, language: string) {
  return apiFetch<DailyBriefResponse>(
    `/api/executive-insight/daily-brief?period=${period}&language=${language}`
  )
}

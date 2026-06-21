import { apiFetch } from './httpClient'
import type { AiAskRequest, AiAskResponse } from '../types/api'
import type { CustomerRenewalRiskGroupsResponse,ExecutiveAlertsResponse,
  KpiOverview, } from '../types/executive'

const apiUrl = import.meta.env.VITE_API_URL

function getToken() {
  return localStorage.getItem('access_token')
}

export async function askExecutiveAi(payload: AiAskRequest) {
  return apiFetch<AiAskResponse>('/api/ai-executive/ask', {
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

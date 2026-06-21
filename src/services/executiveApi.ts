import { apiFetch } from './httpClient'
import type {
  AskExecutiveRequest,
  AskExecutiveResponse,
  ExecutiveAlertsResponse,
  KpiOverview,
} from '../types/executive'

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

export async function askExecutiveAi(payload: AskExecutiveRequest) {
  return apiFetch<AskExecutiveResponse>('/api/ai-executive/ask', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
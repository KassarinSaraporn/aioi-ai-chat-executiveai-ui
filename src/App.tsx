import { useEffect, useMemo, useState } from 'react'
import type { AuthUser, ChatMessage, ChatSession, Language } from './types/api'
import { getCurrentUser } from './services/authApi'
import { clearAuth, getToken } from './services/httpClient'
import { getChatMessages, getChatSessions } from './services/chatApi'
import { getCopy } from './data/i18n'
import { LoginPage } from './components/auth/LoginPage'
import { AppShell } from './components/layout/AppShell'
import { HeroSection } from './components/dashboard/HeroSection'
import { KpiCards } from './components/dashboard/KpiCards'
import { InsightPanel } from './components/dashboard/InsightPanel'
import { ChatWindow } from './components/chat/ChatWindow'
import type {  AskExecutiveResponse,ExecutiveAlert,KpiOverview } from './types/executive'
import { askExecutiveAi,getExecutiveAlerts,getKpiOverview } from './services/executiveAiApi'
import { ExecutiveAlerts } from './components/dashboard/ExecutiveAlerts'

import { CustomerRenewalRisk } from './components/dashboard/CustomerRenewalRisk'
import { getCustomerRenewalRiskGroups } from './services/executiveAiApi'
import type { CustomerRenewalRiskGroup } from './types/executive'
import { saveAiFeedback } from './services/executiveAiApi'
import { getDailyBrief } from './services/executiveAiApi'
import type { DailyBriefResponse } from './types/executive'

function App() {
  const [language, setLanguage] = useState<Language>('th')
  const [user, setUser] = useState<AuthUser | null>(() => getCurrentUser())
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [period, setPeriod] = useState('2026-06')
  const [input, setInput] = useState('')
  const [loadingSessions, setLoadingSessions] = useState(false)
  const [loadingMessages, setLoadingMessages] = useState(false)
  const [asking, setAsking] = useState(false)
  const [error, setError] = useState('')
  const [kpi, setKpi] = useState<KpiOverview | null>(null)
  const [alerts, setAlerts] = useState<ExecutiveAlert[]>([])
  const [loading, setLoading] = useState(false)
const [aiLoading, setAiLoading] = useState(false)
  const [aiResult, setAiResult] = useState<AskExecutiveResponse | null>(null)
const [renewalRiskGroups, setRenewalRiskGroups] = useState<CustomerRenewalRiskGroup[]>([])
const [feedbackStatus, setFeedbackStatus] = useState('')
const [dailyBrief, setDailyBrief] = useState<DailyBriefResponse | null>(null)
const [dailyBriefLoading, setDailyBriefLoading] = useState(false)
  const t = useMemo(() => getCopy(language), [language])
  
useEffect(() => {
  if (!user || !getToken()) return
loadSessions()
  loadDailyBrief()
}, [user, period, language])

 useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true)

      try {
        const [kpiData, alertData, renewalRiskData] = await Promise.all([
  getKpiOverview(period),
  getExecutiveAlerts(period),
  getCustomerRenewalRiskGroups('2026-07'),
])

        setKpi(kpiData)
        setAlerts(alertData.alerts)
        setRenewalRiskGroups(renewalRiskData.groups)
      } catch (error) {
        console.error(error)
        setKpi(null)
        setAlerts([])
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [period])

  async function loadSessions(nextActiveId?: string) {
    setLoadingSessions(true)
    try {
      const result = await getChatSessions()
      setSessions(result)

      if (nextActiveId) {
        setActiveSessionId(nextActiveId)
        return
      }

      if (!activeSessionId && result.length > 0) {
        setActiveSessionId(result[0].id)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load sessions')
    } finally {
      setLoadingSessions(false)
    }
  }

  useEffect(() => {
    if (activeSessionId) {
      void loadMessages(activeSessionId)
    } else {
      setMessages([])
    }
  }, [activeSessionId])

  async function loadMessages(sessionId: string) {
    setLoadingMessages(true)
    setError('')
    try {
      const result = await getChatMessages(sessionId)
      setMessages(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load messages')
    } finally {
      setLoadingMessages(false)
    }
  }
async function loadDailyBrief() {
  setDailyBriefLoading(true)

  try {
    const result = await getDailyBrief(period, language)
    setDailyBrief(result)
  } catch (error) {
    console.error(error)
  } finally {
    setDailyBriefLoading(false)
  }
}
async function handleFeedback(rating: 'helpful' | 'not_helpful') {
  if (!aiResult) return

  setFeedbackStatus('')

  try {
    await saveAiFeedback({
      sessionId: aiResult.sessionId,
      messageId: null,
      intent: aiResult.intent,
      period: aiResult.period,
      rating,
      comment: null,
    })

    setFeedbackStatus(
      rating === 'helpful'
        ? 'ขอบคุณสำหรับ Feedback: มีประโยชน์'
        : 'ขอบคุณสำหรับ Feedback: ไม่ถูกต้อง'
    )
  } catch (error) {
    setFeedbackStatus('ไม่สามารถบันทึก Feedback ได้')
  }
}

  function handleLoginSuccess(authUser: AuthUser) {
    setUser(authUser)
  }

  function handleLogout() {
    clearAuth()
    setUser(null)
    setSessions([])
    setMessages([])
    setActiveSessionId(null)
  }

  function handleNewChat() {
    setActiveSessionId(null)
    setMessages([])
    setInput('')
    setError('')
  }

  async function handleAsk() {
    const question = input.trim()
    if (!question || asking) return

    setAsking(true)
    setError('')
    setInput('')

    const tempSessionId = activeSessionId || 'temp'
    const now = new Date().toISOString()
    const optimisticUserMessage: ChatMessage = {
      id: `temp_user_${Date.now()}`,
      sessionId: tempSessionId,
      role: 'user',
      content: question,
      createdAt: now,
    }

    setMessages((current) => [...current, optimisticUserMessage])

    try {
      const response = await askExecutiveAi({
        question,
        period,
        language,
        sessionId: activeSessionId,
      })

      const assistantMessage: ChatMessage = {
        id: `temp_assistant_${Date.now()}`,
        sessionId: response.sessionId,
        role: 'assistant',
        content: response.answer,
        sources: response.data,
        createdAt: new Date().toISOString(),
      }

      setActiveSessionId(response.sessionId)
      setMessages((current) => [
        ...current.filter((item) => item.id !== optimisticUserMessage.id),
        { ...optimisticUserMessage, sessionId: response.sessionId },
        assistantMessage,
      ])
      await loadSessions(response.sessionId)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(t.askError))
    } finally {
      setAsking(false)
    }
  }
async function handleAskAiFromAlert(question: string) {
  setAiLoading(true)
  setAiResult(null)
  setError('')

  try {
    const result = await askExecutiveAi({
      question,
      period,
      language,
      sessionId: activeSessionId,
    })

    setAiResult(result)

    const now = new Date().toISOString()

    const userMessage: ChatMessage = {
      id: `alert_user_${Date.now()}`,
      sessionId: result.sessionId,
      role: 'user',
      content: question,
      createdAt: now,
    }

    const assistantMessage: ChatMessage = {
      id: `alert_assistant_${Date.now()}`,
      sessionId: result.sessionId,
      role: 'assistant',
      content: result.answer,
      sources: result.data,
      createdAt: new Date().toISOString(),
    }

    setActiveSessionId(result.sessionId)
    setMessages((current) => [
      ...current,
      userMessage,
      assistantMessage,
    ])

    await loadSessions(result.sessionId)
  } catch (error) {
    setError(error instanceof Error ? error.message : 'Ask AI from alert failed')
  } finally {
    setAiLoading(false)
  }
}
  if (!user || !getToken()) {
    return (
      <LoginPage
        language={language}
        onLanguageChange={setLanguage}
        onLoginSuccess={handleLoginSuccess}
      />
    )
  }
  
  return (
    <AppShell
      user={user}
      language={language}
      sessions={sessions}
      activeSessionId={activeSessionId}
      sessionsLoading={loadingSessions}
      onLanguageChange={setLanguage}
      onLogout={handleLogout}
      onSelectSession={setActiveSessionId}
      onNewChat={handleNewChat}
    >
      <div className="scrollbar-soft h-[calc(100vh-77px)] overflow-y-auto px-4 py-5 lg:px-7 lg:py-6">
        <div className="mx-auto max-w-[1600px] space-y-5">
          <HeroSection language={language} />
          <KpiCards kpi={kpi} />
    <ExecutiveAlerts
        alerts={alerts}
        onAskAi={handleAskAiFromAlert}
      />
<CustomerRenewalRisk
  groups={renewalRiskGroups}
  onAskAi={handleAskAiFromAlert}
/>
{aiLoading && (
  <section className="rounded-[1.6rem] border border-blue-100 bg-blue-50 p-5 text-[#1D4499] shadow-sm">
    <p className="text-sm font-bold">AI กำลังวิเคราะห์ Alert...</p>
    <p className="mt-1 text-xs text-blue-700">
      กำลังสร้าง Insight และ Recommendation สำหรับผู้บริหาร
    </p>
  </section>
)}

{aiResult && (
  <section className="rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-sm">
    <div className="mb-3 flex items-start justify-between gap-3">
      <div>
        <h2 className="text-lg font-extrabold text-slate-950">
          AI Insight จาก Alert
        </h2>
        <p className="text-sm text-slate-500">
          Period: {aiResult.period} | Intent: {aiResult.intent}
        </p>
      </div>

      <button
        onClick={() => navigator.clipboard.writeText(aiResult.answer)}
        className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50"
      >
        Copy Report
      </button>
    </div>

    <div className="whitespace-pre-wrap rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">
      {aiResult.answer}
    </div>
  </section>
)}

          <div className="grid gap-5 xl:grid-cols-[1fr_340px]">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-[1.4rem] border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <div>
                  <p className="text-sm font-bold text-slate-700">AI Chat</p>
                  <p className="text-xs text-slate-400">
                    Session: {activeSessionId || 'New conversation'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs font-bold text-slate-500">Period</label>
                  <input
                    value={period}
                    onChange={(event) => setPeriod(event.target.value)}
                    className="w-28 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 outline-none focus:border-[#1D4499]"
                    placeholder="2026-06"
                  />
                </div>
              </div>

              <ChatWindow
                language={language}
                messages={messages}
                input={input}
                loading={asking || loadingMessages}
                error={error}
                onInputChange={setInput}
                onSubmit={handleAsk}
                onSelectPrompt={setInput}
              />
            </div>

            <InsightPanel
  language={language}
  brief={dailyBrief}
  loading={dailyBriefLoading}
/>
          </div>
        </div>
      </div>
    </AppShell>
  )
}

export default App



/*

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

*/
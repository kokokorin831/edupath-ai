'use client'

import { useState } from 'react'

type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const DEMO_STUDENT_ID = process.env.NEXT_PUBLIC_DEMO_STUDENT_ID ?? ''

export default function StudentChatPage() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        '你好！我是你的專屬升學管家 Master Agent。可以問我任何關於 JUPAS、UCAS 或醫科申請的問題。',
    },
  ])

  async function handleSend() {
    const question = input.trim()
    if (!question || loading) return
    setInput('')

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: question,
    }
    setMessages((prev) => [...prev, userMsg])
    setLoading(true)

    try {
      const res = await fetch('/api/chat/master', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: DEMO_STUDENT_ID,
          question,
        }),
      })

      if (!res.ok) {
        throw new Error('Master agent 呼叫失敗')
      }

      const data = await res.json()

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.answerMarkdown ?? '（Master Agent 未返回內容）',
      }
      setMessages((prev) => [...prev, assistantMsg])
    } catch (error) {
      console.error(error)
      const errMsg: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: '抱歉，後端 Master Agent 暫時無法回應，請稍後再試。',
      }
      setMessages((prev) => [...prev, errMsg])
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="pt-20 pb-10 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-panel rounded-2xl p-6 border border-slate-700 lg:col-span-2 flex flex-col h-[520px]">
          <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <i className="fas fa-robot text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white">Master Agent - 升學管家</h3>
                <p className="text-xs text-slate-400">
                  協調 Academic / Pathway / Essay / Deadline / RAG 等多個 sub-agents
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 ${
                  m.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {m.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex-shrink-0 flex items-center justify-center text-xs">
                    <i className="fas fa-robot text-white" />
                  </div>
                )}
                <div
                  className={`rounded-2xl px-4 py-3 max-w-[80%] text-sm ${
                    m.role === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-slate-800 text-slate-100 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.content}</p>
                </div>
                {m.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex-shrink-0 flex items-center justify-center text-xs">
                    <i className="fas fa-user text-white" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-indigo-300 text-xs">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full thinking-dot" />
                  <div className="w-2 h-2 bg-indigo-400 rounded-full thinking-dot" />
                  <div className="w-2 h-2 bg-indigo-400 rounded-full thinking-dot" />
                </div>
                <span>Master Agent 正在協調各 sub-agents 分析你的問題...</span>
              </div>
            )}
          </div>

          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleSend()
                }
              }}
              placeholder="輸入問題，例如：『我想申請港大醫科，這樣的成績有多大機會？』"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:border-blue-500 transition"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={loading}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-300 disabled:opacity-50"
            >
              <i className="fas fa-paper-plane" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass-panel rounded-2xl p-4 border border-slate-700">
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
              <i className="fas fa-network-wired text-purple-400" />
              Multi-Agent 活動概況
            </h4>
            <p className="text-xs text-slate-400">
              每次提問時，Master Agent 會同時喚起 Academic / Pathway / Essay / Deadline / RAG
              等多個 sub-agents，並將結果整合成一個清晰的建議。
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}


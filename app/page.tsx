import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="glass max-w-xl w-full rounded-2xl px-6 py-8 border border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <span className="text-white text-xl font-bold">E</span>
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight">EduPath AI</h1>
            <p className="text-[11px] text-slate-400 uppercase tracking-[0.2em]">
              Multi-Agent 升學諮詢平台
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-300 mb-6">
          選擇你的入口：
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/student/dashboard"
            className="flex items-center justify-between px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-sm font-medium text-white transition-colors"
          >
            <span>
              <span className="mr-2">👨‍🎓</span>
              以學生身份進入系統
            </span>
            <span className="text-xs text-blue-100">Dashboard + AI 顧問</span>
          </Link>

          <Link
            href="/advisor/dashboard"
            className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-medium text-slate-100 border border-slate-600 transition-colors"
          >
            <span>
              <span className="mr-2">👔</span>
              以顧問身份進入系統
            </span>
            <span className="text-xs text-slate-300">Cohort Analytics</span>
          </Link>

          <Link
            href="/demo"
            className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-sm font-medium text-slate-100 border border-slate-700 transition-colors"
          >
            <span>
              <span className="mr-2">✨</span>
              查看完整流程 Demo
            </span>
            <span className="text-xs text-slate-300">Digital Twin + Multi-Agent</span>
          </Link>
        </div>
      </div>
    </main>
  )
}

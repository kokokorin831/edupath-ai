'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GraduationCap, User, UserCog, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || '登入失敗')
      }

      // Redirect based on role
      if (data.role === 'student') {
        router.push('/student/dashboard')
      } else if (data.role === 'advisor' || data.role === 'admin') {
        router.push('/advisor/dashboard')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const demoAccounts = [
    { email: 'student@demo.com', role: '學生', icon: User },
    { email: 'advisor@demo.com', role: '顧問', icon: UserCog },
  ]

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="glass max-w-md w-full rounded-2xl px-8 py-10 border border-slate-700">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <GraduationCap className="text-white w-7 h-7" />
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight text-white">EduPath AI</h1>
            <p className="text-[11px] text-slate-400 uppercase tracking-[0.2em]">
              Multi-Agent 升學諮詢平台
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              電子郵件
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="輸入您的電子郵件"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                登入 <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Accounts */}
        <div className="mt-8 pt-6 border-t border-slate-700">
          <p className="text-xs text-slate-400 text-center mb-4">快速登入 (Demo)</p>
          <div className="space-y-2">
            {demoAccounts.map((account, i) => (
              <button
                key={i}
                onClick={() => setEmail(account.email)}
                className="w-full flex items-center gap-3 p-3 bg-slate-800/50 hover:bg-slate-800 rounded-xl border border-slate-700 transition text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <account.icon className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">{account.role} Demo</div>
                  <div className="text-xs text-slate-400">{account.email}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </button>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500">
            首次使用請確保已執行 <code className="bg-slate-800 px-2 py-1 rounded">npm run db:seed</code>
          </p>
        </div>
      </div>
    </main>
  )
}

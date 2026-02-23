import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

const DEMO_STUDENT_ID = process.env.DEMO_STUDENT_ID ?? ''

async function getData() {
  if (!DEMO_STUDENT_ID) {
    return { profile: null as any, pathway: null as any, deadlines: [] as any[] }
  }

  const profile = await prisma.studentProfile.findFirst({
    where: { userId: DEMO_STUDENT_ID },
    include: { user: true },
  })

  const pathwayPlan = await prisma.pathwayPlan.findFirst({
    where: {
      student: {
        userId: DEMO_STUDENT_ID,
      },
    },
    orderBy: { generatedAt: 'desc' },
  })

  const deadlines = await prisma.deadlineItem.findMany({
    where: {
      student: {
        userId: DEMO_STUDENT_ID,
      },
    },
    orderBy: { date: 'asc' },
  })

  return { profile, pathwayPlan, deadlines }
}

export default async function StudentDashboardPage() {
  const { profile, pathwayPlan, deadlines } = await getData()

  return (
    <main className="pt-20 pb-10 px-4 max-w-7xl mx-auto">
      <nav className="fixed top-0 w-full glass z-50 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <i className="fas fa-graduation-cap text-white text-xl" />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight">EduPath AI</h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest">
                Student Portal
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 text-xs">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-slate-300">
              {profile ? 'Digital Twin Active' : '等待初始化 Digital Twin'}
            </span>
          </div>
        </div>
      </nav>

      <div className="pt-6 dashboard-grid">
        <aside className="glass-strong rounded-2xl p-4 border border-slate-700 h-fit sticky top-24">
          <div className="flex items-center gap-3 mb-6 p-3 bg-slate-800/50 rounded-xl border border-slate-700">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
              {profile?.user.name?.[0] ?? '同'}
            </div>
            <div>
              <div className="font-bold text-white">
                {profile?.user.name ?? '示例學生'}
              </div>
              <div className="text-xs text-slate-400">
                {profile ? `${profile.school} · DSE ${profile.graduationYear}` : '尚未建立學生資料'}
              </div>
            </div>
          </div>

          <nav className="space-y-2">
            <span className="flex items-center gap-3 px-4 py-3 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30 text-sm">
              <i className="fas fa-home w-5" />
              <span className="font-medium">儀表板</span>
            </span>
          </nav>
        </aside>

        <div className="space-y-6">
          <div className="glass rounded-2xl p-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-2">
              歡迎回來，
              {profile?.user.name ?? '示例學生'}
            </h2>
            <p className="text-slate-400">
              你的升學規劃會由{' '}
              <span className="text-blue-400 font-semibold">Master Agent</span>{' '}
              及多個專業 sub-agents 一同協助完成。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-strong rounded-2xl p-6 border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <i className="fas fa-university text-blue-400" />
                </div>
                <span className="text-xs text-slate-500">主要目標</span>
              </div>
              <div className="text-lg font-bold text-white mb-1">
                {pathwayPlan ? '主要路徑' : '尚未生成路徑'}
              </div>
              <div className="text-sm text-slate-400 mb-3">
                {profile?.targetMajor ?? '請先在顧問端建立學生目標'}
              </div>
            </div>

            <div className="glass-strong rounded-2xl p-6 border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <i className="fas fa-clock text-red-400" />
                </div>
                <span className="text-xs text-slate-500">即將到期</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {deadlines.filter((d) => !d.completed).length}
              </div>
              <div className="text-sm text-slate-400 mb-3">個待處理項目</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}


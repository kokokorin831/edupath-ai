import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

const DEMO_STUDENT_ID = process.env.DEMO_STUDENT_ID ?? ''

async function getData() {
  if (!DEMO_STUDENT_ID) {
    return { pathwayPlan: null as any, deadlines: [] as any[] }
  }

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

  return { pathwayPlan, deadlines }
}

export default async function StudentPathwayPage() {
  const { pathwayPlan, deadlines } = await getData()
  const plan = (pathwayPlan?.planJson as any) ?? { options: [] }
  const options: any[] = Array.isArray(plan.options) ? plan.options : []

  return (
    <main className="pt-20 pb-10 px-4 max-w-7xl mx-auto space-y-6">
      <div className="glass-panel rounded-2xl p-6 border border-slate-700">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <i className="fas fa-code-branch text-indigo-400" />
          多路徑並行管理 (JUPAS + 海外)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {options.slice(0, 3).map((opt, idx) => {
            const prob = Math.round((Number(opt.admissionProbability ?? 0) || 0) * 100)
            const typeLabel =
              opt.type === 'PRIMARY'
                ? 'PRIMARY'
                : opt.type === 'PARALLEL'
                  ? 'PARALLEL'
                  : 'SAFETY'

            const colorClass =
              idx === 0
                ? 'from-blue-500/20 text-blue-400 border-blue-500/50'
                : idx === 1
                  ? 'from-purple-500/20 text-purple-400 border-purple-500/50'
                  : 'from-yellow-500/20 text-yellow-400 border-yellow-500/50'

            return (
              <div
                key={opt.id ?? idx}
                className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 hover:border-slate-500/60 transition"
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`px-3 py-1 bg-gradient-to-r ${colorClass} text-xs font-bold rounded-full`}
                  >
                    {typeLabel}
                  </span>
                  <span className="text-xs text-slate-400">{opt.system}</span>
                </div>
                <h4 className="font-bold text-white mb-1">
                  {opt.university ?? '目標大學'}
                </h4>
                <p className="text-sm text-slate-400 mb-3">
                  {opt.program ?? '課程名稱'}
                </p>
                <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full"
                    style={{ width: `${prob}%` }}
                  />
                </div>
                <p className="text-xs text-center text-green-400 font-medium">
                  錄取概率: {prob}%
                </p>
              </div>
            )
          })}
        </div>
      </div>

      <div className="glass-panel rounded-2xl p-6 border border-slate-700">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <i className="fas fa-calendar-alt text-red-400" />
          智能 Deadline 監控
        </h3>

        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-700" />

          <div className="space-y-4">
            {deadlines.map((d) => (
              <div key={d.id} className="relative pl-10">
                <div className="absolute left-2 w-4 h-4 bg-blue-500 rounded-full border-4 border-slate-800" />
                <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-white">{d.label}</p>
                      <p className="text-xs text-slate-400">
                        {new Date(d.date).toLocaleDateString('zh-HK')}
                      </p>
                    </div>
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">
                      {d.source}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {deadlines.length === 0 && (
              <p className="text-xs text-slate-500">
                暫時沒有記錄 Deadline。當 Master Agent 生成升學路徑後，這裡會自動顯示相關截止日期。
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}


import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

async function getData() {
  const profiles = await prisma.studentProfile.findMany({
    include: {
      user: true,
      pathwayPlans: {
        orderBy: { generatedAt: 'desc' },
        take: 1,
      },
    },
  })

  const students = profiles.map((p) => {
    const latestPlan = p.pathwayPlans[0]
    let primaryProbability: number | null = null
    let primaryTarget = ''

    if (latestPlan) {
      try {
        const plan = latestPlan.planJson as any
        const primary = Array.isArray(plan.options)
          ? plan.options.find(
              (o: any) => o.type === 'PRIMARY' || o.type === 'primary',
            )
          : null

        if (primary) {
          primaryProbability = Number(primary.admissionProbability ?? 0) || 0
          primaryTarget = `${primary.university} ${primary.program}`
        }
      } catch {
        // ignore
      }
    }

    const progressPercent = primaryProbability
      ? Math.round(primaryProbability * 100)
      : 60

    const riskLevel =
      progressPercent >= 80 ? '低' : progressPercent >= 60 ? '中等' : '高'

    const aiSuggestion =
      progressPercent >= 80
        ? '表現良好，可專注於面試與文書細節。'
        : progressPercent >= 60
          ? '建議增加一至兩個保底選項，並加強較弱科目。'
          : '需要與學生及家長深入檢視整體選校策略。'

    return {
      id: p.userId,
      name: p.user.name,
      school: p.school,
      target: primaryTarget || p.targetMajor,
      estimatedScore: p.estimatedScore,
      progressPercent,
      riskLevel,
      aiSuggestion,
    }
  })

  return { students }
}

export default async function AdvisorDashboardPage() {
  const { students } = await getData()

  return (
    <main className="pt-20 pb-10 px-4 max-w-7xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-strong rounded-2xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">管理學生</span>
            <i className="fas fa-users text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-white">{students.length}</div>
        </div>
        <div className="glass-strong rounded-2xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">待處理警示 (中高風險)</span>
            <i className="fas fa-exclamation-triangle text-red-400" />
          </div>
          <div className="text-3xl font-bold text-white">
            {students.filter((s) => s.riskLevel !== '低').length}
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl border border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
          <h3 className="text-lg font-bold">屆別表現監控 (Cohort Analytics)</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-400 uppercase bg-slate-800/50">
              <tr>
                <th className="px-6 py-4">學生</th>
                <th className="px-6 py-4">目標課程</th>
                <th className="px-6 py-4">DSE 預估</th>
                <th className="px-6 py-4">進度</th>
                <th className="px-6 py-4">AI 建議</th>
                <th className="px-6 py-4">風險評級</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {students.map((s) => (
                <tr key={s.id} className="hover:bg-slate-800/30 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold">
                        {s.name[0]}
                      </div>
                      <div>
                        <div className="font-medium text-white">{s.name}</div>
                        <div className="text-xs text-slate-500">{s.school}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{s.target}</td>
                  <td className="px-6 py-4 text-green-400">
                    {s.estimatedScore}
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-24 bg-slate-700 rounded-full h-1.5">
                      <div
                        className="bg-blue-500 h-1.5 rounded-full"
                        style={{ width: `${s.progressPercent}%` }}
                      />
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {s.progressPercent}%
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-300 max-w-[260px]">
                    {s.aiSuggestion}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded font-medium ${
                        s.riskLevel === '低'
                          ? 'bg-green-500/20 text-green-400'
                          : s.riskLevel === '中等'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {s.riskLevel}
                    </span>
                  </td>
                </tr>
              ))}
              {students.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-6 text-sm text-slate-500 text-center"
                  >
                    目前尚未有學生資料，請先在資料庫建立 `StudentProfile` 與 `User`。
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}


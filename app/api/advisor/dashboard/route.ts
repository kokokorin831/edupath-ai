import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const profiles = await prisma.studentProfile.findMany({
      include: {
        user: true,
        pathwayPlans: {
          orderBy: {
            generatedAt: 'desc',
          },
          take: 1,
        },
      },
    })

    const items = profiles.map((p) => {
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
            primaryProbability = Number(primary.admissionProbability ?? 0)
            primaryTarget = `${primary.university} ${primary.program}`
          }
        } catch {
          // ignore JSON parse errors
        }
      }

      const predictedVsRequired = primaryProbability
        ? `${p.estimatedScore}/${Math.max(
            p.estimatedScore - 1,
            p.estimatedScore - 3,
          )}`
        : `${p.estimatedScore}`

      const progressPercent = primaryProbability
        ? Math.round(primaryProbability * 100)
        : 60

      const riskLevel =
        progressPercent >= 80 ? '低' : progressPercent >= 60 ? '中等' : '高'

      const aiSuggestion =
        progressPercent >= 80
          ? '專注準備面試與個人陳述細節。'
          : progressPercent >= 60
            ? '建議增加保底選項並加強弱科。'
            : '需要檢視整體選校策略並增加更多安全學校。'

      return {
        studentId: p.userId,
        name: p.user.name,
        school: p.school,
        target: primaryTarget || p.targetMajor,
        examSystem: p.examSystem,
        estimatedScore: p.estimatedScore,
        predictedVsRequired,
        progressPercent,
        riskLevel,
        aiSuggestion,
      }
    })

    return NextResponse.json({ students: items })
  } catch (error) {
    console.error('Error in GET /api/advisor/dashboard:', error)
    return NextResponse.json(
      { error: 'Failed to load advisor dashboard' },
      { status: 500 },
    )
  }
}


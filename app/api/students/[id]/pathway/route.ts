import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

type Params = {
  params: {
    id: string
  }
}

export async function GET(_req: Request, { params }: Params) {
  const { id } = params

  try {
    const plan = await prisma.pathwayPlan.findFirst({
      where: {
        student: {
          userId: id,
        },
      },
      orderBy: {
        generatedAt: 'desc',
      },
    })

    if (!plan) {
      return NextResponse.json(
        { error: 'Pathway plan not found' },
        { status: 404 },
      )
    }

    return NextResponse.json({
      id: plan.id,
      studentId: id,
      plan: plan.planJson,
      generatedAt: plan.generatedAt,
    })
  } catch (error) {
    console.error('Error in GET /api/students/[id]/pathway:', error)
    return NextResponse.json(
      { error: 'Failed to load pathway plan' },
      { status: 500 },
    )
  }
}


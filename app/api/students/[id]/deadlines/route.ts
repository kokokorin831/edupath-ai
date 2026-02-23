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
    const deadlines = await prisma.deadlineItem.findMany({
      where: {
        student: {
          userId: id,
        },
      },
      orderBy: {
        date: 'asc',
      },
    })

    return NextResponse.json(
      deadlines.map((d) => ({
        id: d.id,
        studentId: id,
        label: d.label,
        date: d.date,
        source: d.source,
        urgency: d.urgency,
        completed: d.completed,
      })),
    )
  } catch (error) {
    console.error('Error in GET /api/students/[id]/deadlines:', error)
    return NextResponse.json(
      { error: 'Failed to load deadlines' },
      { status: 500 },
    )
  }
}

export async function PATCH(req: Request, { params }: Params) {
  const { id } = params

  try {
    const body = (await req.json()) as {
      deadlineId?: string
      completed?: boolean
    }

    if (!body.deadlineId || typeof body.completed !== 'boolean') {
      return NextResponse.json(
        { error: 'deadlineId 與 completed 為必填欄位' },
        { status: 400 },
      )
    }

    const updated = await prisma.deadlineItem.updateMany({
      where: {
        id: body.deadlineId,
        student: {
          userId: id,
        },
      },
      data: {
        completed: body.completed,
      },
    })

    if (updated.count === 0) {
      return NextResponse.json(
        { error: 'Deadline not found' },
        { status: 404 },
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in PATCH /api/students/[id]/deadlines:', error)
    return NextResponse.json(
      { error: 'Failed to update deadline' },
      { status: 500 },
    )
  }
}


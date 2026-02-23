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
    const profile = await prisma.studentProfile.findFirst({
      where: { userId: id },
      include: {
        user: true,
      },
    })

    if (!profile || !profile.user) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }

    let targetUniversities: string[] = []
    try {
      targetUniversities = JSON.parse(profile.targetUniversities)
    } catch {
      targetUniversities = [profile.targetUniversities]
    }

    const data = {
      id: profile.userId,
      name: profile.user.name,
      email: profile.user.email,
      school: profile.school,
      graduationYear: profile.graduationYear,
      examSystem: profile.examSystem,
      targetMajor: profile.targetMajor,
      targetUniversities,
      estimatedScore: profile.estimatedScore,
      metrics: profile.metrics,
      digitalTwinId: profile.digitalTwinId,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in GET /api/students/[id]/profile:', error)
    return NextResponse.json(
      { error: 'Failed to load student profile' },
      { status: 500 },
    )
  }
}


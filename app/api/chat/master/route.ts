import { NextResponse } from 'next/server'
import { runMasterAgentPipeline } from '@/lib/agents/masterAgent'

export const dynamic = 'force-dynamic'

type PostBody = {
  studentId: string
  question: string
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<PostBody>

    if (!body.studentId || !body.question) {
      return NextResponse.json(
        { error: 'studentId 與 question 為必填欄位' },
        { status: 400 },
      )
    }

    const result = await runMasterAgentPipeline({
      studentId: body.studentId,
      question: body.question,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error in /api/chat/master:', error)
    return NextResponse.json(
      { error: 'Master agent 發生錯誤' },
      { status: 500 },
    )
  }
}


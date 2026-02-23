import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const { email } = (await req.json()) as { email?: string }

    if (!email) {
      return NextResponse.json(
        { error: 'Email 為必填欄位' },
        { status: 400 },
      )
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, role: true, email: true, name: true },
    })

    if (!user) {
      return NextResponse.json(
        { error: '找不到此 Email 對應的使用者（Demo 環境請先建立 User）' },
        { status: 404 },
      )
    }

    const session = {
      userId: user.id,
      role: user.role,
      email: user.email,
      name: user.name,
    }

    cookies().set('edupath_session', JSON.stringify(session), {
      httpOnly: false,
      sameSite: 'lax',
      path: '/',
    })

    return NextResponse.json({ role: user.role })
  } catch (error) {
    console.error('Error in POST /api/auth/login:', error)
    return NextResponse.json(
      { error: '登入時發生錯誤' },
      { status: 500 },
    )
  }
}


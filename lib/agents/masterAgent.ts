import { prisma } from '../db'
import { callKimiChat } from '../kimiClient'
import type {
  DigitalTwinSummary,
  MasterAgentLogEntry,
  MasterAgentOutput,
} from './types'
import { runAcademicAgent } from './academicAgent'
import { runPathwayAgent } from './pathwayAgent'
import { runEssayAgent } from './essayAgent'
import { runDeadlineAgent } from './deadlineAgent'
import { runRagAgent } from './ragAgent'

export type MasterAgentInput = {
  studentId: string
  question: string
}

async function buildDigitalTwin(
  studentId: string,
): Promise<DigitalTwinSummary | null> {
  const profile = await prisma.studentProfile.findFirst({
    where: { userId: studentId },
    include: {
      user: true,
    },
  })

  if (!profile || !profile.user) return null

  const metrics =
    (profile.metrics as DigitalTwinSummary['metrics']) ??
    undefined

  const universities: string[] = (() => {
    try {
      return JSON.parse(profile.targetUniversities)
    } catch {
      return [profile.targetUniversities]
    }
  })()

  return {
    studentId,
    name: profile.user.name,
    school: profile.school,
    graduationYear: profile.graduationYear,
    examSystem: profile.examSystem,
    targetMajor: profile.targetMajor,
    targetUniversities: universities,
    estimatedScore: profile.estimatedScore,
    metrics,
  }
}

export async function runMasterAgentPipeline(
  input: MasterAgentInput,
): Promise<MasterAgentOutput> {
  const logs: MasterAgentLogEntry[] = []
  const pushLog = (source: string, message: string) => {
    logs.push({
      timestamp: new Date().toISOString(),
      source,
      message,
    })
  }

  pushLog('Master', '載入學生 Digital Twin...')
  const twin = await buildDigitalTwin(input.studentId)

  if (!twin) {
    throw new Error('Student digital twin not found')
  }

  pushLog('Master', '並行啟動 Academic / Pathway / Essay / Deadline / RAG agents...')

  const [academic, pathway, essay, deadlines, rag] = await Promise.all([
    runAcademicAgent(twin),
    runPathwayAgent(twin),
    runEssayAgent(twin),
    runDeadlineAgent(twin),
    runRagAgent(twin),
  ])

  pushLog('Master', '彙總各個 sub-agent 結果並生成最終答覆...')

  const summaryPrompt = [
    '你是一個專業升學顧問 Master Agent，已經整合多個 sub-agent 的分析結果，請以繁體中文向學生解釋：',
    '',
    `學生提問：${input.question}`,
    '',
    'Digital Twin 摘要：',
    JSON.stringify(twin, null, 2),
    '',
    '學術分析 (academicAgent)：',
    JSON.stringify(academic, null, 2),
    '',
    '升學路徑 (pathwayAgent)：',
    JSON.stringify(pathway, null, 2),
    '',
    '個人陳述建議 (essayAgent)：',
    JSON.stringify(essay, null, 2),
    '',
    '重要截止日期 (deadlineAgent)：',
    JSON.stringify(deadlines, null, 2),
    '',
    '相似成功案例 (ragAgent)：',
    JSON.stringify(rag, null, 2),
    '',
    '輸出要求：',
    '- 使用親切但專業的語氣',
    '- 優先回答學生問題，然後解釋為何有這樣的錄取概率',
    '- 整合相似案例中的關鍵洞察',
    '- 最後給出 2-3 個明確下一步行動建議',
  ].join('\n')

  const chatRes = await callKimiChat({
    messages: [
      {
        role: 'system',
        content:
          '你是「EduPath AI」的 Master Agent，專門幫香港與海外醫科申請的學生規劃升學路徑。',
      },
      { role: 'user', content: summaryPrompt },
    ],
    temperature: 0.4,
  })

  const answerMarkdown = chatRes.choices[0]?.message.content ?? ''

  // TODO: 寫入對話紀錄到資料庫（Conversation / Message）

  return {
    answerMarkdown,
    academic,
    pathway,
    essay,
    deadlines,
    rag,
    logs,
  }
}


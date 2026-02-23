import { callKimiChat } from '../kimiClient'
import type { AcademicAnalysis, DigitalTwinSummary } from './types'

export async function runAcademicAgent(
  twin: DigitalTwinSummary,
): Promise<AcademicAnalysis> {
  const systemPrompt =
    '你是一個專門分析香港 DSE 與海外成績的升學顧問，請根據學生背景，估算主修醫科相關課程的錄取風險與建議。只輸出 JSON。'

  const userPrompt = [
    '請根據以下學生 Digital Twin，分析其申請港大醫科（HKU MBBS）的學術風險。',
    '',
    JSON.stringify(twin, null, 2),
    '',
    '請以 JSON 格式回答：',
    '{',
    '  "estimatedScore": number,',
    '  "requiredScore": number,',
    '  "admissionProbability": number, // 0-1 之間的小數',
    '  "riskFactors": string[],',
    '  "suggestions": string[]',
    '}',
  ].join('\n')

  const res = await callKimiChat({
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    temperature: 0.2,
  })

  const content = res.choices[0]?.message.content ?? '{}'

  try {
    const parsed = JSON.parse(content) as AcademicAnalysis
    return parsed
  } catch {
    return {
      estimatedScore: twin.estimatedScore,
      requiredScore: twin.estimatedScore - 1,
      admissionProbability: 0.75,
      riskFactors: ['解析 JSON 失敗，使用預設學術分析。'],
      suggestions: ['請在面試與個人陳述中額外強調你的領導力與服務經驗。'],
    }
  }
}


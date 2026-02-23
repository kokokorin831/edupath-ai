import { callKimiChat } from '../kimiClient'
import type { DigitalTwinSummary, RagResult } from './types'

const DEMO_CASES = [
  {
    id: 'lee-2024',
    name: '李同學',
    year: 2024,
    school: '優才書院',
    destination: '香港大學 MBBS',
    summary:
      '學生會會長，數理成績頂尖，長期參與救傷隊與社區服務，最終錄取港大醫科。',
    personalStatementInsight:
      '在 PS 中把學生會危機處理經驗與醫療決策能力連結，是關鍵亮點。',
  },
  {
    id: 'cheung-2023',
    name: '張同學',
    year: 2023,
    school: '聖保羅男女中學',
    destination: '中文大學 MBChB',
    summary:
      '參與多個科研計畫與學術比賽，兼具領導與研究能力，錄取中大醫科。',
    personalStatementInsight:
      '強調科研項目中的團隊合作與領導力平衡，讓招生官印象深刻。',
  },
]

export async function runRagAgent(
  twin: DigitalTwinSummary,
): Promise<RagResult> {
  const systemPrompt =
    '你是一個升學案例檢索引擎，會根據輸入的學生背景，在提供的案例列表中評估相似度並輸出結果。只輸出 JSON。'

  const userPrompt = [
    '學生 Digital Twin：',
    JSON.stringify(twin, null, 2),
    '',
    '候選案例列表：',
    JSON.stringify(DEMO_CASES, null, 2),
    '',
    '請分析哪些案例與該學生最相似，並以 JSON 格式輸出：',
    '{',
    '  "cases": [',
    '    {',
    '      "id": string,',
    '      "name": string,',
    '      "year": number,',
    '      "school": string,',
    '      "destination": string,',
    '      "similarity": number, // 0-1',
    '      "summary": string,',
    '      "personalStatementInsight": string',
    '    }',
    '  ]',
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
    const parsed = JSON.parse(content) as RagResult
    return parsed
  } catch {
    return {
      cases: DEMO_CASES.map((c, index) => ({
        ...c,
        similarity: index === 0 ? 0.92 : 0.87,
      })),
    }
  }
}


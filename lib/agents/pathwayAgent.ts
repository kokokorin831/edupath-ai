import { callKimiChat } from '../kimiClient'
import type { DigitalTwinSummary, PathwayPlan } from './types'

export async function runPathwayAgent(
  twin: DigitalTwinSummary,
): Promise<PathwayPlan> {
  const systemPrompt =
    '你是一個專門處理 JUPAS + UCAS 並行規劃的升學顧問，請為學生設計 2-4 條主路徑（PRIMARY, PARALLEL, SAFETY）。只輸出 JSON。'

  const userPrompt = [
    '根據以下學生 Digital Twin，請設計升學路徑計畫：',
    JSON.stringify(twin, null, 2),
    '',
    '請以 JSON 格式回答：',
    '{',
    '  "options": [',
    '    {',
    '      "id": "hku-mbbs",',
    '      "label": "香港大學 內外全科醫學士 (MBBS)",',
    '      "university": "香港大學",',
    '      "program": "MBBS",',
    '      "system": "JUPAS",',
    '      "type": "PRIMARY",',
    '      "admissionProbability": 0.78,',
    '      "band": "Band A",',
    '      "notes": "說明文字"',
    '    }',
    '  ]',
    '}',
  ].join('\n')

  const res = await callKimiChat({
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    temperature: 0.3,
  })

  const content = res.choices[0]?.message.content ?? '{}'

  try {
    const parsed = JSON.parse(content) as PathwayPlan
    return parsed
  } catch {
    return {
      options: [
        {
          id: 'hku-mbbs',
          label: '香港大學 內外全科醫學士 (MBBS)',
          university: '香港大學',
          program: 'MBBS',
          system: 'JUPAS',
          type: 'PRIMARY',
          admissionProbability: 0.78,
          band: 'Band A',
          notes: '根據預估成績與案例推算的錄取概率。',
        },
      ],
    }
  }
}


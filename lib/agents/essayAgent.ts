import { callKimiChat } from '../kimiClient'
import type { DigitalTwinSummary, EssayInsight } from './types'

export async function runEssayAgent(
  twin: DigitalTwinSummary,
): Promise<EssayInsight> {
  const systemPrompt =
    '你是一個專門幫香港與英國醫科申請寫個人陳述的顧問，請根據學生背景設計 PS 結構與關鍵主題。只輸出 JSON。'

  const userPrompt = [
    '請根據以下學生 Digital Twin，為醫科申請設計個人陳述策略：',
    JSON.stringify(twin, null, 2),
    '',
    '請以 JSON 格式回答：',
    '{',
    '  "openingStrategy": string,',
    '  "keyThemes": string[],',
    '  "concreteExamples": string[],',
    '  "closingStrategy": string',
    '}',
  ].join('\n')

  const res = await callKimiChat({
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    temperature: 0.5,
  })

  const content = res.choices[0]?.message.content ?? '{}'

  try {
    const parsed = JSON.parse(content) as EssayInsight
    return parsed
  } catch {
    return {
      openingStrategy:
        '以救傷隊急救經歷開場，描寫一次具體的緊急個案，帶出你對醫療專業的尊重與責任感。',
      keyThemes: ['領導力與團隊合作', '對公共衛生的關注', '長期服務承諾'],
      concreteExamples: [
        '學生會副會長處理校內危機的經驗',
        '科學研究項目中推動團隊合作的案例',
      ],
      closingStrategy:
        '總結你如何結合理科能力、領導經驗與服務熱誠，說明你在醫學訓練與未來職涯中的長期願景。',
    }
  }
}


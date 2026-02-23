export type KimiChatMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export type KimiChatRequest = {
  model?: string
  messages: KimiChatMessage[]
  temperature?: number
  max_tokens?: number
}

export type KimiChatChoice = {
  index: number
  message: KimiChatMessage
  finish_reason: string | null
}

export type KimiChatResponse = {
  id: string
  object: string
  created: number
  model: string
  choices: KimiChatChoice[]
}

const DEFAULT_MODEL = process.env.KIMI_MODEL ?? 'kimi-k2.5'

export async function callKimiChat(
  req: KimiChatRequest,
): Promise<KimiChatResponse> {
  const apiKey = process.env.KIMI_API_KEY
  const baseUrl = process.env.KIMI_API_BASE ?? 'https://kimi-k2.ai/api'

  if (!apiKey) {
    throw new Error('KIMI_API_KEY is not set')
  }

  const response = await fetch(`${baseUrl}/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: req.model ?? DEFAULT_MODEL,
      messages: req.messages,
      temperature: req.temperature ?? 0.3,
      max_tokens: req.max_tokens ?? 1024,
    }),
  })

  if (!response.ok) {
    const text = await response.text().catch(() => '')
    throw new Error(
      `Kimi API error: ${response.status} ${response.statusText} ${text}`,
    )
  }

  const data = (await response.json()) as KimiChatResponse

  if (!data.choices?.length) {
    throw new Error('Kimi API returned no choices')
  }

  return data
}


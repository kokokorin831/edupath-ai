import type { DeadlineItem, DigitalTwinSummary } from './types'

// 簡化版：先用規則與當前年份推算常見截止日期
export async function runDeadlineAgent(
  twin: DigitalTwinSummary,
): Promise<DeadlineItem[]> {
  const year = twin.graduationYear - 1

  const base: DeadlineItem[] = [
    {
      id: 'ucas-oxbridge',
      label: 'UCAS 牛津 / 劍橋 申請截止',
      date: `${year}-10-15`,
      system: 'UCAS',
      urgency: 'HIGH',
    },
    {
      id: 'jupas-main',
      label: 'JUPAS 選科截止',
      date: `${year}-12-15`,
      system: 'JUPAS',
      urgency: 'MEDIUM',
    },
    {
      id: 'hku-nonlocal',
      label: '港大非本地生申請截止',
      date: `${year}-12-31`,
      system: 'HKU',
      urgency: 'MEDIUM',
    },
  ]

  return base
}


export type DigitalTwinMetrics = {
  academicScore: number
  leadershipScore: number
  serviceScore: number
}

export type DigitalTwinSummary = {
  studentId: string
  name: string
  school: string
  graduationYear: number
  examSystem: string
  targetMajor: string
  targetUniversities: string[]
  estimatedScore: number
  metrics?: DigitalTwinMetrics
}

export type AcademicAnalysis = {
  estimatedScore: number
  requiredScore: number
  admissionProbability: number
  riskFactors: string[]
  suggestions: string[]
}

export type PathwayOption = {
  id: string
  label: string
  university: string
  program: string
  system: 'JUPAS' | 'UCAS' | 'Other'
  type: 'PRIMARY' | 'PARALLEL' | 'SAFETY'
  admissionProbability: number
  band?: string
  notes?: string
}

export type PathwayPlan = {
  options: PathwayOption[]
}

export type EssayInsight = {
  openingStrategy: string
  keyThemes: string[]
  concreteExamples: string[]
  closingStrategy: string
}

export type DeadlineItem = {
  id: string
  label: string
  date: string
  system: string
  urgency: 'LOW' | 'MEDIUM' | 'HIGH'
}

export type RagCase = {
  id: string
  name: string
  year: number
  school: string
  destination: string
  similarity: number
  summary: string
  personalStatementInsight: string
}

export type RagResult = {
  cases: RagCase[]
}

export type MasterAgentLogEntry = {
  timestamp: string
  source: string
  message: string
}

export type MasterAgentOutput = {
  answerMarkdown: string
  academic: AcademicAnalysis
  pathway: PathwayPlan
  essay: EssayInsight
  deadlines: DeadlineItem[]
  rag: RagResult
  logs: MasterAgentLogEntry[]
}


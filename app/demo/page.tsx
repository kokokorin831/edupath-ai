'use client'

import { useState } from 'react'
import { 
  GraduationCap, 
  Brain, 
  Network, 
  Search, 
  GitBranch,
  ChevronRight,
  User,
  UserCog,
  LayoutGrid,
  Database,
  Bot,
  Clock,
  FileText,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  ArrowRight
} from 'lucide-react'

const stepTitles = [
  '階段一：Digital Twin 創建',
  '階段二：Multi-Agent 協調',
  '階段三：RAG 智能檢索',
  '階段四：Pathway 生成與監控'
]

const stepDescs = [
  '將非結構化學生背景轉化為系統可理解的數據結構',
  'Master Agent 協調多個 Sub-agents 並行處理',
  '基於向量數據庫檢索相似成功案例並生成洞察',
  '整合分析結果生成個人化升學路徑與時間軸'
]

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [currentMode, setCurrentMode] = useState('demo')
  const [agentLogs, setAgentLogs] = useState([
    '[System] Multi-Agent System initialized...',
    '[Master] Loading Digital Twin #EDU-2025-0892...'
  ])

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const jumpToStep = (step: number) => {
    setCurrentStep(step)
  }

  const addLog = (message: string) => {
    setAgentLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`])
  }

  const progress = (currentStep / 3) * 100

  return (
    <main className="pt-20 pb-10 px-4 max-w-[1600px] mx-auto min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 glass z-50 border-b border-slate-800">
        <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight text-white">EduPath AI</h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest">Full System Demo</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 text-xs">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-slate-300">System Online</span>
            </div>
            
            <div className="flex bg-slate-800/50 rounded-lg p-1 border border-slate-700">
              <button 
                onClick={() => setCurrentMode('demo')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                  currentMode === 'demo' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                流程演示
              </button>
              <button 
                onClick={() => setCurrentMode('student')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                  currentMode === 'student' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <User className="w-4 h-4" />
                學生端
              </button>
              <button 
                onClick={() => setCurrentMode('advisor')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                  currentMode === 'advisor' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <UserCog className="w-4 h-4" />
                顧問端
              </button>
              <button 
                onClick={() => setCurrentMode('architecture')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                  currentMode === 'architecture' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                系統架構
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* DEMO MODE */}
      {currentMode === 'demo' && (
        <div className="space-y-6">
          {/* Progress Steps */}
          <div className="glass rounded-2xl p-6 border border-slate-700">
            <div className="flex justify-between items-center mb-8 relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-700 -z-10"></div>
              <div 
                className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-1000"
                style={{ width: `${progress}%` }}
              ></div>
              
              {[0, 1, 2, 3].map((step) => (
                <div 
                  key={step}
                  className="step-item flex flex-col items-center gap-2 cursor-pointer"
                  onClick={() => jumpToStep(step)}
                >
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-4 border-slate-800 shadow-lg transition-all ${
                      step <= currentStep 
                        ? 'bg-blue-600 text-white shadow-blue-500/20' 
                        : 'bg-slate-700 text-slate-400'
                    }`}
                  >
                    {step + 1}
                  </div>
                  <span className={`text-xs font-medium ${
                    step <= currentStep ? 'text-blue-400' : 'text-slate-500'
                  }`}>
                    {['Digital Twin', 'Multi-Agent', 'RAG Engine', 'Pathway Gen'][step]}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">{stepTitles[currentStep]}</h2>
                <p className="text-slate-400 text-sm">{stepDescs[currentStep]}</p>
              </div>
              <button 
                onClick={nextStep}
                disabled={currentStep >= 3}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20"
              >
                下一步 <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Stage Contents */}
          <div className="min-h-[600px]">
            {/* Stage 0: Digital Twin */}
            {currentStep === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-up">
                <div className="glass-strong rounded-2xl p-6 border border-slate-700">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Database className="text-blue-400 w-5 h-5" />
                    學生檔案輸入
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">姓名</label>
                        <input 
                          type="text" 
                          value="陳子軒" 
                          readOnly
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">學校</label>
                        <input 
                          type="text" 
                          value="優才書院" 
                          readOnly
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-400 mb-1">DSE 預估成績</label>
                      <div className="grid grid-cols-6 gap-2">
                        {[
                          { subject: '中文', grade: '5' },
                          { subject: '英文', grade: '5*' },
                          { subject: '數學', grade: '5**' },
                          { subject: '通識', grade: '5' },
                          { subject: '化學', grade: '5*' },
                          { subject: '生物', grade: '5' },
                        ].map((item, i) => (
                          <div key={i} className="bg-slate-800 rounded-lg p-2 text-center border border-slate-700">
                            <div className="text-[10px] text-slate-500">{item.subject}</div>
                            <div className="text-lg font-bold text-blue-400">{item.grade}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-strong rounded-2xl p-6 border border-slate-700 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
                  
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 relative z-10">
                    <Brain className="text-purple-400 w-5 h-5" />
                    Digital Twin 構建過程
                    <span className="ml-auto px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded animate-pulse">Processing</span>
                  </h3>

                  <div className="relative z-10 space-y-3">
                    {[
                      { title: '結構化數據提取', desc: '識別 6 科成績 + 8 項課外活動', status: 'done' },
                      { title: '特徵向量化', desc: '生成 512-dim 學生特徵向量', status: 'done' },
                      { title: '能力圖譜構建', desc: '學術 (92%) | 領導 (88%) | 社會服務 (85%)', status: 'processing' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          item.status === 'done' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'
                        }`}>
                          {item.status === 'done' ? <CheckCircle className="w-4 h-4" /> : <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-white">{item.title}</div>
                          <div className="text-xs text-slate-400">{item.desc}</div>
                        </div>
                      </div>
                    ))}

                    <div className="mt-6 p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                      <div className="text-xs text-slate-400 mb-2">Digital Twin ID</div>
                      <div className="font-mono text-sm text-blue-400 mb-3">#EDU-2025-0892-CZX</div>
                      
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2 bg-slate-800 rounded-lg">
                          <div className="text-lg font-bold text-white">43</div>
                          <div className="text-[10px] text-slate-400">DSE Points</div>
                        </div>
                        <div className="p-2 bg-slate-800 rounded-lg">
                          <div className="text-lg font-bold text-white">A+</div>
                          <div className="text-[10px] text-slate-400">Leadership</div>
                        </div>
                        <div className="p-2 bg-slate-800 rounded-lg">
                          <div className="text-lg font-bold text-white">Med</div>
                          <div className="text-[10px] text-slate-400">Interest</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Stage 1: Multi-Agent */}
            {currentStep === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-up">
                <div className="lg:col-span-2 glass-strong rounded-2xl p-6 border border-slate-700">
                  <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <Network className="text-indigo-400 w-5 h-5" />
                    Multi-Agent 協調網絡
                    <span className="ml-auto text-xs text-slate-400">10 Agents Serving 1 Student</span>
                  </h3>

                  <div className="relative h-[400px] bg-slate-900/50 rounded-xl overflow-hidden flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl shadow-indigo-500/30 mb-4">
                        <Brain className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-sm font-bold text-indigo-300">Master Agent</div>
                      <p className="text-xs text-slate-400 mt-2">協調所有 Sub-agents</p>
                    </div>
                  </div>
                </div>

                <div className="glass-strong rounded-2xl p-6 border border-slate-700 flex flex-col">
                  <h3 className="text-lg font-bold text-white mb-4">Agent 活動日誌</h3>
                  <div className="flex-1 overflow-y-auto space-y-2 font-mono text-xs bg-slate-900/50 rounded-lg p-4 border border-slate-700 max-h-[300px]">
                    {agentLogs.map((log, i) => (
                      <div key={i} className="text-slate-400">{log}</div>
                    ))}
                  </div>
                  
                  <div className="mt-4 p-4 bg-indigo-900/20 border border-indigo-500/30 rounded-lg">
                    <div className="text-sm font-medium text-indigo-300 mb-1">當前協調任務</div>
                    <div className="text-xs text-slate-300">Master Agent 正在協調各專業代理分析學生檔案...</div>
                  </div>
                </div>
              </div>
            )}

            {/* Stage 2: RAG Engine */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-slide-up">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Query Input */}
                  <div className="glass-strong rounded-2xl p-6 border border-slate-700">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Search className="text-cyan-400 w-5 h-5" />
                      RAG 檢索查詢
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                        <div className="text-xs text-slate-400 mb-2">自然語言查詢</div>
                        <div className="text-sm text-white">
                          「尋找與陳子軒背景相似（學生會領導 + 理科強 + 服務經驗），成功入讀港大醫科的案例」
                        </div>
                      </div>

                      <div className="text-xs text-slate-400">Embedding 生成中...</div>
                      <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 w-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  {/* Retrieval Results */}
                  <div className="lg:col-span-2 glass-strong rounded-2xl p-6 border border-slate-700">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Database className="text-purple-400 w-5 h-5" />
                      案例庫檢索結果
                      <span className="ml-auto text-xs text-slate-400">Top 3 Matches</span>
                    </h3>

                    <div className="space-y-3">
                      {[
                        { name: '李同學', year: 2024, school: '優才書院', dest: '港大 MBBS', sim: 92 },
                        { name: '張同學', year: 2023, school: '聖保羅男女', dest: '中大 MBChB', sim: 87 },
                        { name: '王同學', year: 2023, school: '拔萃男書院', dest: 'Imperial Medicine', sim: 76 },
                      ].map((student, i) => (
                        <div key={i} className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-green-500/50 transition-all cursor-pointer">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-bold">
                                {student.name[0]}
                              </div>
                              <div>
                                <div className="font-medium text-white">{student.name} ({student.year}屆)</div>
                                <div className="text-xs text-slate-400">{student.school} → {student.dest}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-green-400">{student.sim}%</div>
                              <div className="text-[10px] text-slate-500">相似度</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Stage 3: Pathway Generation */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-slide-up">
                {/* Summary */}
                <div className="glass rounded-2xl p-6 border border-slate-700 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">個人化升學路徑方案</h3>
                    <p className="text-sm text-slate-400">基於 Digital Twin 分析與 RAG 案例匹配生成</p>
                  </div>
                  <div className="flex gap-8 text-center">
                    <div>
                      <div className="text-3xl font-bold text-blue-400">3</div>
                      <div className="text-xs text-slate-500">路徑數量</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-green-400">78%</div>
                      <div className="text-xs text-slate-500">最高概率</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-purple-400">12</div>
                      <div className="text-xs text-slate-500">關鍵任務</div>
                    </div>
                  </div>
                </div>

                {/* Pathway Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { type: 'PRIMARY', typeColor: 'blue', uni: '香港大學', program: '內外全科醫學士 (MBBS)', required: '42分 (Best 6)', estimated: '43分', probability: 78 },
                    { type: 'PARALLEL', typeColor: 'purple', uni: 'Imperial College', program: 'Medical Biosciences', required: 'AAA (Chem, Bio, Math)', estimated: 'A*A*A', probability: 65 },
                    { type: 'SAFETY', typeColor: 'yellow', uni: '中文大學', program: '生物醫學 (Biomedical Sciences)', required: '35分', estimated: '43分', probability: 92 },
                  ].map((pathway, i) => (
                    <div key={i} className="glass-strong rounded-2xl p-6 border border-slate-700 hover:border-blue-500/30 transition-all hover:shadow-lg hover:shadow-blue-500/10">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-3 py-1 bg-${pathway.typeColor}-500/20 text-${pathway.typeColor}-400 text-xs font-bold rounded-full`}>{pathway.type}</span>
                        <GraduationCap className={`text-${pathway.typeColor}-400 w-6 h-6`} />
                      </div>
                      
                      <h4 className="text-lg font-bold text-white mb-1">{pathway.uni}</h4>
                      <p className="text-sm text-slate-400 mb-4">{pathway.program}</p>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">預計收生</span>
                          <span className="text-white font-medium">{pathway.required}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">您的預估</span>
                          <span className="text-green-400 font-bold">{pathway.estimated}</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div 
                            className={`bg-${pathway.typeColor}-500 h-2 rounded-full transition-all duration-1000`}
                            style={{ width: `${pathway.probability}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-500">錄取概率</span>
                          <span className={`text-lg font-bold text-${pathway.typeColor}-400`}>{pathway.probability}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* STUDENT MODE */}
      {currentMode === 'student' && (
        <div className="dashboard-grid">
          <aside className="glass-strong rounded-2xl p-4 border border-slate-700 h-fit sticky top-24">
            <div className="flex items-center gap-3 mb-6 p-3 bg-slate-800/50 rounded-xl border border-slate-700">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                陳
              </div>
              <div>
                <div className="font-bold text-white">陳子軒</div>
                <div className="text-xs text-slate-400">Digital Twin Active</div>
              </div>
            </div>

            <nav className="space-y-2">
              <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30">
                <LayoutGrid className="w-5 h-5" />
                <span className="font-medium">儀表板</span>
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800/50 rounded-xl transition">
                <Bot className="w-5 h-5" />
                <span>AI 顧問</span>
                <span className="ml-auto w-2 h-2 bg-green-500 rounded-full"></span>
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800/50 rounded-xl transition">
                <GitBranch className="w-5 h-5" />
                <span>升學路徑</span>
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800/50 rounded-xl transition">
                <FileText className="w-5 h-5" />
                <span>文件管理</span>
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800/50 rounded-xl transition">
                <Clock className="w-5 h-5" />
                <span>截止日期</span>
                <span className="ml-auto px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded">3</span>
              </a>
            </nav>

            <div className="mt-6 p-4 bg-indigo-900/20 rounded-xl border border-indigo-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Bot className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-medium text-indigo-300">Master Agent</span>
              </div>
              <p className="text-xs text-slate-400 mb-3">需要協助嗎？我隨時為您服務。</p>
              <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs rounded-lg transition">
                開始對話
              </button>
            </div>
          </aside>

          <div className="space-y-6">
            <div className="glass rounded-2xl p-6 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-2">歡迎回來，陳子軒</h2>
              <p className="text-slate-400">您的升學規劃進度：<span className="text-blue-400 font-bold">65%</span> (較上週提升 12%)</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-strong rounded-2xl p-6 border border-slate-700 hover-lift">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-xs text-slate-500">主要目標</span>
                </div>
                <div className="text-lg font-bold text-white mb-1">香港大學</div>
                <div className="text-sm text-slate-400 mb-3">內外全科醫學士</div>
                <div className="w-full bg-slate-700 rounded-full h-1.5 mb-2">
                  <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '78%' }}></div>
                </div>
                <div className="text-xs text-blue-400">錄取概率 78%</div>
              </div>

              <div className="glass-strong rounded-2xl p-6 border border-slate-700 hover-lift">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-red-400" />
                  </div>
                  <span className="text-xs text-slate-500">即將到期</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">3</div>
                <div className="text-sm text-slate-400 mb-3">個待處理項目</div>
                <div className="text-xs text-red-400 font-medium">UCAS 截止剩餘 12 天</div>
              </div>

              <div className="glass-strong rounded-2xl p-6 border border-slate-700 hover-lift">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <span className="text-xs text-slate-500">本週完成</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">5</div>
                <div className="text-sm text-slate-400 mb-3">個任務已達成</div>
                <div className="text-xs text-green-400 font-medium">表現優秀！</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADVISOR MODE */}
      {currentMode === 'advisor' && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="glass-strong rounded-2xl p-6 border border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">管理學生</span>
                <User className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-white">24</div>
              <div className="text-xs text-green-400 mt-1">+3 本月新增</div>
            </div>
            
            <div className="glass-strong rounded-2xl p-6 border border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">待處理警示</span>
                <AlertCircle className="w-5 h-5 text-red-400" />
              </div>
              <div className="text-3xl font-bold text-white">5</div>
              <div className="text-xs text-red-400 mt-1">需立即關注</div>
            </div>
            
            <div className="glass-strong rounded-2xl p-6 border border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">本週會議</span>
                <Clock className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-white">12</div>
              <div className="text-xs text-purple-400 mt-1">AI 已準備議程</div>
            </div>
            
            <div className="glass-strong rounded-2xl p-6 border border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">系統節省時間</span>
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
              <div className="text-3xl font-bold text-white">86h</div>
              <div className="text-xs text-slate-400 mt-1">本月累計</div>
            </div>
          </div>

          {/* Student Table */}
          <div className="glass rounded-2xl border border-slate-700 overflow-hidden">
            <div className="p-6 border-b border-slate-700 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">屆別表現監控 (Cohort Analytics)</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-slate-800 rounded-lg text-xs text-slate-300 hover:text-white transition">
                  篩選
                </button>
                <button className="px-3 py-1.5 bg-blue-600 rounded-lg text-xs text-white hover:bg-blue-700 transition">
                  導出報告
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-400 uppercase bg-slate-800/50">
                  <tr>
                    <th className="px-6 py-4">學生</th>
                    <th className="px-6 py-4">目標課程</th>
                    <th className="px-6 py-4">DSE 預估</th>
                    <th className="px-6 py-4">進度</th>
                    <th className="px-6 py-4">AI 建議</th>
                    <th className="px-6 py-4">風險評級</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr className="hover:bg-slate-800/30 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold">陳</div>
                        <div>
                          <div className="font-medium text-white">陳子軒</div>
                          <div className="text-xs text-slate-500">優才書院</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-300">HKU MBBS</td>
                    <td className="px-6 py-4 text-green-400">43/42</td>
                    <td className="px-6 py-4">
                      <div className="w-24 bg-slate-700 rounded-full h-1.5">
                        <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">85%</div>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-300 max-w-[200px]">需加強面試準備，建議安排模擬 MMI</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded font-medium">中等</span>
                    </td>
                  </tr>
                  
                  <tr className="hover:bg-slate-800/30 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-xs font-bold">林</div>
                        <div>
                          <div className="font-medium text-white">林思敏</div>
                          <div className="text-xs text-slate-500">聖保羅男女</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-300">CUHK Law</td>
                    <td className="px-6 py-4 text-yellow-400">28/32</td>
                    <td className="px-6 py-4">
                      <div className="w-24 bg-slate-700 rounded-full h-1.5">
                        <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">65%</div>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-300 max-w-[200px]">成績低於要求，建議增加保底選項</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded font-medium">高風險</span>
                    </td>
                  </tr>
                  
                  <tr className="hover:bg-slate-800/30 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-xs font-bold">張</div>
                        <div>
                          <div className="font-medium text-white">張懿天</div>
                          <div className="text-xs text-slate-500">拔萃男書院</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-300">UK Engineering</td>
                    <td className="px-6 py-4 text-green-400">Predicted A*AA</td>
                    <td className="px-6 py-4">
                      <div className="w-24 bg-slate-700 rounded-full h-1.5">
                        <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">90%</div>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-300 max-w-[200px]">PS 第三段需修改，已標註具體建議</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded font-medium">低風險</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ARCHITECTURE MODE */}
      {currentMode === 'architecture' && (
        <div className="space-y-6">
          <div className="glass rounded-2xl p-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-2">系統技術架構</h2>
            <p className="text-slate-400">Multi-Agent System with RAG (Retrieval-Augmented Generation)</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Data Layer */}
            <div className="glass-strong rounded-2xl p-6 border border-slate-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center">
                  <Database className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Data Layer</h3>
                  <p className="text-xs text-slate-400">數據存儲與向量數據庫</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="flex items-center gap-2 mb-1">
                    <User className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium text-white">Student Profiles</span>
                  </div>
                  <div className="text-xs text-slate-500">PostgreSQL + 結構化數據</div>
                </div>
                
                <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-medium text-white">Document Store</span>
                  </div>
                  <div className="text-xs text-slate-500">S3 / MinIO - PS, 證書, 成績單</div>
                </div>
                
                <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="flex items-center gap-2 mb-1">
                    <Search className="w-4 h-4 text-purple-400" />
                    <span className="text-sm font-medium text-white">Vector DB (Pinecone)</span>
                  </div>
                  <div className="text-xs text-slate-500">成功案例 Embedding 存儲</div>
                </div>
              </div>
            </div>

            {/* Agent Layer */}
            <div className="glass-strong rounded-2xl p-6 border border-slate-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-indigo-900/50 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Agent Layer</h3>
                  <p className="text-xs text-slate-400">多智能體協調系統</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="p-3 bg-indigo-900/20 border border-indigo-500/30 rounded-lg">
                  <div className="text-sm font-medium text-indigo-300 mb-2">Master Agent (Orchestrator)</div>
                  <div className="text-xs text-slate-400">基於 Kimi API (kimi-k2.5)</div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {['Academic Agent', 'Pathway Agent', 'Essay Agent', 'Deadline Agent', 'Interview Agent', 'RAG Retriever'].map((agent, i) => (
                    <div key={i} className="p-2 bg-slate-800 rounded text-center text-slate-300">{agent}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Interface Layer */}
            <div className="glass-strong rounded-2xl p-6 border border-slate-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-blue-900/50 flex items-center justify-center">
                  <LayoutGrid className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Interface Layer</h3>
                  <p className="text-xs text-slate-400">雙端用戶界面</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-white">Student Portal</span>
                    <User className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-xs text-slate-500">Next.js + Tailwind CSS</div>
                </div>
                
                <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-white">Advisor Dashboard</span>
                    <UserCog className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-xs text-slate-500">React + Recharts Analytics</div>
                </div>
                
                <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-white">API Gateway</span>
                    <Network className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="text-xs text-slate-500">Next.js Route Handlers</div>
                </div>
              </div>
            </div>
          </div>

          {/* Workflow Diagram */}
          <div className="glass rounded-2xl p-6 border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-6">數據流工作流程</h3>
            
            <div className="relative">
              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-900/30 border border-blue-500/30 flex items-center justify-center mb-2">
                    <User className="w-8 h-8 text-blue-400" />
                  </div>
                  <div className="text-xs text-slate-400">學生輸入</div>
                </div>
                
                <ArrowRight className="w-6 h-6 text-slate-600" />
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-900/30 border border-indigo-500/30 flex items-center justify-center mb-2">
                    <Brain className="w-8 h-8 text-indigo-400" />
                  </div>
                  <div className="text-xs text-slate-400">Master Agent</div>
                </div>
                
                <ArrowRight className="w-6 h-6 text-slate-600" />
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-900/30 border border-purple-500/30 flex items-center justify-center mb-2">
                    <Network className="w-8 h-8 text-purple-400" />
                  </div>
                  <div className="text-xs text-slate-400">Sub-agents</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

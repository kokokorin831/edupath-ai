# EduPath AI - Multi-Agent 升學諮詢平台

基於 Kimi API 的智能升學規劃系統，使用 Multi-Agent 架構為學生提供個人化的升學建議。

## ✨ 核心功能

### 🎯 Multi-Agent 系統
- **Master Agent**: 協調所有子代理的中央智能體
- **Academic Agent**: 分析學術成績與選科策略
- **Pathway Agent**: 規劃 JUPAS + 海外升學路徑
- **Essay Agent**: 優化個人陳述與申請文章
- **Deadline Agent**: 監控重要截止日期
- **RAG Agent**: 檢索相似成功案例

### 🧠 Digital Twin
將學生背景轉化為結構化數據，建立虛擬學生模型進行精準分析。

### 🔍 RAG 檢索系統
基於向量相似度檢索歷史成功案例，提供數據驅動的決策建議。

### 📊 雙端界面
- **學生端**: 個人儀表板、AI 對話、路徑規劃
- **顧問端**: 群體監控、AI 決策建議、任務管理

## 🚀 快速開始

### 安裝

```bash
cd app/edupath-next
npm install
```

### 環境設置

```bash
# 複製環境變數模板
cp .env .env.local

# 編輯 .env.local，填入你的配置
```

### 數據庫設置

```bash
# 生成 Prisma Client
npm run db:generate

# 執行遷移
npm run db:migrate

# 填充種子資料
npm run db:seed
```

### 啟動開發伺服器

```bash
npm run dev
```

訪問 [http://localhost:3000](http://localhost:3000)

## 📁 專案結構

```
app/edupath-next/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── chat/master/          # Master Agent API
│   │   ├── students/[id]/        # 學生相關 API
│   │   ├── advisor/dashboard/    # 顧問儀表板 API
│   │   └── auth/login/           # 認證 API
│   ├── demo/                     # Demo 模式頁面
│   ├── student/                  # 學生端頁面
│   ├── advisor/                  # 顧問端頁面
│   ├── login/                    # 登入頁面
│   ├── globals.css               # 全局樣式
│   ├── layout.tsx                # 根佈局
│   └── page.tsx                  # 首頁
├── lib/                          # 工具庫
│   ├── agents/                   # Agent 系統
│   │   ├── masterAgent.ts        # Master Agent
│   │   ├── academicAgent.ts      # Academic Agent
│   │   ├── pathwayAgent.ts       # Pathway Agent
│   │   ├── essayAgent.ts         # Essay Agent
│   │   ├── deadlineAgent.ts      # Deadline Agent
│   │   ├── ragAgent.ts           # RAG Agent
│   │   └── types.ts              # 類型定義
│   ├── db.ts                     # Prisma Client
│   └── kimiClient.ts             # Kimi API 客戶端
├── prisma/
│   ├── schema.prisma             # 數據庫模型
│   └── seed.ts                   # 種子資料
└── DEPLOY.md                     # 部署指南
```

## 🔧 技術棧

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL + Prisma ORM
- **AI**: Kimi API (kimi-k2.5)
- **Icons**: Lucide React

## 🌐 部署

支援一鍵部署到 Vercel：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/edupath-ai)

詳細部署說明請參閱 [DEPLOY.md](./DEPLOY.md)。

## 📝 環境變數

| 變數名稱 | 說明 | 必需 |
|---------|------|-----|
| `DATABASE_URL` | PostgreSQL 連線字串 | ✅ |
| `KIMI_API_KEY` | Kimi API Key | ✅ |
| `KIMI_API_BASE` | Kimi API 基礎 URL | ✅ |
| `KIMI_MODEL` | 使用的模型 | ✅ |
| `DEMO_STUDENT_ID` | Demo 學生 ID | ✅ |
| `NEXT_PUBLIC_DEMO_STUDENT_ID` | 公開 Demo 學生 ID | ✅ |

## 🎭 Demo 帳號

| 角色 | 電子郵件 |
|-----|---------|
| 學生 | `student@demo.com` |
| 顧問 | `advisor@demo.com` |

## 📸 功能預覽

### Demo 模式 - 四階段流程演示
1. **Digital Twin 創建**: 將學生背景結構化
2. **Multi-Agent 協調**: 多個專業代理並行分析
3. **RAG 智能檢索**: 檢索相似成功案例
4. **Pathway 生成**: 生成個人化升學路徑

### 學生端功能
- Digital Twin 檔案卡片
- Master Agent AI 對話
- 多路徑並行管理
- 智能 Deadline 監控

### 顧問端功能
- 屆別表現監控 (Cohort Analytics)
- AI 決策建議中心
- 智能任務清單
- 風險評級系統

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📄 授權

MIT License

---

Made with ❤️ for students pursuing their dreams.
# edupath-ai

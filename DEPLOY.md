# EduPath AI - 部署指南

## 專案簡介

EduPath AI 是一個基於 Multi-Agent 架構的升學諮詢平台，使用 Kimi API 提供智能升學規劃服務。

## 技術棧

- **前端**: Next.js 14 + TypeScript + Tailwind CSS
- **後端**: Next.js Route Handlers + Kimi API
- **數據庫**: PostgreSQL + Prisma ORM
- **部署**: Vercel (推薦)

## 本地開發

### 1. 安裝依賴

```bash
cd app/edupath-next
npm install
```

### 2. 設置環境變數

複製 `.env` 文件並填寫必要的環境變數：

```bash
cp .env .env.local
```

編輯 `.env.local`：

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/edupath?schema=public"

# Kimi API Configuration
KIMI_API_KEY="your-kimi-api-key-here"
KIMI_API_BASE="https://kimi-k2.ai/api"
KIMI_MODEL="kimi-k2.5"

# Demo Configuration
DEMO_STUDENT_ID="demo-student-001"
NEXT_PUBLIC_DEMO_STUDENT_ID="demo-student-001"
```

### 3. 設置數據庫

```bash
# 生成 Prisma Client
npm run db:generate

# 執行資料庫遷移
npm run db:migrate

# 填充種子資料
npm run db:seed
```

### 4. 啟動開發伺服器

```bash
npm run dev
```

訪問 http://localhost:3000

## 部署到 Vercel

### 1. 準備工作

- 在 [Vercel](https://vercel.com) 創建帳號
- 在 [Supabase](https://supabase.com) 或 [Neon](https://neon.tech) 創建 PostgreSQL 數據庫
- 確保你有 Kimi API Key

### 2. 環境變數設定

在 Vercel Dashboard 的 Project Settings > Environment Variables 中添加：

| 變數名稱 | 值 | 說明 |
|---------|-----|------|
| `DATABASE_URL` | `postgresql://...` | PostgreSQL 連線字串 |
| `KIMI_API_KEY` | `your-api-key` | Kimi API Key |
| `KIMI_API_BASE` | `https://kimi-k2.ai/api` | Kimi API 基礎 URL |
| `KIMI_MODEL` | `kimi-k2.5` | 使用的模型 |
| `DEMO_STUDENT_ID` | `demo-student-001` | Demo 學生 ID |
| `NEXT_PUBLIC_DEMO_STUDENT_ID` | `demo-student-001` | 公開 Demo 學生 ID |

### 3. 部署步驟

#### 方法一：使用 Vercel CLI

```bash
# 安裝 Vercel CLI
npm i -g vercel

# 登入
vercel login

# 部署
vercel --prod
```

#### 方法二：Git 集成

1. 將代碼推送到 GitHub
2. 在 Vercel Dashboard 中 Import Project
3. 選擇你的 GitHub Repository
4. 配置 Build Settings：
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. 添加環境變數
6. 點擊 Deploy

### 4. 部署後設置

部署完成後，執行資料庫遷移：

```bash
# 使用 Vercel CLI 執行遷移
vercel env pull .env.production.local
npx prisma migrate deploy
npx prisma db seed
```

或在本地執行（使用生產環境數據庫）：

```bash
DATABASE_URL="your-production-db-url" npx prisma migrate deploy
DATABASE_URL="your-production-db-url" npx prisma db seed
```

## 系統架構

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend Layer                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Student      │  │ Advisor      │  │ Demo         │      │
│  │ Dashboard    │  │ Dashboard    │  │ Mode         │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      API Routes Layer                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ /api/chat/   │  │ /api/students│  │ /api/advisor │      │
│  │ master       │  │ /[id]/*      │  │ /dashboard   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Agent Layer (Backend)                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                  Master Agent                         │  │
│  │  (Orchestrator - 協調所有 Sub-agents)                │  │
│  └──────────────────────────────────────────────────────┘  │
│                              │                               │
│      ┌──────────┬──────────┼──────────┬──────────┐         │
│      ▼          ▼          ▼          ▼          ▼         │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐   │
│  │Academic│ │Pathway │ │ Essay  │ │Deadline│ │  RAG   │   │
│  │ Agent  │ │ Agent  │ │ Agent  │ │ Agent  │ │ Agent  │   │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     External Services                        │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │  Kimi API        │  │  PostgreSQL      │                │
│  │  (LLM Provider)  │  │  (Database)      │                │
│  └──────────────────┘  └──────────────────┘                │
└─────────────────────────────────────────────────────────────┘
```

## 主要功能

### 學生端
- Digital Twin 個人檔案
- Master Agent AI 對話
- 升學路徑規劃 (JUPAS + UCAS)
- 截止日期監控
- RAG 案例檢索

### 顧問端
- 學生群體監控 (Cohort Analytics)
- AI 決策建議
- 任務管理
- 風險評估

### Demo 模式
- 4 階段流程演示
- Digital Twin 創建
- Multi-Agent 協調展示
- RAG 檢索展示
- Pathway 生成展示
- 系統架構圖

## Demo 帳號

部署完成後，可以使用以下帳號登入：

| 角色 | 電子郵件 | 說明 |
|-----|---------|------|
| 學生 | `student@demo.com` | 體驗學生端功能 |
| 顧問 | `advisor@demo.com` | 體驗顧問端功能 |

無需密碼，直接輸入電子郵件即可登入（Demo 模式）。

## 常見問題

### Q: Kimi API Key 如何獲取？
A: 訪問 [Kimi 平台](https://kimi-k2.ai) 註冊帳號並獲取 API Key。

### Q: 如何添加更多成功案例到 RAG？
A: 修改 `lib/agents/ragAgent.ts` 中的 `DEMO_CASES` 陣列，添加更多案例。

### Q: 如何修改學生的 Digital Twin 數據？
A: 在數據庫中更新 `StudentProfile` 表，或直接修改 `prisma/seed.ts` 後重新執行 `npm run db:seed`。

### Q: 部署後頁面顯示 500 錯誤？
A: 檢查：
1. 環境變數是否正確設置
2. 數據庫連線是否正常
3. 執行 `npx prisma migrate deploy` 確認資料庫結構正確

## 後續優化建議

1. **向量數據庫**: 將 RAG 層遷移到 Pinecone 或 pgvector
2. **文件上傳**: 支援成績單、個人陳述等文件上傳與解析
3. **即時通訊**: 使用 WebSocket 實現即時對話
4. **多語言支援**: 添加英文界面
5. **日曆集成**: 與 Google Calendar / Outlook 同步

## 技術支援

如有問題，請檢查：
1. Vercel Deployment Logs
2. Browser Console 錯誤訊息
3. Kimi API 使用配額

---

Made with ❤️ by EduPath AI Team

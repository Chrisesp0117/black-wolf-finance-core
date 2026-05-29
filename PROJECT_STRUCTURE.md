# 🎯 PROJECT STRUCTURE OVERVIEW

## Visual Tree

```
Black-Wolf-Finance-Core/
│
├── 📄 Documentation & Guides (START HERE!)
│   ├── ⭐ START_HERE.md                    ← BEGIN HERE
│   ├── 🚀 QUICK_START.md                   ← 9 steps (30 min)
│   ├── 📋 README.md                        ← Overview
│   ├── 📊 IMPLEMENTATION_SUMMARY.md        ← What we built
│   ├── ✅ IMPLEMENTATION_CHECKLIST.md      ← Technical details
│   ├── 📱 TELEGRAM_COMMANDS.md             ← How to use
│   └── 📞 COMPLETION_REPORT.md             ← Final summary
│
├── 🔧 Setup Guides
│   ├── 🗄️  SUPABASE_SETUP.md               ← Configure database
│   ├── 🤖 TELEGRAM_BOT_SETUP.md            ← Create bot
│   └── 🚀 SETUP.md                         ← Full guide
│
├── ⚙️ Configuration Files
│   ├── package.json                        ✅ Dependencies
│   ├── tsconfig.json                       ✅ TypeScript config
│   ├── next.config.js                      ✅ Next.js config
│   ├── tailwind.config.ts                  ✅ Styling config
│   ├── postcss.config.js                   ✅ PostCSS config
│   ├── .env.local                          ✅ Environment template
│   └── setup.sh                            ✅ Bash setup script
│
├── 💻 Source Code
│   ├── app/                                ← Next.js App Router
│   │   ├── api/
│   │   │   ├── telegram/
│   │   │   │   └── route.ts                🔥 Webhook handler
│   │   │   └── transactions/
│   │   │       └── [userId]/
│   │   │           └── route.ts            📊 API endpoint
│   │   ├── page.tsx                        🎨 Dashboard
│   │   ├── layout.tsx                      📄 Root layout
│   │   └── globals.css                     🎨 Global styles
│   │
│   └── lib/                                ← Utilities
│       ├── supabase.ts                     🗄️ DB client
│       └── parser.ts                       🔍 Parser
│
└── 📁 Other
    └── (Auto-generated: .next/, node_modules/, etc)
```

---

## 📚 Which File Should I Read?

### ⭐ Just Starting Out?
**→ [START_HERE.md](START_HERE.md)**
- Point you to the right guides
- Answer basic questions
- Get you oriented

### 🚀 Want to Setup Quickly?
**→ [QUICK_START.md](QUICK_START.md)**
- 9 concrete steps
- Copy-paste ready commands
- ~30-45 minutes to working system

### 📖 Want to Understand the Architecture?
**→ [README.md](README.md)**
- How the system works
- Tech stack overview
- High-level diagrams

### 🔧 Need Setup Instructions?
**→ [SUPABASE_SETUP.md](SUPABASE_SETUP.md)** → database  
**→ [TELEGRAM_BOT_SETUP.md](TELEGRAM_BOT_SETUP.md)** → bot  
**→ [SETUP.md](SETUP.md)** → complete guide

### 💬 Want to Know Telegram Commands?
**→ [TELEGRAM_COMMANDS.md](TELEGRAM_COMMANDS.md)**
- Examples of how to use
- Categories explained
- Troubleshooting

### 🤓 Want Technical Details?
**→ [IMPLEMENTATION_CHECKLIST.md](IMPLEMENTATION_CHECKLIST.md)**
- What was implemented
- Component verification
- Code structure

### 🎊 Want a Summary?
**→ [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** → detailed summary  
**→ [COMPLETION_REPORT.md](COMPLETION_REPORT.md)** → visual report

---

## 📂 Code Files Explained

### `/app/api/telegram/route.ts` 🤖
**Purpose:** Webhook endpoint for Telegram bot

**What it does:**
1. Receives message from bot
2. Parses `-category value` or `+category value`
3. Validates format
4. Categorizes automatically
5. Inserts into database
6. Sends response to user

**Example flow:**
```
User: "-lanche 25"
  ↓
Bot receives & calls webhook
  ↓
This file processes it
  ↓
Inserts: {user_id: 123, type: 'expense', amount: 25, category: 'alimentação'}
  ↓
Bot responds: "📉 Registrado! -R$ 25.00 📂 alimentação"
```

### `/app/api/transactions/[userId]/route.ts` 📊
**Purpose:** GET endpoint to fetch transactions

**What it does:**
1. Receives userId from URL
2. Optional filters: category, startDate, endDate
3. Queries database
4. Returns JSON with transactions
5. Orders by date (newest first)

**Example:**
```
GET /api/transactions/12345?category=alimentação
  ↓
Returns all food expenses for user 12345
```

### `/app/page.tsx` 🎨
**Purpose:** Main dashboard

**Features:**
- Real-time transaction list
- Summary cards (balance, income, expenses)
- Category filter buttons
- Responsive design
- Dark professional theme

### `/lib/supabase.ts` 🗄️
**Purpose:** Initialize Supabase client

**What it does:**
- Create browser client for frontend
- Create admin client for server operations
- Handle authentication with API keys
- Error handling

### `/lib/parser.ts` 🔍
**Purpose:** Parse commands and categorize

**Functions:**
- `parseTransaction(message)` - Extract type, amount, description
- `categorizeTransaction(description)` - Detect category by keywords

**Example:**
```
parseTransaction("-lanche 25")
  → {type: 'expense', amount: 25, description: 'lanche'}

categorizeTransaction("lanche")
  → "alimentação"
```

---

## 🔄 Data Flow

```
Telegram User
     │
     ├─ Types: "-description value" (expense)
     │          "+description value" (income)
     │
     ▼
Telegram Bot (@botfather)
     │
     ├─ Receives message
     │
     ▼
Webhook (POST /api/telegram)
     │
     ├─ Parse message
     ├─ Validate format
     ├─ Categorize (keyword matching)
     │
     ▼
Supabase PostgreSQL
     │
     ├─ INSERT transaction
     │ (user_id, amount, type, category, description, created_at)
     │
     ▼
API Response to Bot
     │
     ├─ Send confirmation to user
     │
     ▼
Dashboard (GET /api/transactions)
     │
     ├─ Fetch transactions
     ├─ Filter (category, period)
     ├─ Calculate summary
     │
     ▼
User Views Dashboard
     │
     ├─ See saldo
     ├─ See receitas vs despesas
     ├─ Filter by category
     ├─ View history
```

---

## 🎯 Quick Reference

| File | Type | Purpose | When to Edit |
|------|------|---------|--------------|
| START_HERE.md | Doc | Entry point | Never |
| QUICK_START.md | Doc | Setup guide | Never |
| README.md | Doc | Overview | Never |
| SUPABASE_SETUP.md | Doc | DB setup | Never |
| TELEGRAM_BOT_SETUP.md | Doc | Bot setup | Never |
| SETUP.md | Doc | Full guide | Never |
| TELEGRAM_COMMANDS.md | Doc | Command ref | Never |
| package.json | Config | Dependencies | If adding packages |
| .env.local | Config | Secrets | Fill with YOUR values |
| tsconfig.json | Config | TypeScript | Rarely |
| next.config.js | Config | Next.js | If advanced tweaks |
| route.ts (telegram) | Code | Webhook | If changing format |
| route.ts (transactions) | Code | API | If changing API |
| page.tsx | Code | Dashboard | If changing UI |
| parser.ts | Code | Logic | If adding categories |
| supabase.ts | Code | Client | Rarely |

---

## ✅ Ready?

1. Open **[START_HERE.md](START_HERE.md)**
2. Follow **[QUICK_START.md](QUICK_START.md)**
3. System running in ~45 minutes ✨

---

**Questions?** Check the relevant documentation file above.

**Good luck! 🐺**

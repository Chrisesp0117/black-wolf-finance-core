# 🐺 BlackWolf Finance Core

Sistema pessoal de gestão financeira focado em **simplicidade, velocidade** e **clareza financeira em tempo real**.

Registre despesas e receitas em **menos de 5 segundos** via Telegram, visualize seus dados em um **dashboard limpo**, pronto para usar.

---

## 🚀 Quick Start (5 minutos)

### 1. Clonar e instalar

```bash
git clone <seu-repo>
cd Black-Wolf-Finance-Core
npm install
```

### 2. Configurar Supabase

Siga [SUPABASE_SETUP.md](SUPABASE_SETUP.md) para criar banco de dados.

### 3. Criar bot Telegram

Siga [TELEGRAM_BOT_SETUP.md](TELEGRAM_BOT_SETUP.md) para criar bot com @BotFather.

### 4. Atualizar `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave
SUPABASE_SERVICE_KEY=sua-service-key
TELEGRAM_BOT_TOKEN=seu-token
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Executar localmente

```bash
npm run dev
# Acesse http://localhost:3000
```

### 6. Deploy no Vercel

[Deploy em Vercel](SETUP.md#-deploy)

---

## 📋 Setup Checklist

- [ ] Configurar Supabase ([SUPABASE_SETUP.md](SUPABASE_SETUP.md))
- [ ] Criar bot Telegram ([TELEGRAM_BOT_SETUP.md](TELEGRAM_BOT_SETUP.md))
- [ ] Atualizar `.env.local`
- [ ] Executar `npm run dev`
- [ ] Testar localmente
- [ ] Deploy no Vercel
- [ ] Registrar webhook Telegram

---

## 💡 Como usar

Envie mensagens para seu bot Telegram:

```
-lanche 25          # Despesa de R$ 25 em alimentação
+salário 1400       # Receita de R$ 1400
-uber 32            # Despesa em transporte
+freela 600         # Receita de freelance
```

**Bot responde automaticamente:**

```
📉 Registrado!
-R$ 25.00
📂 alimentação
```

**Dashboard mostra:**
- 💰 Saldo total
- 📈 Receitas
- 📉 Despesas
- 📂 Filtro por categoria
- 📅 Histórico completo

---

## 🏗️ Arquitetura

```
┌─────────────┐
│  Telegram   │
│   User      │
└──────┬──────┘
       │ "-lanche 25"
       ▼
┌─────────────┐        ┌──────────┐
│ Telegram    │──────► │ Next.js  │
│   Bot       │ webhook│   API    │
└─────────────┘        └─────┬────┘
                              │ insert
                              ▼
                        ┌──────────────┐
                        │  Supabase    │
                        │ PostgreSQL   │
                        └─────┬────────┘
                              │
                              ▼
                        ┌──────────────┐
                        │  Dashboard   │
                        │   Web        │
                        └──────────────┘
```

---

## 📁 Estrutura

```
.
├── app/
│   ├── api/
│   │   ├── telegram/route.ts        # Webhook Telegram
│   │   └── transactions/[userId]/   # GET transações
│   ├── page.tsx                     # Dashboard
│   ├── layout.tsx
│   └── globals.css
├── lib/
│   ├── supabase.ts                  # Cliente Supabase
│   └── parser.ts                    # Parser regex
├── SUPABASE_SETUP.md                # Setup banco
├── TELEGRAM_BOT_SETUP.md            # Setup bot
├── SETUP.md                         # Guia completo
└── package.json
```

---

## 📖 Documentação Completa

- **[SUPABASE_SETUP.md](SUPABASE_SETUP.md)** — Passo a passo Supabase + SQL
- **[TELEGRAM_BOT_SETUP.md](TELEGRAM_BOT_SETUP.md)** — Criar bot + webhook
- **[SETUP.md](SETUP.md)** — Guia completo + deploy Vercel

---

## 🎯 Princípios

✅ **Zero fricção** — Registrar gasto em < 5 segundos  
✅ **Simplicidade** — Sem features desnecessárias  
✅ **Sem IA obrigatória** — Sistema funciona 100% sem IA  
✅ **Dados estruturados** — PostgreSQL desde o início  
✅ **Single-user** — Fácil, seguro, rápido  

---

## 🔮 Roadmap (Futuro)

- [ ] Editar/deletar transações
- [ ] Relatórios mensais em PDF
- [ ] Gráficos por categoria
- [ ] Integração bancária (Open Banking)
- [ ] Previsões IA
- [ ] Múltiplos usuários

---

## 🚢 Status da Implementação

- ✅ Backend (API + webhook)
- ✅ Dashboard
- ✅ Parser de comandos
- ✅ Categorização automática
- ⏳ **Aguardando você:** Configurar Supabase, criar bot, fazer deploy

**Tempo estimado:** 20-30 minutos (siguindo os guias)

---

## 📧 Suporte

Problemas? Verifique:
- [SUPABASE_SETUP.md](SUPABASE_SETUP.md#-troubleshooting) — Problemas Supabase
- [TELEGRAM_BOT_SETUP.md](TELEGRAM_BOT_SETUP.md#-troubleshooting) — Problemas bot
- Logs do Vercel (Dashboard > Deployments > Logs)

---

**Criado com ❤️ para gerenciar finanças sem fricção**

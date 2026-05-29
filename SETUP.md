# BlackWolf Finance Core — Sistema de Gestão Financeira

Um sistema minimalista de gestão financeira pessoal. Registre despesas e receitas via **Telegram** em menos de 5 segundos e visualize seus dados em um dashboard simples.

## 🚀 Quick Start

### 1. Clonar repositório e instalar dependências

```bash
npm install
```

### 2. Configurar Supabase

1. Criar conta em [supabase.com](https://supabase.com)
2. Criar novo projeto
3. Copiar `Project URL` e `Anon Key`
4. Executar SQL abaixo no Supabase para criar tabela:

```sql
CREATE TABLE transactions (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  type VARCHAR(10) CHECK (type IN ('income', 'expense')),
  category VARCHAR(50) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_user_created ON transactions(user_id, created_at DESC);
```

5. Pegar `Service Role Key` também (aparece em Settings > API)

### 3. Configurar variáveis de ambiente

Editar `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
SUPABASE_SERVICE_KEY=sua-service-role-key

TELEGRAM_BOT_TOKEN=seu-token-aqui
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Criar bot Telegram

1. Abrir [@BotFather](https://t.me/botfather) no Telegram
2. Comando `/newbot`
3. Seguir instruções (nome, username)
4. Copiar token fornecido para `TELEGRAM_BOT_TOKEN` em `.env.local`

### 5. Executar localmente

```bash
npm run dev
```

Acessar http://localhost:3000

### 6. Configurar webhook Telegram (em produção)

Após deploy no Vercel, registrar webhook:

```bash
curl -X POST https://api.telegram.org/botSEU_TOKEN/setWebhook \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://seu-app.vercel.app/api/telegram"
  }'
```

## 📱 Como usar

Envie mensagens para seu bot:

- **Despesa**: `-comida 25` ou `-lanche 15`
- **Receita**: `+salário 1400` ou `+freela 200`

Bot responderá com confirmação e categoria detectada automaticamente.

## 🏗️ Arquitetura

```
┌─────────────────────┐
│   Telegram User     │
│  -uber 32           │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Telegram Bot       │
│  (Webhook)          │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Next.js API        │
│  /api/telegram      │ ◄─ Parser + Categorização
│  /api/transactions  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Supabase (PG)     │
│   transactions      │
└─────────────────────┘
           │
           ▼
┌─────────────────────┐
│   Dashboard Web     │
│   localhost:3000    │
└─────────────────────┘
```

## 📂 Estrutura do Projeto

```
.
├── app/
│   ├── api/
│   │   ├── telegram/route.ts        # Webhook Telegram
│   │   └── transactions/[userId]/   # GET lista transações
│   ├── page.tsx                     # Dashboard principal
│   ├── layout.tsx
│   └── globals.css
├── lib/
│   ├── supabase.ts                  # Cliente Supabase
│   └── parser.ts                    # Parser de comandos
├── .env.local                       # Variáveis de ambiente
├── package.json
├── tsconfig.json
└── README.md
```

## 🎯 Categorias

Automáticas, baseadas em keywords:

- **Alimentação**: lanche, comida, restaurante, mercado...
- **Transporte**: uber, taxi, busão, gasolina...
- **Trabalho**: freelance, salário...
- **Saúde**: farmácia, médico...
- **Lazer**: cinema, jogo, show...
- **Outros**: padrão se não identificado

## 🚢 Deploy

### Vercel

1. Push para GitHub
2. Conectar repo no Vercel
3. Adicionar variáveis de ambiente em Settings > Environment Variables
4. Deploy automático

```bash
npm run build
npm start
```

## 🔮 Próximas features

- [ ] Editar/deletar transações
- [ ] Relatórios mensais em PDF
- [ ] Gráficos de despesas por categoria
- [ ] Integração com banco (open banking)
- [ ] Previsão IA de gastos
- [ ] Múltiplos usuários com autenticação

## 📝 Licença

MIT

# SUPABASE SETUP GUIDE — BlackWolf Finance

## ✅ Passo 1: Criar conta e projeto Supabase

1. Ir para https://supabase.com e criar conta
2. Criar novo projeto
3. Escolher region mais próximo
4. Esperar projeto ficar pronto (~1 min)

## ✅ Passo 2: Criar tabela `transactions`

Após projeto criado, ir para **SQL Editor** e executar:

```sql
-- Criar tabela de transações
CREATE TABLE transactions (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  type VARCHAR(10) NOT NULL CHECK (type IN ('income', 'expense')),
  category VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_created_at ON transactions(created_at DESC);
CREATE INDEX idx_transactions_user_created ON transactions(user_id, created_at DESC);

-- Habilitar RLS (Row Level Security)
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Policy para leitura/escrita do próprio user
CREATE POLICY "Users can read their own transactions"
  ON transactions
  FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own transactions"
  ON transactions
  FOR INSERT
  WITH CHECK (true);
```

## ✅ Passo 3: Pegar as chaves de API

1. Ir para **Settings** > **API**
2. Copiar:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` secret → `SUPABASE_SERVICE_KEY`

## ✅ Passo 4: Atualizar `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto-aqui.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

TELEGRAM_BOT_TOKEN=seu-token-telegram
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## ✅ Verificação

No Supabase, ir para **Table Editor** e verificar se tabela `transactions` aparece com as colunas certas.

Se tudo está ok, você pode começar a testar localmente!

---

**Nota**: Se receber erro "Cannot insert", verifique se RLS policies estão corretas ou desabilite temporariamente com:

```sql
ALTER TABLE transactions DISABLE ROW LEVEL SECURITY;
```

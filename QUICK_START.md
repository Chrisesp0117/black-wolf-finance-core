# ⚡ QUICK REFERENCE — BlackWolf Finance MVP

Sequência de passos para sair do zero até um sistema funcionando em **~30 minutos**.

---

## 📍 STATUS ATUAL

```
✅ Código pronto (100%)
   - API endpoints
   - Webhook Telegram
   - Dashboard
   - Parser de comandos
   - Categorização automática

⏳ Aguardando você (configuração):
   - Supabase
   - Telegram Bot
   - Deploy
```

---

## 🎯 PRÓXIMOS PASSOS (na ordem!)

### PASSO 1: Clonar e Instalar (2 min)

```bash
git clone <seu-repo>
cd Black-Wolf-Finance-Core
npm install
```

**✅ Pronto quando:** Terminal mostra "added X packages"

---

### PASSO 2: Supabase (10 min)

1. Acesse https://supabase.com
2. Crie conta → novo projeto
3. Vá para **SQL Editor**
4. Copie o SQL de [SUPABASE_SETUP.md](SUPABASE_SETUP.md#-passo-2-criar-tabela-transactions)
5. Cole e execute
6. Vá para **Settings > API**
7. Copie as 3 chaves:
   - `Project URL` 
   - `anon public` 
   - `service_role` (secret)

**✅ Pronto quando:** Você tem 3 chaves copiadas

---

### PASSO 3: Telegram Bot (5 min)

1. Abra Telegram
2. Procure `@BotFather`
3. `/newbot`
4. Nome: "BlackWolf Finance"
5. Username: algo como `blackwolf_finance_bot`
6. **Copiar o token gerado**

**✅ Pronto quando:** Você tem o token (começa com números)

---

### PASSO 4: Atualizar `.env.local` (2 min)

Abra `.env.local` e preencha:

```env
NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIs...
TELEGRAM_BOT_TOKEN=123456:ABC...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**✅ Pronto quando:** `.env.local` tem valores reais (não placeholders)

---

### PASSO 5: Testar Localmente (5 min)

```bash
npm run dev
```

Deve abrir: http://localhost:3000

**Será vazio** (sem transações ainda), mas:
- Página carrega OK
- Cards de saldo aparecem
- Botões de filtro funcionam

**✅ Pronto quando:** Dashboard aparece sem erros

---

### PASSO 6: Testar Bot Localmente (SKIP por enquanto)

Webhook precisa URL pública. Faremos deploy antes.

---

### PASSO 7: Deploy no Vercel (10 min)

1. Push código para GitHub:
   ```bash
   git add .
   git commit -m "Initial commit - BlackWolf Finance MVP"
   git push origin main
   ```

2. Acesse https://vercel.com
3. Conectar com GitHub
4. Selecionar repositório
5. **Environment Variables:**
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://seu-projeto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = sua-chave
   SUPABASE_SERVICE_KEY = sua-service-key
   TELEGRAM_BOT_TOKEN = seu-token
   NEXT_PUBLIC_APP_URL = https://seu-app-xyz.vercel.app
   ```
   (não use localhost, use URL do Vercel)

6. Deploy
7. Esperar build (~2 min)
8. Copiar URL: `https://seu-app-xyz.vercel.app`

**✅ Pronto quando:** Deploy mostra "✓ Production" e você acessa URL

---

### PASSO 8: Registrar Webhook Telegram (3 min)

No terminal:

```bash
curl -X POST https://api.telegram.org/bot{SEU_TOKEN}/setWebhook \
  -H "Content-Type: application/json" \
  -d '{"url": "https://seu-app-xyz.vercel.app/api/telegram"}'
```

Substituir:
- `{SEU_TOKEN}` → seu token real
- `seu-app-xyz.vercel.app` → sua URL Vercel real

Resposta esperada:
```json
{"ok": true, "result": true, "description": "Webhook was set"}
```

**✅ Pronto quando:** Response mostra `"ok": true`

---

### PASSO 9: Testar com Bot Real (5 min)

1. Procurar seu bot no Telegram
2. Enviar: `-lanche 25`
3. Bot responde com confirmação
4. Abrir dashboard: https://seu-app.vercel.app
5. Transação aparece na lista!

**✅ Pronto quando:** Transação aparece no dashboard

---

## 🎊 PRONTO!

Você tem um sistema **FUNCIONAL** de gestão financeira pessoal!

- ✅ Registra gastos em < 5 segundos via Telegram
- ✅ Categorização automática
- ✅ Dashboard mostra saldo e histórico
- ✅ Rodando em produção (Vercel)

---

## 📞 Problemas?

**Bot não responde:**
- Webhook registrado? (veja PASSO 8)
- Logs no Vercel: Dashboard > seu app > Deployments > Logs

**Erro ao enviar transação:**
- Supabase conectado? (teste URL + chaves)
- Tabela criada? (veja SUPABASE_SETUP.md)

**Dashboard vazio mesmo após registrar:**
- Verifique URL no dashboard: `?user_id=SEU_USER_ID`
- User ID é o do Telegram (número grande)

---

## 🚀 Próximas Features (Opcional)

Depois de tudo funcionando:
- [ ] Editar/deletar transações
- [ ] Gráficos por categoria
- [ ] Relatórios mensal em PDF
- [ ] Alertas de gasto alto

Mas o MVP já está **100% completo!**

---

**Tempo total estimado: 30-45 minutos**

Boa sorte! 🐺

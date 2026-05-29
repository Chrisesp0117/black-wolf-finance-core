# TELEGRAM BOT SETUP GUIDE — BlackWolf Finance

## ✅ Passo 1: Criar Bot com @BotFather

1. Abra Telegram
2. Procure por `@BotFather` (bot oficial do Telegram para criar bots)
3. Clique em **Start**
4. Digite `/newbot`
5. Escolha um nome para o bot (ex: "BlackWolf Finance")
6. Escolha um username único (ex: `blackwolf_finance_bot`)
7. **BotFather fornecerá um token** parecido com:
   ```
   123456:ABCdefGHIjklmnoPQRstuvwxyz1234567890
   ```

**Salve este token!** Você vai usar em `TELEGRAM_BOT_TOKEN` no `.env.local`

## ✅ Passo 2: Atualizar `.env.local`

```env
TELEGRAM_BOT_TOKEN=123456:ABCdefGHIjklmnoPQRstuvwxyz1234567890
```

## ✅ Passo 3: Testar localmente

1. Execute `npm run dev`
2. Servidor rodará em `http://localhost:3000`
3. **NÃO registre webhook ainda** (webhook precisa de URL pública)

Para testar localmente sem webhook público, você pode usar **polling** (verificar mensagens periodicamente), mas o projeto usa **webhook** (mais eficiente).

## ✅ Passo 4: Deploy no Vercel

1. Push código para GitHub
2. Conectar repositório no Vercel (https://vercel.com/dashboard)
3. Adicionar variáveis de ambiente em **Settings > Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_KEY`
   - `TELEGRAM_BOT_TOKEN`
   - `NEXT_PUBLIC_APP_URL` → URL do Vercel (ex: `https://seu-app-123.vercel.app`)

4. Deploy automático (Vercel faz automaticamente)

## ✅ Passo 5: Registrar Webhook

Após deploy no Vercel, registre o webhook (substitua URL e token):

```bash
curl -X POST https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/setWebhook \
  -H "Content-Type: application/json" \
  -d '{"url": "https://seu-app-no-vercel.vercel.app/api/telegram"}'
```

Exemplo real:
```bash
curl -X POST https://api.telegram.org/bot123456:ABCdef/setWebhook \
  -H "Content-Type: application/json" \
  -d '{"url": "https://blackwolf-finance.vercel.app/api/telegram"}'
```

Resposta esperada:
```json
{"ok": true, "result": true, "description": "Webhook was set"}
```

## ✅ Passo 6: Testar Bot

1. Procure seu bot no Telegram (ex: `@blackwolf_finance_bot`)
2. Envie uma mensagem:
   ```
   -comida 25
   ```
3. Bot deve responder:
   ```
   📉 Registrado!
   -R$ 25.00
   📂 alimentação
   ```
4. Verifique no dashboard: http://seu-app.vercel.app/?user_id=SEU_USER_ID

## 🔧 Troubleshooting

### Bot não responde

**Verificar webhook status:**
```bash
curl https://api.telegram.org/bot{TOKEN}/getWebhookInfo
```

Esperado:
```json
{
  "ok": true,
  "result": {
    "url": "https://seu-app.vercel.app/api/telegram",
    "has_custom_certificate": false,
    "pending_update_count": 0,
    "last_error_date": null
  }
}
```

### Reset webhook

```bash
curl -X POST https://api.telegram.org/bot{TOKEN}/deleteWebhook
```

Depois registre novamente.

### Logs

Verifique os logs do Vercel em Dashboard → seu app → Deployments → Logs.

---

**Status da implementação:**
- ✅ Código backend pronto
- ✅ Dashboard pronta
- ⏳ Aguardando: Criar bot, configurar Supabase, fazer deploy

Próximo passo: Configure Supabase (veja SUPABASE_SETUP.md)

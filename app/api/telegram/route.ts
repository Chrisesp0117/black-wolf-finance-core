import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import { parseTransaction, categorizeTransaction } from "@/lib/parser"

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`
const SINGLE_USER_ID = Number(process.env.SINGLE_USER_ID || "1")

interface PendingTransaction {
  type: "expense" | "income"
  amount: number
  name: string
  paymentMethod: string
  category: string
}

async function sendTelegramMessage(chatId: number, text: string) {
  if (!TELEGRAM_BOT_TOKEN) {
    throw new Error("Missing TELEGRAM_BOT_TOKEN environment variable")
  }

  const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  })

  if (!response.ok) {
    const responseText = await response.text()
    console.error("Telegram sendMessage failed:", response.status, responseText)
  }

  return response
}

async function callTelegram(method: string, payload: Record<string, unknown>) {
  if (!TELEGRAM_BOT_TOKEN) {
    throw new Error("Missing TELEGRAM_BOT_TOKEN environment variable")
  }

  const response = await fetch(`${TELEGRAM_API_URL}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const responseText = await response.text()
    console.error(`Telegram ${method} failed:`, response.status, responseText)
  }

  return response
}

function buildConfirmMessage(tx: PendingTransaction): string {
  const signal = tx.type === "income" ? "+" : "-"
  return [
    "🧾 Confirme o registro:",
    `Nome: ${tx.name}`,
    `Categoria: ${tx.category}`,
    `Valor: ${signal}R$ ${tx.amount.toFixed(2)}`,
    `Forma de pagamento: ${tx.paymentMethod}`,
  ].join("\n")
}

function parseConfirmMessage(text: string): PendingTransaction | null {
  const nameMatch = text.match(/^Nome:\s*(.+)$/m)
  const categoryMatch = text.match(/^Categoria:\s*(.+)$/m)
  const valueMatch = text.match(/^Valor:\s*([+-])R\$\s*(\d+(?:\.\d{1,2})?)$/m)
  const paymentMatch = text.match(/^Forma de pagamento:\s*(.+)$/m)

  if (!nameMatch || !categoryMatch || !valueMatch || !paymentMatch) return null

  const amount = parseFloat(valueMatch[2])
  if (!Number.isFinite(amount)) return null

  return {
    type: valueMatch[1] === "+" ? "income" : "expense",
    amount,
    name: nameMatch[1].trim(),
    category: categoryMatch[1].trim(),
    paymentMethod: paymentMatch[1].trim(),
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const dashboardUrl = `${request.nextUrl.origin}/`

    if (body.callback_query) {
      const callbackQuery = body.callback_query
      const callbackData = callbackQuery.data as string
      const chatId = callbackQuery.message?.chat?.id
      const messageId = callbackQuery.message?.message_id
      const originalText = callbackQuery.message?.text as string | undefined

      await callTelegram("answerCallbackQuery", {
        callback_query_id: callbackQuery.id,
      })

      if (!chatId || !messageId || !originalText) {
        return NextResponse.json({ ok: true })
      }

      if (callbackData === "tx_cancel") {
        await callTelegram("editMessageText", {
          chat_id: chatId,
          message_id: messageId,
          text: "❌ Registro cancelado.",
        })
        return NextResponse.json({ ok: true })
      }

      if (callbackData === "tx_confirm") {
        const parsedFromMessage = parseConfirmMessage(originalText)

        if (!parsedFromMessage) {
          await callTelegram("editMessageText", {
            chat_id: chatId,
            message_id: messageId,
            text: "⚠️ Não foi possível confirmar este registro. Envie novamente.",
          })
          return NextResponse.json({ ok: true })
        }

        const { error } = await supabaseAdmin.from("transactions").insert({
          user_id: SINGLE_USER_ID,
          amount: parsedFromMessage.amount,
          type: parsedFromMessage.type,
          category: parsedFromMessage.category,
          description: `${parsedFromMessage.name} (${parsedFromMessage.paymentMethod})`,
          created_at: new Date().toISOString(),
        })

        if (error) {
          console.error("Supabase error:", error)
          await callTelegram("editMessageText", {
            chat_id: chatId,
            message_id: messageId,
            text: "⚠️ Erro ao registrar transação.",
          })
          return NextResponse.json({ ok: true })
        }

        const typeEmoji = parsedFromMessage.type === "income" ? "📈" : "📉"
        await callTelegram("editMessageText", {
          chat_id: chatId,
          message_id: messageId,
          text: `${typeEmoji} Registro confirmado!\nNome: ${parsedFromMessage.name}\nCategoria: ${parsedFromMessage.category}\nValor: ${parsedFromMessage.type === "income" ? "+" : "-"}R$ ${parsedFromMessage.amount.toFixed(2)}\nForma de pagamento: ${parsedFromMessage.paymentMethod}\n\n🔗 Dashboard:\n${dashboardUrl}`,
        })

        return NextResponse.json({ ok: true })
      }

      return NextResponse.json({ ok: true })
    }

    // Verify webhook is from Telegram
    if (!body.message) {
      return NextResponse.json({ ok: true })
    }

    const { message } = body
    const chatId = message.chat.id
    const text = message.text

    if (!text) {
      return NextResponse.json({ ok: true })
    }

    if (text === "/start" || text === "/menu") {
      await sendTelegramMessage(
        chatId,
        `👋 Bem-vindo ao Black Wolf Finance!\n\n📥 Formato de lançamento:\n-VALOR NOME FORMA_DE_PAG\nExemplo:\n-10 lanche pix\n\n🔗 Dashboard:\n${dashboardUrl}`,
      )
      return NextResponse.json({ ok: true })
    }

    // Parse transaction from message
    const parsed = parseTransaction(text)

    if (!parsed) {
      // Send error message
      await sendTelegramMessage(
        chatId,
        "❌ Formato inválido.\nUse: -VALOR NOME FORMA_DE_PAG\nExemplo: -10 lanche pix",
      )
      return NextResponse.json({ ok: true })
    }

    // Categorize
    const category = categorizeTransaction(parsed.description)

    const confirmationText = buildConfirmMessage({
      type: parsed.type,
      amount: parsed.amount,
      name: parsed.description,
      category,
      paymentMethod: parsed.paymentMethod,
    })

    await callTelegram("sendMessage", {
      chat_id: chatId,
      text: confirmationText,
      reply_markup: {
        inline_keyboard: [
          [
            { text: "✅ Confirmar", callback_data: "tx_confirm" },
            { text: "❌ Cancelar", callback_data: "tx_cancel" },
          ],
        ],
      },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ ok: true })
  }
}

export async function GET(request: NextRequest) {
  // Endpoint para testar se webhook está funcionando
  return NextResponse.json({ status: "webhook running" })
}

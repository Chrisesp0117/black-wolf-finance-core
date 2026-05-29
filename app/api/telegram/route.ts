import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import { parseTransaction, categorizeTransaction } from "@/lib/parser"

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Verify webhook is from Telegram
    if (!body.message) {
      return NextResponse.json({ ok: true })
    }

    const { message } = body
    const chatId = message.chat.id
    const userId = message.from.id
    const text = message.text

    if (!text) {
      return NextResponse.json({ ok: true })
    }

    // Parse transaction from message
    const parsed = parseTransaction(text)

    if (!parsed) {
      // Send error message
      await sendTelegramMessage(
        chatId,
        "❌ Formato inválido. Use:\n-categoria valor (despesa)\n+categoria valor (receita)\n\nExemplos:\n-lanche 15\n+salário 1400",
      )
      return NextResponse.json({ ok: true })
    }

    // Categorize
    const category = categorizeTransaction(parsed.description)

    // Insert into Supabase
    const { error } = await supabaseAdmin.from("transactions").insert({
      user_id: userId,
      amount: parsed.amount,
      type: parsed.type,
      category,
      description: parsed.description,
      created_at: new Date().toISOString(),
    })

    if (error) {
      console.error("Supabase error:", error)
      await sendTelegramMessage(chatId, "⚠️ Erro ao registrar transação")
      return NextResponse.json({ ok: true })
    }

    // Send success message
    const typeEmoji = parsed.type === "income" ? "📈" : "📉"
    await sendTelegramMessage(
      chatId,
      `${typeEmoji} Registrado!\n${parsed.type === "income" ? "+" : "-"}R$ ${parsed.amount.toFixed(2)}\n📂 ${category}`,
    )

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

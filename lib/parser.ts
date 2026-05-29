// Category keywords mapping for automatic categorization
const categoryKeywords: { [key: string]: string[] } = {
  alimentação: ["lanche", "comida", "restaurante", "pizza", "burger", "sanduiche", "cafe", "supermercado", "mercado", "padaria", "acaraje"],
  transporte: ["uber", "lyft", "taxi", "busao", "metro", "onibus", "gasolina", "combustivel", "estacionamento"],
  trabalho: ["freelance", "freela", "salário", "salario", "pagamento", "cliente"],
  saúde: ["farmacia", "farmácia", "medico", "médico", "hospital", "dentista", "consultório"],
  lazer: ["cinema", "jogo", "game", "diversão", "diversao", "show", "concerto", "museu"],
  outros: [],
}

export function categorizeTransaction(description: string): string {
  const lowerDesc = description.toLowerCase()

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    for (const keyword of keywords) {
      if (lowerDesc.includes(keyword)) {
        return category
      }
    }
  }

  return "outros"
}

// Parse Telegram command: "-VALOR NOME FORMA_PAG" or "+VALOR NOME FORMA_PAG"
export function parseTransaction(message: string): {
  type: "expense" | "income"
  amount: number
  description: string
  paymentMethod: string
} | null {
  const trimmed = message.trim()

  // Match: +|- amount name paymentMethod
  // Example: -10 lanche pix
  const match = trimmed.match(/^([+-])\s*(\d+(?:[.,]\d{1,2})?)\s+(.+?)\s+([^\s]+)$/)
  if (!match) return null

  const signal = match[1]
  const amount = parseFloat(match[2].replace(",", "."))
  const description = match[3].trim()
  const paymentMethod = match[4].trim().replace(/_/g, " ")

  if (!Number.isFinite(amount) || amount <= 0 || !description || !paymentMethod) {
    return null
  }

  return {
    type: signal === "+" ? "income" : "expense",
    amount,
    description,
    paymentMethod,
  }
}

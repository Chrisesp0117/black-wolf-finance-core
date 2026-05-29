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

// Parse Telegram command: "-category value" or "+category value"
export function parseTransaction(message: string): { type: "expense" | "income"; amount: number; description: string } | null {
  const trimmed = message.trim()

  // Match: -/+ followed by description and number
  const expenseMatch = trimmed.match(/^-\s*(.+?)\s+(\d+(?:[.,]\d{2})?)$/)
  if (expenseMatch) {
    return {
      type: "expense",
      description: expenseMatch[1].trim(),
      amount: parseFloat(expenseMatch[2].replace(",", ".")),
    }
  }

  const incomeMatch = trimmed.match(/^\+\s*(.+?)\s+(\d+(?:[.,]\d{2})?)$/)
  if (incomeMatch) {
    return {
      type: "income",
      description: incomeMatch[1].trim(),
      amount: parseFloat(incomeMatch[2].replace(",", ".")),
    }
  }

  return null
}

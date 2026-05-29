"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"

interface Transaction {
  id: string
  user_id: number
  amount: number
  type: "income" | "expense"
  category: string
  description: string
  created_at: string
}

export default function ClientDashboard({ userId }: { userId: string }) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    fetchTransactions()
  }, [userId, selectedCategory])

  async function fetchTransactions() {
    try {
      setLoading(true)
      const url = `/api/transactions/${userId}${selectedCategory ? `?category=${selectedCategory}` : ""}`
      const { data } = await axios.get(url)
      setTransactions(data.transactions || [])
    } catch (error) {
      console.error("Error fetching transactions:", error)
      setTransactions([])
    } finally {
      setLoading(false)
    }
  }

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = income - expenses

  const categories = Array.from(new Set(transactions.map((t) => t.category)))

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">🐺 BlackWolf Finance</h1>
          <p className="text-gray-400">Gestão financeira simplificada</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <p className="text-gray-400 text-sm mb-2">Receitas</p>
            <p className="text-3xl font-bold text-green-500">+R$ {income.toFixed(2)}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <p className="text-gray-400 text-sm mb-2">Despesas</p>
            <p className="text-3xl font-bold text-red-500">-R$ {expenses.toFixed(2)}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <p className="text-gray-400 text-sm mb-2">Saldo</p>
            <p className={`text-3xl font-bold ${balance >= 0 ? "text-green-500" : "text-red-500"}`}>
              R$ {balance.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="mb-8">
            <p className="text-gray-400 text-sm mb-3">Filtrar por categoria:</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedCategory === null
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                }`}
              >
                Todas
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Transactions List */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="px-6 py-4 bg-gray-900 border-b border-gray-700">
            <h2 className="text-lg font-bold">Histórico de Transações</h2>
          </div>

          {loading ? (
            <div className="p-6 text-center text-gray-400">Carregando...</div>
          ) : transactions.length === 0 ? (
            <div className="p-6 text-center text-gray-400">
              Nenhuma transação registrada. Use o bot do Telegram para adicionar!
            </div>
          ) : (
            <div className="divide-y divide-gray-700">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="px-6 py-4 hover:bg-gray-700 transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-gray-400">
                        📂 {transaction.category} • {new Date(transaction.created_at).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <p
                      className={`text-lg font-bold ${
                        transaction.type === "income" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}R$ {transaction.amount.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Setup Instructions */}
        <div className="mt-8 bg-yellow-900 border border-yellow-600 rounded-lg p-6">
          <p className="text-yellow-100">
            <strong>⚠️ Setup Telegram:</strong> Envie no formato <code className="bg-yellow-800 px-2 py-1 rounded">-VALOR NOME FORMA_DE_PAG</code> (ex: <code className="bg-yellow-800 px-2 py-1 rounded">-10 lanche pix</code>)
          </p>
        </div>
      </div>
    </div>
  )
}

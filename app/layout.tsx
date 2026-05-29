import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "BlackWolf Finance - Gestão Financeira",
  description: "Sistema simples e rápido de gestão de finanças pessoais",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}

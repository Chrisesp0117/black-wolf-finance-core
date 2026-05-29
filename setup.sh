#!/bin/bash

echo "🐺 BlackWolf Finance — Setup Script"
echo "===================================="
echo ""

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Instale em nodejs.org"
    exit 1
fi

echo "✅ Node.js encontrado: $(node -v)"

# Instalar dependências
echo ""
echo "📦 Instalando dependências..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Erro ao instalar dependências"
    exit 1
fi

echo "✅ Dependências instaladas"

# Guias
echo ""
echo "📖 Próximos passos:"
echo "1. Leia SUPABASE_SETUP.md para configurar banco de dados"
echo "2. Crie bot Telegram em https://t.me/botfather"
echo "3. Atualize .env.local com as credenciais"
echo "4. Execute: npm run dev"
echo ""
echo "Documentação:"
echo "- SETUP.md — Guia completo"
echo "- SUPABASE_SETUP.md — Setup do banco"
echo ""
echo "🚀 Tudo pronto! Boa sorte!"

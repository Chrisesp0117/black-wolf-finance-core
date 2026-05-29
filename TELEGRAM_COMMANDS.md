# 🤖 TELEGRAM COMMANDS REFERENCE

Guia completo de comandos suportados pelo bot BlackWolf Finance.

---

## 📝 Formatos Suportados

### Despesa (Saída)

Prefixo: `-`

```
-DESCRIÇÃO VALOR
```

Exemplos:
```
-lanche 25
-uber 32.50
-supermercado 150
-farmácia 45,99
-gasolina 120
-cinema 60
```

### Receita (Entrada)

Prefixo: `+`

```
+DESCRIÇÃO VALOR
```

Exemplos:
```
+salário 1400
+freelance 500
+bonus 200
+venda 1000
+freela 600,50
```

---

## 🎯 Detecção Automática de Categorias

Quando você envia uma transação, o bot detecta automaticamente a categoria baseado em keywords.

### Exemplos por Categoria

**Alimentação**
```
-lanche 15         → alimentação
-comida 50         → alimentação
-restaurante 80    → alimentação
-mercado 200       → alimentação
-padaria 20        → alimentação
-super 100         → alimentação
```

**Transporte**
```
-uber 32           → transporte
-taxi 40           → transporte
-busao 10          → transporte
-gasolina 120      → transporte
-estacionamento 50 → transporte
-metro 5           → transporte
```

**Trabalho**
```
+freelance 500     → trabalho
+salário 1400      → trabalho
+freela 300        → trabalho
+pagamento 600     → trabalho
```

**Saúde**
```
-farmácia 45       → saúde
-medico 200        → saúde
-dentista 150      → saúde
-hospital 500      → saúde
```

**Lazer**
```
-cinema 60         → lazer
-jogo 50           → lazer
-show 100          → lazer
-diversão 80       → lazer
```

**Outros (Default)**
```
-presente 100      → outros
-books 50          → outros
-coisa random 30   → outros
```

---

## ✅ Validação de Formato

O bot valida o formato:

### ✅ Válidos
```
-lanche 25          ✓
-lanche 25.50       ✓
-lanche 25,99       ✓
+salário 1400       ✓
- café 10           ✓ (espaço entre - e descrição)
+  freelance 500    ✓ (múltiplos espaços)
```

### ❌ Inválidos
```
lanche 25           ✗ (sem - ou +)
-25 lanche          ✗ (valor antes da descrição)
-lanche             ✗ (sem valor)
-lanche vinte       ✗ (valor em texto)
-lanche 25.50.99    ✗ (múltiplos decimais)
```

---

## 🤖 Respostas do Bot

### Sucesso

```
📉 Registrado!
-R$ 25.00
📂 alimentação
```

ou

```
📈 Registrado!
+R$ 500.00
📂 trabalho
```

### Erro de Formato

```
❌ Formato inválido. Use:
-categoria valor (despesa)
+categoria valor (receita)

Exemplos:
-lanche 15
+salário 1400
```

### Erro de Conexão

```
⚠️ Erro ao registrar transação
```

(Verifique sua conexão com internet e tente novamente)

---

## 📊 Visualizar Transações

Após registrar com sucesso, você pode:

1. Acesse o dashboard: `https://seu-app.vercel.app`
2. Ver:
   - 💰 Saldo total
   - 📈 Total de receitas
   - 📉 Total de despesas
   - 📂 Filtro por categoria
   - 📅 Histórico completo

---

## 🔢 Limites

- **Valor mínimo:** R$ 0.01
- **Valor máximo:** R$ 9.999.999.99
- **Descrição:** até 255 caracteres
- **Frequência:** sem limite
- **Histórico:** sem limite (tudo armazenado)

---

## ⚡ Dicas e Truques

### Valores com centavos
```
-café 4.50      ✓
-café 4,50      ✓ (vírgula também funciona)
```

### Descrições longas
```
-bora do cinema com amigos 80   ✓ (funciona!)
```

### Categorias customizadas
Se enviar algo não reconhecido:
```
-coisa estanha 50
→ 📂 outros (categoria padrão)
```

Dica: Tente usar keywords que o bot entende:
```
-livros educação 50       → será "outros"
-book educação 50         → será "outros"
```

---

## 🐛 Troubleshooting

**Bot não responde:**
- Verificar se webhook está registrado
- Verificar logs do Vercel

**Categoria errada:**
- O parser é case-insensitive
- Tente reenviar com keyword diferente
- Próximas versões terão edição de transações

**Valor não aparece no dashboard:**
- Atualizar a página
- Verificar se URL tem `?user_id=SEU_ID`

---

## 📈 Exemplo de Uso Completo

```
1️⃣ Segunda:
   -lanche 25      → 📉 alimentação
   +salário 1400   → 📈 trabalho

2️⃣ Terça:
   -uber 32        → 📉 transporte
   -café 5         → 📉 alimentação

3️⃣ Ver dashboard:
   https://seu-app.vercel.app
   
   Receitas: +R$ 1.400
   Despesas: -R$ 62.00
   Saldo: R$ 1.338.00
   
   Filtrar por "alimentação": -R$ 30.00
```

---

**Pronto para usar! 🐺**

Qualquer dúvida, veja a documentação em [README.md](README.md).

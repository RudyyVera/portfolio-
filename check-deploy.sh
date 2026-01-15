#!/bin/bash
# Script de verificación antes de deploy a Vercel

echo "🔍 Verificando proyecto para Vercel..."
echo ""

# Verificar .env no está en Git
if git ls-files | grep -q "^\.env$"; then
    echo "❌ ERROR: .env está siendo tracked por Git"
    echo "   Ejecuta: git rm --cached .env"
    exit 1
else
    echo "✅ .env no está en Git"
fi

# Verificar .gitignore contiene .env
if grep -q "^\.env$" .gitignore; then
    echo "✅ .env está en .gitignore"
else
    echo "⚠️  ADVERTENCIA: .env no está en .gitignore"
fi

# Verificar que .env.example existe
if [ -f ".env.example" ]; then
    echo "✅ .env.example existe"
else
    echo "⚠️  ADVERTENCIA: .env.example no existe"
fi

# Verificar que vercel.json existe
if [ -f "vercel.json" ]; then
    echo "✅ vercel.json existe"
else
    echo "⚠️  ADVERTENCIA: vercel.json no existe"
fi

# Verificar dependencias
if [ -f "package.json" ]; then
    echo "✅ package.json existe"
else
    echo "❌ ERROR: package.json no existe"
    exit 1
fi

# Verificar API está en lugar correcto
if [ -f "api/chat.js" ]; then
    echo "✅ api/chat.js existe"
else
    echo "❌ ERROR: api/chat.js no encontrado"
    exit 1
fi

# Verificar frontend
if [ -f "frontend/index.html" ]; then
    echo "✅ frontend/index.html existe"
else
    echo "❌ ERROR: frontend/index.html no encontrado"
    exit 1
fi

echo ""
echo "✅ Verificación completada!"
echo ""
echo "Próximos pasos:"
echo "1. git add ."
echo "2. git commit -m 'Preparar para Vercel'"
echo "3. git push origin main"
echo "4. Ve a https://vercel.com y conecta tu repo"
echo "5. Agrega OPENROUTER_API_KEY en Environment Variables"
echo "6. Deploy!"

# Instrucciones de Seguridad - IMPORTANTE

## ⚠️ NUNCA hagas esto:

❌ Subas el archivo `.env` a GitHub
❌ Compartas tu API key en redes sociales
❌ Dejes variables de entorno en código
❌ Comits con credenciales

## ✅ SIEMPRE haz esto:

✅ Usa `.env` localmente
✅ Agrega `.env` al `.gitignore`
✅ Usa `.env.example` sin datos reales
✅ Guarda credenciales en Vercel (Environment Variables)

## 🔐 Pasos de Seguridad

1. **Archivo .env local** (no se sube)
```
OPENROUTER_API_KEY=tu_clave_real_aqui
```

2. **En Vercel Dashboard** (seguro)
   - Settings → Environment Variables
   - Agrega: OPENROUTER_API_KEY=tu_clave

3. **En .gitignore** (protegido)
```
.env
.env.local
```

4. **En .env.example** (público, sin datos)
```
OPENROUTER_API_KEY=your_api_key_here
```

## 🚨 Si accidentalmente subiste la API key:

1. Ve a https://openrouter.ai
2. Regenera tu API key
3. Actualiza en Vercel
4. Elimina histórico de Git:
```bash
git filter-branch --force --index-filter "git rm --cached --ignore-unmatch .env" --prune-empty --tag-name-filter cat -- --all
git push -f origin main
```

## 📞 Ayuda

- 📖 [OpenRouter Security](https://openrouter.ai/docs)
- 🔒 [Vercel Security Best Practices](https://vercel.com/docs/concepts/deployments/secure-environment-variables)
- 🛡️ [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning)

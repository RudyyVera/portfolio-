# 📋 CHECKLIST PARA SUBIR A VERCEL

Tu proyecto está casi listo. Sigue estos pasos exactos:

## ✅ PASO 1: Verificar seguridad local (5 minutos)

```bash
# En tu carpeta del proyecto:
cat .gitignore | grep -E "(\.env|node_modules)"
```

Debe mostrar:
```
.env
node_modules/
```

Si no ves `.env` en `.gitignore`, agrégalo:
```bash
echo ".env" >> .gitignore
```

## ✅ PASO 2: Verificar que .env tiene tu API key

```bash
# Verifica que tienes el archivo
cat .env
```

Debe mostrar algo como:
```
OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxx
```

**Si NO tienes API key:**
1. Ve a https://openrouter.ai/keys
2. Crea cuenta (gratis)
3. Copia tu API key
4. Edita `.env` y pega la clave

## ✅ PASO 3: Verificar que está en .gitignore

```bash
# Confirma que .env NO va a Git
git status | grep ".env"
```

**Resultado esperado:** Nada (no debe aparecer en git status)

Si aparece, ejecuta:
```bash
git rm --cached .env
git add .gitignore
git commit -m "Excluir .env de Git"
```

## ✅ PASO 4: Hacer commit de cambios

```bash
# Ver cambios pendientes
git status

# Agregar todos los cambios
git add .

# Hacer commit
git commit -m "Preparar para producción: rate limiting, seguridad, docs"

# Subir a GitHub
git push origin main
```

## ✅ PASO 5: Configurar en Vercel

### Opción A: Desde el navegador (más fácil)

1. Ve a https://vercel.com/dashboard
2. Haz clic en "New Project"
3. Haz clic en "Import GitHub Repository"
4. Selecciona tu repositorio (portfolio)
5. Haz clic en "Import"
6. **IMPORTANTE:** Antes de Deploy, ve a "Environment Variables"
7. Agrega esta variable:
   ```
   Name: OPENROUTER_API_KEY
   Value: sk-or-v1-tu_clave_aqui (pega tu clave real)
   ```
8. Haz clic en "Save"
9. Haz clic en "Deploy"

### Opción B: Desde terminal (si tienes Vercel CLI)

```bash
# Instalar Vercel CLI si no lo tienes
npm i -g vercel

# Hacer login
vercel login

# Deploy
vercel --prod
```

Cuando te pida environment variables, agrega:
```
OPENROUTER_API_KEY = sk-or-v1-tu_clave_aqui
```

## ✅ PASO 6: Verificar que todo funciona

1. Espera 2-3 minutos al deploy
2. Vercel te dará una URL como: `https://nombre-proyecto.vercel.app`
3. Abre en navegador
4. Prueba el bot:
   - Escribe un mensaje
   - Usa el botón 🎤 para voz
   - Verifica que responde

## 🆘 Si algo no funciona

### El bot no responde o error "undefined"
- Verifica que OPENROUTER_API_KEY está configurada en Vercel
- Ve a Vercel Dashboard → Settings → Environment Variables
- Confirma que está ahí

### Error "API key not found"
- Verifica que copiaste correctamente la clave
- La clave debe empezar con `sk-or-v1-`
- No debe tener espacios al inicio/final

### Timeout o error de conexión
- Verifica tu conexión a internet
- Intenta de nuevo en 1 minuto
- Abre la consola (F12) y mira los errores

### El sitio carga pero no ve nada
- Espera a que Vercel termine el deploy
- Recarga con Ctrl+Shift+R (limpiar caché)
- Verifica que `frontend/index.html` existe

## 📊 Ver logs en Vercel

1. Ve a https://vercel.com/dashboard
2. Selecciona tu proyecto
3. Haz clic en "Deployments"
4. Selecciona el deployment (el más reciente)
5. Haz clic en "View Function Logs"

Aquí puedes ver si el bot está recibiendo requests correctamente.

## 🔄 Actualizar después del deploy

Si haces cambios:

```bash
# Hacer cambios en tu código

# Commit y push
git add .
git commit -m "Descripción del cambio"
git push origin main

# Vercel automáticamente hace deploy! (2-3 minutos)
```

## ✨ ¡Listo!

Tu portafolio está en vivo en Internet. Puedes:
- Compartir el link con reclutadores
- Poner en tu CV
- Agregar a LinkedIn
- Mostrar a amigos

**URL de tu portafolio:** `https://[tu-proyecto].vercel.app`

---

## 💡 Consejos finales

1. **Guarda tu API key en un lugar seguro** (no la compartas)
2. **Monitorea el uso en OpenRouter** para evitar surpresas
3. **Recuerda** que es gratis pero tiene límite de requests
4. **Actualiza el proyecto regularmente** con tus nuevos proyectos

¡Éxito! 🚀

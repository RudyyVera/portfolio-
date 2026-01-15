# 🤖 RudIBot - Portfolio & Chatbot 3D con IA

![RudIBot](frontend/assets/image.png)

## 📖 Descripción

RudIBot es un **portafolio profesional interactivo** con un **chatbot 3D potenciado por IA**. Cuenta con reconocimiento de voz, síntesis de voz, diseño responsive y un modelo 3D animado que interactúa con el usuario.

## ✨ Características Principales

- 🎤 **Reconocimiento de voz** - Dicta mensajes directamente
- 🔊 **Síntesis de voz** - El bot responde hablando
- 🎨 **Interfaz 3D** - Modelo animado y moderno
- 💬 **Chat inteligente** - Conversaciones naturales con IA
- 📱 **Responsive** - Perfecto en móvil, tablet y desktop
- 🌙 **Light/Dark Theme** - Modo oscuro/claro
- 🌐 **Bilingüe** - Español e Inglés
- ⚡ **Rate Limiting** - Protegido contra spam
- 🔒 **API Key Segura** - Variables de entorno protegidas

## 🛠️ Stack Tecnológico

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Model Viewer (visualización 3D)
- Web Speech API (voz)
- Responsive design

### Backend
- Node.js + Vercel Functions
- OpenRouter API (IA)
- Rate limiting + validación

## 📂 Estructura

```
.
├── frontend/               # Cliente
│   ├── index.html
│   ├── style.css
│   ├── responsive-patch.css
│   ├── script.js
│   ├── animations.js
│   ├── translations.js
│   └── assets/
├── api/                    # Backend (Vercel Functions)
│   └── chat.js
├── .env.example           # Variables de entorno (referencia)
├── .gitignore            # Excluye .env de Git
├── vercel.json           # Configuración Vercel
└── README.md
```

---

## 🚀 Instalación Local

### Requisitos
- Node.js 16+
- API key de OpenRouter (gratuita)

### Pasos

1. **Clonar repositorio**
```bash
git clone https://github.com/RudyyVera/portfolio.git
cd portfolio
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Crear archivo .env**
```bash
cp .env.example .env
```

4. **Obtener API key gratuita**
   - Ve a https://openrouter.ai/keys
   - Regístrate (gratis)
   - Copia tu API key

5. **Editar .env**
```
OPENROUTER_API_KEY=sk-or-v1-tu_api_key_aqui
```

6. **Iniciar servidor**
```bash
npm start
```

7. **Abrir en navegador**
```
http://localhost:3000
```

---

## 📤 Desplegar en Vercel

### ✅ Vercel maneja todo automáticamente

1. **Push a GitHub**
```bash
git add .
git commit -m "Deploy to Vercel"
git push origin main
```

2. **Conectar con Vercel**
   - Ve a https://vercel.com
   - Haz clic "New Project"
   - Selecciona tu repositorio GitHub
   - Haz clic "Import"

3. **Configurar variables**
   - En Vercel → Settings → Environment Variables
   - Agrega: `OPENROUTER_API_KEY` = `tu_api_key`
   - Haz clic "Save"

4. **Deploy**
   - Presiona "Deploy"
   - ¡Listo! Tu sitio está en vivo

Tu URL será: `https://nombre-proyecto.vercel.app`

---

## 🔒 Seguridad

### Protección de API Keys
```
✅ Nunca se suben a GitHub (.gitignore)
✅ Almacenadas en Environment Variables
✅ Vercel las maneja de forma segura
✅ Solo accesibles en el servidor
```

### Rate Limiting
```
✅ Máximo 10 requests por minuto
✅ Máximo 1000 caracteres por mensaje
✅ Timeout 30 segundos
✅ Validación de entrada
```

---

## 📝 Configuración

### Variables de Entorno (.env)

```bash
# API key de OpenRouter (REQUERIDO)
OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxx

# URL de Vercel (automático en producción)
VERCEL_URL=https://mi-proyecto.vercel.app
```

### Personalizar RudIBot

En `frontend/script.js`:

```javascript
const config = {
  voiceLang: "es-ES",           // Idioma
  voiceRate: 0.95,              // Velocidad
  voicePitch: 1.2,              // Tono
  apiUrl: "/api/chat",          // Endpoint
  model: "deepseek/deepseek-r1-0528:free",
  historyLimit: 10              // Contexto
};
```

---

## 🤖 Cómo usar

### Chat
1. Escribe un mensaje o presiona 🎤
2. El bot responde en texto + voz
3. Máximo 10 mensajes/minuto (anti-spam)

### Conversación
- Pregunta sobre desarrollo web
- Pide ayuda con código
- Haz cualquier pregunta

---

## 🐛 Troubleshooting

| Problema | Solución |
|----------|----------|
| "API key not found" | Verifica .env o variables Vercel |
| "Timeout" | Conexión lenta, intenta de nuevo |
| "Bot no responde" | Revisa consola (F12) para errores |
| "Rate limit" | Espera 1 minuto, máximo 10/minuto |

---

## 📊 Monitoreo en Vercel

1. Dashboard → Tu proyecto
2. **Deployments** - Ver historial
3. **Analytics** - Tráfico y uso
4. **Logs** - Errores en tiempo real

---

## 📚 Recursos

- [OpenRouter API](https://openrouter.ai/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Web Speech API](https://developer.mozilla.org/es/docs/Web/API/Web_Speech_API)

---

## 👨‍💻 Autor

**Rudy Vera** - Desarrollador Web Full Stack

- GitHub: [@RudyyVera](https://github.com/RudyyVera)
- LinkedIn: [rudi-alonso-vera](https://www.linkedin.com/in/rudi-alonso-vera-2733a22b2/)
- Portafolio: [mi-portfolio.vercel.app](https://mi-portfolio.vercel.app)

---

## 📄 Licencia

MIT - Libre para usar y modificar

---

⭐ **Si te gusta el proyecto, dale una estrella en GitHub!**

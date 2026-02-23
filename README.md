# 🚀 Portfolio Interactivo con IA - Rudy Vera

Portfolio web moderno con chatbot inteligente, reconocimiento de voz y visualización 3D.

## ✨ Características

- **🤖 Chatbot con IA**: Integración con OpenRouter API (GPT-4o-mini) para conversaciones naturales
- **🎤 Reconocimiento de Voz**: Control por voz usando Web Speech API
- **🗣️ Síntesis de Voz**: Respuestas habladas del asistente
- **🌐 Multi-idioma**: Soporte para Español, Inglés y Portugués
- **📱 Responsive**: Diseño adaptable a móviles, tablets y desktop
- **🎨 Animaciones Suaves**: Transiciones y efectos visuales modernos
- **⚡ Rendimiento Optimizado**: Carga rápida y experiencia fluida

## 🛠️ Tecnologías Utilizadas

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Three.js para visualización 3D
- Web Speech API (reconocimiento y síntesis de voz)
- Diseño responsive con Flexbox y Grid

### Backend
- Node.js + Express
- OpenRouter API (modelos de IA)
- CORS para seguridad
- Variables de entorno con dotenv

## 📦 Instalación Local

1. **Clonar el repositorio**
```bash
git clone https://github.com/RudyyVera/portfolio-.git
cd portfolio-
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
# Crear archivo .env en la raíz del proyecto
OPENROUTER_API_KEY=tu_api_key_aqui
```

4. **Iniciar el servidor**
```bash
npm run dev
```

5. **Abrir en el navegador**
```
http://localhost:8787
```

## 🌐 Demo en Vivo

🔗 [Ver Portfolio en Vivo](https://portfolio-rudy-vera.vercel.app)

## 📂 Estructura del Proyecto

```
portfolio-/
├── frontend/           # Archivos del cliente
│   ├── index.html     # Página principal
│   ├── style.css      # Estilos principales
│   ├── script.js      # Lógica del chatbot
│   ├── animations.js  # Animaciones y efectos
│   ├── laptop3d.js    # Visualización 3D
│   └── translations.js # Sistema multi-idioma
├── backend/
│   └── server.js      # Servidor Express + API proxy
├── api/
│   └── chat.js        # Serverless function (Vercel)
├── .env.example       # Plantilla de variables de entorno
└── package.json       # Dependencias del proyecto
```

## 🔑 Configuración de API

El proyecto usa OpenRouter API para acceder a modelos de IA. Para obtener tu API key:

1. Regístrate en [OpenRouter.ai](https://openrouter.ai)
2. Genera una API key en tu dashboard
3. Agrégala al archivo `.env`

```env
OPENROUTER_API_KEY=sk-or-v1-xxx...
```

## 🚀 Deploy en Vercel

1. Hacer fork del repositorio
2. Conectar con Vercel
3. Agregar variables de entorno en Vercel Dashboard
4. Deploy automático

## 💡 Características Técnicas

- **Rate Limiting**: Control de peticiones para evitar abuso
- **Manejo de Errores**: Respuestas apropiadas ante fallos de API
- **Cache Control**: Deshabilitar caché para contenido dinámico
- **Seguridad**: API keys protegidas en variables de entorno
- **Optimización**: Código minificado y assets optimizados

## 📱 Compatibilidad

- ✅ Chrome/Edge (recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Dispositivos móviles iOS/Android

## 👨‍💻 Autor

**Rudy Vera**
- Desarrollador Web Full Stack
- Especializado en JavaScript, Node.js y tecnologías modernas
- 📧 Email: [tu-email@ejemplo.com]
- 💼 LinkedIn: [linkedin.com/in/rudyvera]
- 🐙 GitHub: [@RudyyVera](https://github.com/RudyyVera)

## 📄 Licencia

MIT License - Ver [LICENSE](LICENSE) para más detalles

## 🙏 Agradecimientos

- OpenRouter por el acceso a modelos de IA
- Three.js por la biblioteca 3D
- Comunidad open source

---

⭐ Si te gusta este proyecto, dale una estrella en GitHub!

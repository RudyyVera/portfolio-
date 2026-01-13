const chatButton = document.getElementById("chatBox");
const chatWindow = document.getElementById("chat");
const closeButton = document.getElementById("cerrar");
const messageInput = document.getElementById("texto");
const sendButton = document.getElementById("btn");
const messagesBox = document.getElementById("mensajes");
const inputsBox = document.getElementById("hola");

// IMPORTANTE: No incluyas OPENROUTER_API_KEY aquí. 
// La API key debe estar en variables de entorno del servidor (Vercel).
// El frontend llama a /api/chat (en Vercel) y el servidor usa la key de forma segura.

const config = {
  voiceLang: "es-ES",
  voiceRate: 0.95,
  voicePitch: 1.2,
  typeSpeed: 30,
  speakReplies: true,
  apiUrl: "/api/chat", // Funciona en localhost y Vercel
  model: "openai/gpt-4o-mini",
  historyLimit: 10,
};

let historyChat = [];

function createMicButton() {
  const btn = document.createElement("button");
  btn.id = "btnMicrofono";
  const icon = `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1v11"></path><rect x="8" y="4" width="8" height="12" rx="4"></rect><path d="M5 11v1a7 7 0 0 0 14 0v-1"></path><path d="M12 19v4"></path><path d="M8 23h8"></path></svg>`;
  btn.innerHTML = icon;
  btn.style.cssText = `background: linear-gradient(135deg, #60a5fa, #4ade80); color: #0c111f; border: none; padding: 10px 15px; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 16px; transition: all 0.3s; margin-right: 5px;`;
  inputsBox.insertBefore(btn, sendButton);
  return btn;
}

const micButton = createMicButton();

function setupMic() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    micButton.disabled = true;
    micButton.textContent = "No soportado";
    return null;
  }

  const rec = new SpeechRecognition();
  rec.lang = config.voiceLang;
  rec.continuous = false;
  rec.interimResults = false;

  rec.onstart = () => {
    micButton.textContent = "Escuchando...";
    micButton.style.background = "#ff6b6b";
  };

  rec.onresult = (e) => {
    let text = "";
    for (let i = e.resultIndex; i < e.results.length; i++) {
      text += e.results[i][0].transcript;
    }
    messageInput.value = text;
    micButton.innerHTML = `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1v11"></path><rect x="8" y="4" width="8" height="12" rx="4"></rect><path d="M5 11v1a7 7 0 0 0 14 0v-1"></path><path d="M12 19v4"></path><path d="M8 23h8"></path></svg>`;
    micButton.style.background = "linear-gradient(135deg, #60a5fa, #4ade80)";
  };

  rec.onerror = () => {
    micButton.innerHTML = `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1v11"></path><rect x="8" y="4" width="8" height="12" rx="4"></rect><path d="M5 11v1a7 7 0 0 0 14 0v-1"></path><path d="M12 19v4"></path><path d="M8 23h8"></path></svg>`;
    micButton.style.background = "linear-gradient(135deg, #60a5fa, #4ade80)";
  };

  micButton.onclick = () => {
    if (rec.running) {
      rec.abort();
    } else {
      messageInput.value = "";
      rec.start();
    }
  };

  return rec;
}

const mic = setupMic();

function openChat() {
  chatWindow.style.display = "flex";
  messageInput.focus();
  chatButton.classList.add("cerrar-modo");
}

function closeChat() {
  chatWindow.style.display = "none";
  chatButton.classList.remove("cerrar-modo");
}

function toggleChat() {
  const hidden = chatWindow.style.display === "none" || chatWindow.style.display === "";
  if (hidden) openChat();
  else closeChat();
}

chatButton.onclick = toggleChat;
closeButton.onclick = closeChat;

function addUserMessage(text) {
  const div = document.createElement("div");
  div.className = "mensajeUsuario";
  div.textContent = text;
  messagesBox.appendChild(div);
  messagesBox.scrollTop = messagesBox.scrollHeight;
}

function addBotMessage(text) {
  const div = document.createElement("div");
  div.className = "mensajeBot";
  div.style.color = "#60a5fa";
  messagesBox.appendChild(div);

  let i = 0;
  function type() {
    if (i < text.length) {
      div.textContent += text.charAt(i);
      i++;
      messagesBox.scrollTop = messagesBox.scrollHeight;
      setTimeout(type, config.typeSpeed);
    } else if (config.speakReplies) {
      speakText(text);
    }
  }

  type();
}

function speakText(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();

  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = config.voiceLang;
  utt.rate = config.voiceRate;
  utt.pitch = config.voicePitch;

  const voices = window.speechSynthesis.getVoices();
  const voice = voices.find(v => v.lang.startsWith("es") && /Google|fem|Female|Mujer/i.test(v.name))
    || voices.find(v => v.lang.startsWith("es"))
    || voices[0];
  if (voice) utt.voice = voice;

  window.speechSynthesis.speak(utt);
}

async function askBot(text) {
  try {
    historyChat.push({ role: "user", content: text });
    const shortHistory = historyChat.slice(-config.historyLimit);

    const res = await fetch(config.apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: config.model,
        messages: [
          { role: "system", content: "Eres RudIBot, sé breve y amable." },
          ...shortHistory,
          { role: "user", content: text }
        ]
      })
    });

    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content || data?.error?.message || "No pude responder";
    historyChat.push({ role: "assistant", content: reply });
    return reply;
  } catch (err) {
    return "Error de conexión: " + err.message;
  }
}

sendButton.onclick = async () => {
  const text = messageInput.value.trim();
  if (text === "") return;

  addUserMessage(text);
  messageInput.value = "";

  const loading = document.createElement("div");
  loading.className = "mensajeBot";
  loading.textContent = "respondiendo...";
  loading.style.fontStyle = "italic";
  loading.style.color = "#fbbf24";
  messagesBox.appendChild(loading);
  messagesBox.scrollTop = messagesBox.scrollHeight;

  const reply = await askBot(text);
  loading.remove();
  addBotMessage(reply);
};

messageInput.onkeypress = (e) => {
  if (e.key === "Enter") {
    sendButton.click();
  }
};

window.addEventListener("load", () => {
  setTimeout(() => {
    addBotMessage("Hola, soy RudIBot. ¿En qué te ayudo?");
  }, 100);
});

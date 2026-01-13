// ====== ELEMENTOS ======
const boton = document.getElementById("chatBox");
const chat = document.getElementById("chat");
const texto = document.getElementById("texto");
const enviar = document.getElementById("btn");
const respuesta = document.getElementById("mensajes");

respuesta.scrollTop = respuesta.scrollHeight; // bajar automaticamente


// ====== ABRIR / CERRAR CHAT ======
boton.onclick = () => {
  if (chat.style.display === "none" || chat.style.display === "") {
    chat.style.display = "flex";
  } else {
    chat.style.display = "none";
  }
};


// ====== RESPONDER usuario ======
function soyElUsuario(mensajeUsuario) {
  const divUsuario = document.createElement("div");
  divUsuario.className = "mensajeUsuario";
  divUsuario.innerText = mensajeUsuario;
  respuesta.appendChild(divUsuario);
  respuesta.scrollTop = respuesta.scrollHeight;
}


// ====== RESPONDER bot (efecto lento) ======
function responderLento(mensajeBot) {
  const divBot = document.createElement("div");
  divBot.className = "divBotMensaje";
  divBot.innerText = "escribiendo...";
  respuesta.appendChild(divBot);
  respuesta.scrollTop = respuesta.scrollHeight;

  setTimeout(() => {
    divBot.innerText = mensajeBot;
  }, 2000);
}


// ====== HABLAR CON PYTHON ======
async function preguntarAPython(mensaje) {
  const res = await fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: mensaje })
  });

  const data = await res.json();
  return data.reply;
}


// ====== ENVIAR MENSAJE ======
enviar.onclick = async () => {
  const mensaje = texto.value;
  if (mensaje.trim() === "") return;

  // mostrar mensaje del usuario
  soyElUsuario(mensaje);
  texto.value = "";

  // pedir respuesta a Python (Gemini)
  const respuestaBot = await preguntarAPython(mensaje);

  // mostrar respuesta del bot
  responderLento(respuestaBot);
};

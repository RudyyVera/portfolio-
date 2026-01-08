// ====== ELEMENTOS ======
const boton = document.getElementById("chatBox");
const chat = document.getElementById("chat");
const texto = document.getElementById("texto");
const enviar = document.getElementById("btn");
const respuesta = document.getElementById("mensajes");
const divUsuario = document.createElement("div"); // BORRAR
const divBot = document.createElement("div"); // BORRAR
respuesta.scrollTop = respuesta.scrollHeight; // bajar automaticamente




// ====== ABRIR / CERRAR CHAT ======
boton.onclick = () => {
  if (chat.style.display === "none" || chat.style.display === "") {
    chat.style.display = "flex"; // muestra el chat
  } else {
    chat.style.display = "none"; // oculta el chat
  }
};

// ====== RESPONDER usuario ======
function soyElUsuario(mensajeUsuario) {
  const divUsuario = document.createElement("div");
divUsuario.className = "mensajeUsuario";
divUsuario.innerText = mensajeUsuario;
respuesta.appendChild(divUsuario);
respuesta.scrollTop = respuesta.scrollHeight;
};

// ====== RESPONDER bot ======
function responderLento(mensajeBot) {
  const divBot = document.createElement("div");
  divBot.className = "divBotMensaje";
  divBot.innerText = "excribiendo..."; // mensaje temporal
  respuesta.appendChild(divBot);
  respuesta.scrollTop = respuesta.scrollHeight;
  setTimeout(() => {
    divBot.innerText = mensajeBot; // mensaje final
  }, 2000); // espera 2 segundos
};


// ====== ENVIAR MENSAJE ======
enviar.onclick = () => {
  const mensaje = texto.value.toLowerCase();
  const divUsuario = document.createElement("div");
  divUsuario.className = "mensajeUsuario";
  divUsuario.innerText = mensaje;
  respuesta.appendChild(divUsuario);

  if (mensaje.includes("hola")) {
    responderLento("¡Hola! ¿En qué puedo ayudarte?");
  } 
  else if (mensaje.includes("como estas")) {
    responderLento("¡Estoy bien, gracias por preguntar!");
  } 
  else {
    responderLento("Lo siento, no entiendo tu mensaje.");
  }

  texto.value = ""; // limpia el input
};

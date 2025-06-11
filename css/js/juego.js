const sets = [
  [
    { pregunta: "¿Qué científico desarrolló la teoría cuántica de campos?", opciones: ["Feynman", "Bohr", "Dirac"], correcta: 2 },
    { pregunta: "¿En qué año cayó el Imperio Romano de Occidente?", opciones: ["476 d.C.", "1492", "1453"], correcta: 0 },
    { pregunta: "¿Qué filósofo dijo 'Dios ha muerto'?", opciones: ["Hegel", "Nietzsche", "Kant"], correcta: 1 }
  ],
  [
    { pregunta: "¿Cuál es el logaritmo de 100 en base 10?", opciones: ["1", "2", "10"], correcta: 1 },
    { pregunta: "¿Qué escritor escribió '1984'?", opciones: ["Orwell", "Huxley", "Bradbury"], correcta: 0 },
    { pregunta: "¿Qué guerra comenzó en 1914?", opciones: ["Segunda Guerra Mundial", "Primera Guerra Mundial", "Guerra Fría"], correcta: 1 }
  ]
];

let setIndex = 0;
let questionIndex = 0;
let puntaje = 0;
let tiempo = 15;
let timer;
let nombre = "";

const contenedor = id => document.getElementById(id);

function iniciarJuego() {
  nombre = contenedor("nombreJugador").value.trim();
  if (!nombre) {
    alert("Por favor ingresa tu nombre.");
    return;
  }
  contenedor("inicio").style.display = "none";
  contenedor("juego").style.display = "block";
  contenedor("jugador").innerText = "Jugador: " + nombre;
  puntaje = 0;
  setIndex = Math.floor(Math.random() * sets.length);
  questionIndex = 0;
  mostrarPregunta();
}

function mostrarPregunta() {
  clearInterval(timer);
  tiempo = 15;
  contenedor("temporizador").innerText = "Tiempo: 15s";
  timer = setInterval(actualizarTemporizador, 1000);

  contenedor("puntaje").innerText = "Puntaje: " + puntaje;
  const preguntaActual = sets[setIndex][questionIndex];
  contenedor("question-container").innerHTML = `
    <h2>${preguntaActual.pregunta}</h2>
    ${preguntaActual.opciones.map((op, i) => `<button onclick="verificarRespuesta(${i})">${op}</button>`).join("")}
  `;
  contenedor("next-button").style.display = "none";
}

function actualizarTemporizador() {
  tiempo--;
  contenedor("temporizador").innerText = "Tiempo: " + tiempo + "s";
  if (tiempo <= 0) {
    clearInterval(timer);
    alert("¡Tiempo agotado!");
    siguientePregunta();
  }
}

function verificarRespuesta(indice) {
  clearInterval(timer);
  const correcta = sets[setIndex][questionIndex].correcta;
  if (indice === correcta) {
    puntaje += 10;
    alert("¡Correcto!");
  } else {
    alert("Incorrecto.");
  }
  contenedor("next-button").style.display = "inline-block";
}

document.getElementById("next-button").addEventListener("click", () => {
  siguientePregunta();
});

function siguientePregunta() {
  questionIndex++;
  if (questionIndex < sets[setIndex].length) {
    mostrarPregunta();
  } else {
    finalizarRonda();
  }
}

function finalizarRonda() {
  contenedor("juego").style.display = "none";
  contenedor("final").style.display = "block";
  contenedor("resultadoFinal").innerText = nombre + ", tu puntaje fue: " + puntaje;
}

function jugarOtraRonda() {
  contenedor("final").style.display = "none";
  contenedor("juego").style.display = "block";
  questionIndex = 0;
  setIndex = (setIndex + 1) % sets.length;
  mostrarPregunta();
}

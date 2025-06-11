const sets = [
  [
    { pregunta: "¿Cuál es la capital de Kazajistán?", opciones: ["Astaná", "Tashkent", "Bishkek"], correcta: 0 },
    { pregunta: "¿Quién propuso la teoría del Big Bang?", opciones: ["Einstein", "Lemaître", "Hawking"], correcta: 1 },
    { pregunta: "¿Qué elemento tiene el número atómico 92?", opciones: ["Uranio", "Plutonio", "Radio"], correcta: 0 }
  ],
  [
    { pregunta: "¿Cuál es la raíz cuadrada de 625?", opciones: ["20", "25", "30"], correcta: 1 },
    { pregunta: "¿Qué año ocurrió la Revolución Francesa?", opciones: ["1789", "1799", "1804"], correcta: 0 },
    { pregunta: "¿Qué filósofo escribió 'El ser y la nada'?", opciones: ["Heidegger", "Sartre", "Nietzsche"], correcta: 1 }
  ]
];

let setIndex = 0;
let questionIndex = 0;

const questionContainer = document.getElementById("question-container");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");

function mostrarPregunta() {
  const preguntaActual = sets[setIndex][questionIndex];
  questionContainer.innerHTML = `
    <h2>${preguntaActual.pregunta}</h2>
    ${preguntaActual.opciones.map((op, i) => `<button onclick="verificarRespuesta(${i})">${op}</button>`).join("")}
  `;
  nextButton.style.display = "none";
}

function verificarRespuesta(indice) {
  const correcta = sets[setIndex][questionIndex].correcta;
  if (indice === correcta) {
    nextButton.style.display = "inline-block";
  } else {
    alert("Incorrecto. Intenta otra vez.");
  }
}

nextButton.addEventListener("click", () => {
  questionIndex++;
  if (questionIndex < sets[setIndex].length) {
    mostrarPregunta();
  } else {
    restartButton.style.display = "inline-block";
    questionContainer.innerHTML = "<h2>¡Ronda terminada!</h2>";
    nextButton.style.display = "none";
  }
});

restartButton.addEventListener("click", () => {
  setIndex = (setIndex + 1) % sets.length;
  questionIndex = 0;
  restartButton.style.display = "none";
  mostrarPregunta();
});

window.onload = mostrarPregunta;

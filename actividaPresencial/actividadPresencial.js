let preguntas = [];
let preguntaActual = 0; //en que pregunta estamos
let puntaje = 0;

function iniciarTrivia() {
    fetch('https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple')
        .then(response => response.json())
        .then(data => {
            preguntas = data.results;
            mostrarPregunta();
        })
        .catch(error => {
            console.error('Error al cargar la trivia:', error);
        });
}

// correct_answer, incorrect_answers y question es cmo vienen en el JSON de la api
function mostrarPregunta() {
  const pregunta = preguntas[preguntaActual];

  document.getElementById('progreso').innerText =
  `Pregunta ${preguntaActual + 1} de ${preguntas.length}`;

  document.getElementById('pregunta').innerText = pregunta.question;

  const respuestaDiv = document.getElementById('respuesta');
  respuestaDiv.innerHTML = '';

  const respuestas = [...pregunta.incorrect_answers, pregunta.correct_answer];

  respuestas.sort(() => Math.random() - 0.5);

  respuestas.forEach(respuesta => {
    const boton = document.createElement('button');
    boton.innerText = respuesta;
    boton.className = 'btn btn-outline-primary m-2';
    boton.onclick = () => seleccionarRespuesta(respuesta);
    respuestaDiv.appendChild(boton);
  });

  document.getElementById('next-button').disabled = true;

}

function seleccionarRespuesta(respuestaSeleccionada) {
  const pregunta = preguntas[preguntaActual];
  const botones = document.querySelectorAll('#respuesta button');

    botones.forEach(boton => {
    boton.disabled = true;

    // Pintar la respuesta correcta
    if (boton.innerHTML === pregunta.correct_answer) {
      boton.classList.remove('btn-outline-primary');
      boton.classList.add('btn-success');
    }

    // Pintar la incorrecta seleccionada
    if (
      boton.innerHTML === respuestaSeleccionada &&
      respuestaSeleccionada !== pregunta.correct_answer
    ) {
      boton.classList.remove('btn-outline-primary');
      boton.classList.add('btn-danger');
    }
  });

  if (respuestaSeleccionada === pregunta.correct_answer) {
    puntaje++;
    document.getElementById('score').innerText = puntaje;
    alert('¡Respuesta correcta!');
  } else {
    alert(`Respuesta incorrecta. La respuesta correcta era: ${pregunta.correct_answer}`);
  }

  document.getElementById('next-button').disabled = false;

}document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('next-button').addEventListener('click', () => { 
  preguntaActual++;

  if (preguntaActual < preguntas.length) {
    mostrarPregunta();
  } else {
    document.getElementById('trivia-container').innerHTML = 
    `<h2 class="text-center">Trivia finalizada.<br>Tu puntaje es: ${puntaje} de ${preguntas.length}</h2>`;
    }
  });
});


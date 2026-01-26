let preguntas = [];
let preguntaActual = 0; //en que pregunta estamos
let puntaje = 0;

let tiempo = 20;
let intervalo = null;
let htmlInicial = '';

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
  
  const porcentaje = ((preguntaActual + 1) / preguntas.length) * 100;
  document.getElementById('progress-bar').style.width = `${porcentaje}%`;

  document.getElementById('pregunta').innerText = decodificarHTML(pregunta.question);

  const respuestaDiv = document.getElementById('respuesta');
  respuestaDiv.innerHTML = '';

  const respuestas = [...pregunta.incorrect_answers, pregunta.correct_answer];

  respuestas.sort(() => Math.random() - 0.5);

  respuestas.forEach(respuesta => {
    const boton = document.createElement('button');
    boton.innerText = decodificarHTML(respuesta);
    boton.className = 'btn btn-outline-primary m-2';
    boton.onclick = () => seleccionarRespuesta(respuesta);
    respuestaDiv.appendChild(boton);
  });

  document.getElementById('next-button').disabled = true;

  iniciarTemporizador();

}

function iniciarTemporizador() {
  clearInterval(intervalo);
  tiempo = 20;
  document.getElementById('contador').innerText = tiempo;

  intervalo = setInterval(() => {
    tiempo--;
    document.getElementById('contador').innerText = tiempo;
    if (tiempo === 0) {
      clearInterval(intervalo);
      tiempoAgotado();
    }
  }, 1000);
}

function tiempoAgotado() {
  const pregunta = preguntas[preguntaActual];
  const botones = document.querySelectorAll('#respuesta button');

  botones.forEach(boton => {
    boton.disabled = true;

    if (boton.innerHTML === decodificarHTML(pregunta.correct_answer)) {
      boton.classList.remove('btn-outline-primary');
      boton.classList.add('btn-success');
    }
  });

  document.getElementById('next-button').disabled = false;
}

function seleccionarRespuesta(respuestaSeleccionada) {
  clearInterval(intervalo);
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
    alert(`Respuesta incorrecta. La respuesta correcta era: ${decodificarHTML(pregunta.correct_answer)}`);
  }

  document.getElementById('next-button').disabled = false;

}

document.addEventListener('DOMContentLoaded', () => {
  htmlInicial = document.getElementById('trivia-container').innerHTML;

  document.getElementById('next-button').addEventListener('click', () => { 
  preguntaActual++;

  if (preguntaActual < preguntas.length) {
    mostrarPregunta();
  } else {
    clearInterval(intervalo);
    mostrarPantallaFinal();
    }
  });
});

function decodificarHTML(texto) { // con esto &quot; o &#039; se convierten en " o '
  const textarea = document.createElement('textarea');
  textarea.innerHTML = texto;
  return textarea.value;
}

function mostrarPantallaFinal() {
  const porcentaje = Math.round((puntaje / preguntas.length) * 100);

  let mensaje = '¡Buen intento!';

  if (porcentaje >= 80) mensaje = '¡Excelente!';
  else if (porcentaje >= 50) mensaje = '¡Muy bien!';

  document.getElementById('trivia-container').innerHTML = `
    <h2 class="text-center mb-3">${mensaje}</h2>

    <p class="text-center fs-5">
      Respondiste correctamente <strong>${puntaje}</strong> de 
      <strong>${preguntas.length}</strong> preguntas
    </p>

    <p class="text-center fs-4">
      Puntaje final: <strong>${porcentaje}%</strong>
    </p>

    <div class="text-center mt-4">
      <button class="btn btn-success btn-lg" onclick="reiniciarTrivia()">
        🔄 Reiniciar Trivia
      </button>
    </div>
  `;
}

function reiniciarTrivia() {
  document.getElementById('trivia-container').innerHTML = htmlInicial;
  preguntaActual = 0;
  puntaje = 0;

  document.getElementById('score').innerText = 0;
  iniciarTrivia();
}
let questions = [];
let currentIndex = 0;
const cardContainer = document.getElementById('cardContainer');
const contador = document.getElementById('contador');

    function mostrarCartas(index) {
      if(index < questions.length){
        actualizarContador(index);
        cardContainer.innerHTML = `
        <div class="contador" id="contador">Pregunta ${index + 1} de ${questions.length}</div>
          <div class="card">${questions[index]}</div>
        `;
          } else {
          mostrarBotonResultado();
      }
    }
    function actualizarContador(index) {
      contador.textContent = `Pregunta ${index + 1} de ${questions.length}`;
    }

    function nextCard(isTrue) {
      const preguntaActual = questions[currentIndex];

    if (preguntaActual) {
      const clave = isTrue ? 'deAcuerdo' : 'noDeAcuerdo';
      const respuestas = JSON.parse(localStorage.getItem(clave)) || [];
      respuestas.push(preguntaActual);
      localStorage.setItem(clave, JSON.stringify(respuestas));
    }

      currentIndex++;
      mostrarCartas(currentIndex);
    }

    function mezclarCartas() {
      questions.sort(() => Math.random() - 0.5);
      currentIndex = 0;
      localStorage.setItem('deAcuerdo', JSON.stringify([]));
      localStorage.setItem('noDeAcuerdo', JSON.stringify([]));
      mostrarCartas(currentIndex);
    }

function mostrarBotonResultado() {
  contador.textContent = "¡Completaste todas las preguntas!";
  cardContainer.innerHTML = `
    <div class="card">Has terminado la baraja.</div>
    <button class="resultado-button" onclick="window.location.href='resultado.html'" style="margin-top: 20px;">
      Ver resultados
    </button>
  `;
  document.querySelectorAll('.ok-button').forEach(btn => {
    btn.style.display = 'none';
  });
  document.querySelectorAll('.no-button').forEach(btn => {
    btn.style.display = 'none';
  });
}

    fetch('data/preguntas.json')
  .then(response => response.json())
  .then(data => {
    // Aplanar todas las categorías en una sola lista
    questions = Object.values(data).flat();
    mezclarCartas();
  })
  .catch(error => {
    console.error('Error al cargar preguntas:', error);
    cardContainer.innerHTML = '<div class="card">Error al cargar preguntas.</div>';
  });

  //function cambiarCarta() {
  //alert('Función para cambiar la carta aún no implementada.');
  //}
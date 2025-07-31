let questions = [];
let currentIndex = 0;
const cardContainer = document.getElementById('cardContainer');

    function mostrarCartas(index) {
      if(index < questions.length){
        cardContainer.innerHTML = `
          <div class="card">${questions[index]}</div>
        `;
          } else {
          mostrarResultados();
      }
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

function mostrarResultados() {
  const deAcuerdo = JSON.parse(localStorage.getItem('deAcuerdo')) || [];
  const noDeAcuerdo = JSON.parse(localStorage.getItem('noDeAcuerdo')) || [];

  cardContainer.innerHTML = `
    <div class="card">
      <h3>Resultados:</h3>
      <strong>De acuerdo con:</strong>
      <ul>${deAcuerdo.map(p => `<li>${p}</li>`).join('')}</ul>
      <strong>No de acuerdo con:</strong>
      <ul>${noDeAcuerdo.map(p => `<li>${p}</li>`).join('')}</ul>
    </div>
  `;
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
    window.onload = function() {
    const deAcuerdo = JSON.parse(localStorage.getItem('deAcuerdo')) || [];
    const noDeAcuerdo = JSON.parse(localStorage.getItem('noDeAcuerdo')) || [];

    const deAcuerdoList = document.getElementById('deAcuerdoList');
    const noDeAcuerdoList = document.getElementById('noDeAcuerdoList');

    deAcuerdo.forEach(p => {
      const li = document.createElement('li');
      li.textContent = p;
      deAcuerdoList.appendChild(li);
    });

    noDeAcuerdo.forEach(p => {
      const li = document.createElement('li');
      li.textContent = p;
      noDeAcuerdoList.appendChild(li);
    });
  };

    function reiniciar() {
      localStorage.removeItem('deAcuerdo');
      localStorage.removeItem('noDeAcuerdo');
      window.location.href = 'inicioApp.html';
    }

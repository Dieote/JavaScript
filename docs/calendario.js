const calendar = {
  currentYear: new Date().getFullYear(),
  currentMonth: new Date().getMonth(),
  monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ],
  vistaAnual: false,

  init() {
    document.getElementById('prevYear').addEventListener('click', () => this.prevYear());
    document.getElementById('nextYear').addEventListener('click', () => this.nextYear());
    document.getElementById('prevMonth').addEventListener('click', () => this.prevMonth());
    document.getElementById('nextMonth').addEventListener('click', () => this.nextMonth());
    document.getElementById('irAHoy').addEventListener('click', () => this.irAHoy());
    document.getElementById('toggleVista').addEventListener('click', () => this.toggleVista());
    document.getElementById('buscarSemana').addEventListener('click', () => this.buscarSemana());

    const toggleLeyenda = document.getElementById('toggleLeyenda');
    if (toggleLeyenda) {
      toggleLeyenda.addEventListener('click', () => this.toggleLeyenda());
    }

    this.generateCalendar();
  },

  toggleLeyenda() {
    const content = document.getElementById('leyendaContent');
    const btn = document.getElementById('toggleLeyenda');
    if (content && btn) {
      const visible = content.style.display !== 'none';
      content.style.display = visible ? 'none' : 'block';
      btn.textContent = visible ? 'Mostrar' : 'Ocultar';
    }
  },

  toggleVista() {
    this.vistaAnual = !this.vistaAnual;
    document.getElementById('toggleVista').textContent =
      this.vistaAnual ? 'Vista Mensual' : 'Vista Anual';

    const prevMonth = document.getElementById('prevMonth');
    const nextMonth = document.getElementById('nextMonth');
    prevMonth.style.display = this.vistaAnual ? 'none' : 'inline-block';
    nextMonth.style.display = this.vistaAnual ? 'none' : 'inline-block';

    this.generateCalendar();
  },

  generateCalendar() {
    this.vistaAnual
      ? this.generateCalendarioAnual()
      : this.generateCalendarioMensual();
  },

  //  aplica el estado a una celda 
  // Centralizar aquí evita duplicar el switch en las dos vistas.
  aplicarEstado(cell, fecha, mes) {
    if (typeof obtenerEstadoDia !== 'function') return;

    const estado = obtenerEstadoDia(fecha);
    if (!estado) return;

    // Limpiar clases de estado previas sin tocar 'today'
    const clases = Array.from(cell.classList).filter(c => !c.startsWith('estado-'));
    cell.className = clases.join(' ');

    const mapaClases = {
      TRABAJADO: 'estado-trabajado',
      VACACIONES: 'estado-vacaciones',
      LIBRE: 'estado-libre',
      FESTIVO: 'estado-festivo',
      PUENTE: 'estado-puente',
      DESCONOCIDO: 'estado-desconocido'
    };

    const clase = mapaClases[estado];
    if (clase) cell.classList.add(clase);

    if (this.esHoy(fecha.getDate(), fecha.getMonth(), fecha.getFullYear())) {
      cell.classList.add('today');
    }
  },

  generateCalendarioMensual() {
    const calendarBody = document.getElementById('calendarBody');
    calendarBody.innerHTML = '';
    document.getElementById('monthYear').textContent =
      `${this.monthNames[this.currentMonth]} ${this.currentYear}`;

    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    let date = new Date(firstDay);
    date.setDate(date.getDate() - ((date.getDay() + 6) % 7));

    while (date <= lastDay || date.getDay() !== 1) {
      const row = document.createElement('tr');

      const weekCell = document.createElement('td');
      weekCell.classList.add('week-number');
      weekCell.textContent = this.getSemanaNumero(date);
      row.appendChild(weekCell);

      for (let i = 0; i < 7; i++) {
        const cell = document.createElement('td');

        if (date.getMonth() === this.currentMonth && date.getFullYear() === this.currentYear) {
          cell.textContent = date.getDate();

          if (this.esHoy(date.getDate(), this.currentMonth, this.currentYear)) {
            cell.classList.add('today');
          }

          // Usar la fecha completa para consultar el mapa
          this.aplicarEstado(cell, new Date(date), this.currentMonth);
        }

        row.appendChild(cell);
        date.setDate(date.getDate() + 1);
      }

      calendarBody.appendChild(row);
    }
  },

  generateCalendarioAnual() {
    const calendarBody = document.getElementById('calendarBody');
    calendarBody.innerHTML = '';
    document.getElementById('monthYear').textContent = `Año ${this.currentYear}`;

    for (let mes = 0; mes < 12; mes++) {
      const titleRow = document.createElement('tr');
      titleRow.classList.add('month-title-row');
      const titleCell = document.createElement('td');
      titleCell.colSpan = 8;
      titleCell.classList.add('month-title');
      titleCell.textContent = this.monthNames[mes];
      titleRow.appendChild(titleCell);
      calendarBody.appendChild(titleRow);

      const firstDay = new Date(this.currentYear, mes, 1);
      const lastDay = new Date(this.currentYear, mes + 1, 0);
      let date = new Date(firstDay);
      date.setDate(date.getDate() - ((date.getDay() + 6) % 7));

      while (date <= lastDay || date.getDay() !== 1) {
        const row = document.createElement('tr');

        const weekCell = document.createElement('td');
        weekCell.classList.add('week-number');
        weekCell.textContent = this.getSemanaNumero(date);
        row.appendChild(weekCell);

        for (let i = 0; i < 7; i++) {
          const cell = document.createElement('td');

          if (date.getMonth() === mes && date.getFullYear() === this.currentYear) {
            cell.textContent = date.getDate();

            if (this.esHoy(date.getDate(), mes, this.currentYear)) {
              cell.classList.add('today');
            }

            this.aplicarEstado(cell, new Date(date), mes);
          }

          row.appendChild(cell);
          date.setDate(date.getDate() + 1);
        }

        calendarBody.appendChild(row);
      }

      if (mes < 11) {
        const spacerRow = document.createElement('tr');
        spacerRow.classList.add('month-spacer');
        const spacerCell = document.createElement('td');
        spacerCell.colSpan = 8;
        spacerCell.innerHTML = '&nbsp;';
        spacerRow.appendChild(spacerCell);
        calendarBody.appendChild(spacerRow);
      }
    }
  },

  //semana ISO-8601 
  getSemanaNumero(date) {
    const tmp = new Date(date.getTime());
    tmp.setHours(0, 0, 0, 0);
    tmp.setDate(tmp.getDate() + 4 - (tmp.getDay() || 7));
    const yearStart = new Date(tmp.getFullYear(), 0, 1);
    return Math.ceil((((tmp - yearStart) / 86400000) + 1) / 7);
  },

  prevMonth() {
    if (this.currentMonth === 0) { this.currentMonth = 11; this.currentYear--; }
    else { this.currentMonth--; }
    this.generateCalendar();
  },

  nextMonth() {
    if (this.currentMonth === 11) { this.currentMonth = 0; this.currentYear++; }
    else { this.currentMonth++; }
    this.generateCalendar();
  },

  prevYear() { this.currentYear--; this.generateCalendar(); },
  nextYear() { this.currentYear++; this.generateCalendar(); },

  irAHoy() {
    const today = new Date();
    this.currentYear = today.getFullYear();
    this.currentMonth = today.getMonth();
    this.generateCalendar();
  },

  esHoy(day, month, year) {
    const today = new Date();
    return day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();
  },

  // Buscar semana 
  buscarSemana() {
    const weekNumber = parseInt(prompt('Ingrese el Nº de semana (1-53):'), 10);
    if (!weekNumber || weekNumber < 1 || weekNumber > 53) {
      alert('Por favor ingrese un número de semana válido (1-53)');
      return;
    }

    let date = new Date(this.currentYear, 0, 1);
    let encontrado = false;

    while (date.getFullYear() === this.currentYear && !encontrado) {
      if (this.getSemanaNumero(date) === weekNumber) {
        encontrado = true;
        this.currentMonth = date.getMonth();
      }
      date.setDate(date.getDate() + 1);
    }

    if (encontrado) {
      this.vistaAnual = false;
      document.getElementById('toggleVista').textContent = 'Vista Anual';
      document.getElementById('prevMonth').style.display = 'inline-block';
      document.getElementById('nextMonth').style.display = 'inline-block';
      this.generateCalendar();
    } else {
      alert(`No se encontró la semana ${weekNumber} en el año ${this.currentYear}`);
    }
  }
};

calendar.init();

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface Week {
  number: number;
  days: (number | null)[];
}

@Component({
  selector: 'app-calendario',
  imports: [CommonModule],
  templateUrl: './appCalendario.html',
  styleUrls: ['./appCalendario.css']
})
export class AppCalendario implements OnInit {
  showCalendar = false;
  currentYear: number = new Date().getFullYear();
  currentMonth: number = new Date().getMonth()
  weeks: Week[] = [];

  monthNames = [
    'Enero','Febrero','Marzo','Abril','Mayo','Junio',
    'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
  ];

  ngOnInit() {
    this.generateCalendar(this.currentYear, this.currentMonth);
  }

  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
  }

  generateCalendar(year: number, month: number) {
    this.weeks = [];
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    let date = new Date(firstDay);

    // Ajustar al lunes anterior al primer día
    date.setDate(date.getDate() - ((date.getDay() + 6) % 7));

    while (date <= lastDay || (date.getDay() !== 1)) {
      let week: Week = { number: this.getWeekNumber(date), days: Array(7).fill(null) };
          for (let i = 0; i < 7; i++) {
        if (date.getMonth() === month && date.getFullYear() === year) {
          week.days[i] = date.getDate();
        }
        date.setDate(date.getDate() + 1);
      }
      this.weeks.push(week);
    }
  }

  getWeekNumber(date: Date): number {
    const tempDate = new Date(date.getTime());
    tempDate.setHours(0, 0, 0, 0);
    tempDate.setDate(tempDate.getDate() + 4 - (tempDate.getDay() || 7));
    const yearStart = new Date(tempDate.getFullYear(), 0, 1);
    return Math.ceil((((tempDate.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  }

  prevMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar(this.currentYear, this.currentMonth);
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar(this.currentYear, this.currentMonth);
  }

  prevYear() {
    this.currentYear--;
    this.generateCalendar(this.currentYear, this.currentMonth);
  }

  nextYear() {
    this.currentYear++;
    this.generateCalendar(this.currentYear, this.currentMonth);
  }

  goToday() {
    const today = new Date();
    this.currentYear = today.getFullYear();
    this.currentMonth = today.getMonth();
    this.generateCalendar(this.currentYear, this.currentMonth);
  }

  isToday(day: number | null): boolean {
    if (!day) return false;
    const today = new Date();
    return (
      day === today.getDate() &&
      this.currentMonth === today.getMonth() &&
      this.currentYear === today.getFullYear()
    );
  }

  searchByWeek() {
    const weekNumber = prompt('Ingrese el Nº de semana:');
    if (!weekNumber) return;
    const targetWeek = parseInt(weekNumber, 10);

    let date = new Date(this.currentYear, 0, 1);
    while (this.getWeekNumber(date) !== targetWeek && date.getFullYear() === this.currentYear) {
      date.setDate(date.getDate() + 1);
    }

    this.currentYear = date.getFullYear();
    this.currentMonth = date.getMonth();
    this.generateCalendar(this.currentYear, this.currentMonth);
  }
}

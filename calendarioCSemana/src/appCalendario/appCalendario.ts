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
  weeks: Week[] = [];

  ngOnInit() {
    this.generateCalendar(2025);
  }

  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
  }

  generateCalendar(year: number) {
    const date = new Date(year, 0, 1);
    let week: Week = { number: this.getWeekNumber(date), days: Array(7).fill(null) };

    while (date.getFullYear() === year) {
      const dayOfWeek = (date.getDay() + 6) % 7; // lunes=0 ... domingo=6
      week.days[dayOfWeek] = date.getDate();

      if (dayOfWeek === 6 || date.getDate() === 31 && date.getMonth() === 11) {
        this.weeks.push(week);
        const nextDate = new Date(date);
        nextDate.setDate(date.getDate() + 1);
        week = { number: this.getWeekNumber(nextDate), days: Array(7).fill(null) };
      }

      date.setDate(date.getDate() + 1);
    }
  }

  getWeekNumber(date: Date): number {
    const tempDate = new Date(date.getTime());
    tempDate.setHours(0, 0, 0, 0);
    tempDate.setDate(tempDate.getDate() + 4 - (tempDate.getDay() || 7));
    const yearStart = new Date(tempDate.getFullYear(), 0, 1);
    const weekNo = Math.ceil((((tempDate.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return weekNo;
  }
}

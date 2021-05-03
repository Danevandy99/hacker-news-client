import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  darkMode = false;

  constructor() {
    this.darkMode = !!JSON.parse(localStorage.getItem('darkMode'));
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    localStorage.setItem('darkMode', JSON.stringify(this.darkMode));
  }
}

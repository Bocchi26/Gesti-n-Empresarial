import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navegador',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './navegador.component.html',
  styleUrl: './navegador.component.css'
})
export class NavegadorComponent {
  submenuAbierto: boolean = false;

  toggleSubmenu() {
    this.submenuAbierto = !this.submenuAbierto;
  }
}

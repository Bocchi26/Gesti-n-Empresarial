import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navegador',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './navegador.component.html',
  styleUrl: './navegador.component.css'
})
export class NavegadorComponent implements OnInit {

  public rolUsuario: string | null = null; // Cambiado a string | null para evitar errores de tipo
  submenuAbierto: boolean = false;
  
  ngOnInit() {
    this.rolUsuario = localStorage.getItem('userRole');
    console.log('Rol del usuario:', this.rolUsuario); // Verifica el rol del usuario
  }

  toggleSubmenu() {
    this.submenuAbierto = !this.submenuAbierto;
  }
  cerrarSesion() {
    localStorage.clear(); // Limpia el localStorage
    window.location.href = '/'; // Redirige al AppComponent
  }
}

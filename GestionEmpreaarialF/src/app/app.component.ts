import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavegadorComponent } from "./navegador/navegador.component";
import { CommonModule } from '@angular/common';
import { LoginComponent } from "./componentes/login/login.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavegadorComponent, CommonModule, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isLoggedIn = false;

  ngOnInit() {
    this.isLoggedIn = !!localStorage.getItem('userRole');
  }

  // Método que llamas desde LoginComponent al autenticarte
  onLoginSuccess() {
    this.isLoggedIn = true;
  }
}

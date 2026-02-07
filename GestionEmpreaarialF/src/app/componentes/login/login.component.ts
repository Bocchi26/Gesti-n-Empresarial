import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  @Output() loginSuccess = new EventEmitter<void>();
  
  id_usuario: number ;
  contrasena: string = '';
  error: string | null = null;
  showModal: boolean = false;
  isLoginSuccessful = false; // Variable para controlar el estado del login
   // Variable para controlar la visibilidad del modal

  constructor(private http: HttpClient) {}

  onLogin() {
    console.log('Formulario enviado');  // Verifica si esta línea se imprime al hacer submit
  
    if (!this.id_usuario || !this.contrasena) {
      this.error = 'Por favor, completa ambos campos';
      return;
    }
  
    const datosLogin = {
      idUsuario: this.id_usuario,
      contrasena: this.contrasena
    };
  
    console.log('Enviando al backend:', datosLogin); // Verifica que los datos son correctos
  
    this.http.post('http://localhost:8080/usuario/login', datosLogin, { responseType: 'text' })
      .subscribe({
        next: (res: string) => {
          console.log('Respuesta del backend:', res);  // Verifica qué respuesta devuelve el backend
          if (res === 'admin' || res === 'empleado') {
            localStorage.setItem('userRole', res)
            localStorage.setItem('userId', this.id_usuario.toString())
            this.isLoginSuccessful = true; // Cambia el estado del login a exitoso
            this.showModal=true // Guardar el id del usuario en el localStorage
              // Emitir evento al componente padre
          } else {
            this.showModal=true; // Si la respuesta no es 'Administrador' ni 'EmpleadoInventario', muestra lo que devuelva el backend
          }
        },
        error: (err: any) => { // Verifica si hay errores
          alert('Error al iniciar sesión');
        }
      });
  }
  closeModal(){
    this.showModal=false // Cerrar el modal
    if(this.isLoginSuccessful) {
    this.loginSuccess.emit();
  }
  }

}

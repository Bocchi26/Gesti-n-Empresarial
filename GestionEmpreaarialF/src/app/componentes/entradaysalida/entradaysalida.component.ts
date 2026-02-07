import { Component, OnInit } from '@angular/core';
import { EntradassalidasService } from '../../servicios/entradassalidas/entradassalidas.service';
import { Salidas } from '../../entidades/entradas/salidas';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-entradaysalida',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './entradaysalida.component.html',
  styleUrl: './entradaysalida.component.css'
})
export class EntradaysalidaComponent implements OnInit {

  mv=false;
  fechaInvalida: boolean = true;
  nombre: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';
  movimientos: Salidas[] = [];
  mensajeError: string = '';

  constructor(private entradaSalidaService: EntradassalidasService) {}

  ngOnInit(): void {
    this.crearpuntoventa();
  }

  crearpuntoventa(): void {
    this.entradaSalidaService.crearpuntoventa().subscribe({
      next: (data) => {
        console.log('Punto de venta creado:', data);
        this.cargarUltimosMovimientos();
      },
      error: (err) => {
        console.error('Error al crear el punto de venta:', err);
      }
    });
  }

  cargarUltimosMovimientos(): void {
    this.entradaSalidaService.obtenerUltimos().subscribe({
      next: (data) => {
        this.movimientos = data;
        this.mensajeError = '';
      },
      error: (err) => {
        this.mensajeError = 'Error al cargar los últimos movimientos.';
      }
    });
  }

  filtrarMovimientos(): void {
    if(this.fechaInvalida === false ) {
      alert("Fechas Invalidas");}
      else{
    this.entradaSalidaService.filtrar(this.nombre, this.fechaInicio, this.fechaFin).subscribe({
      next: (data) => {
        if (!data || data.length === 0) {
          this.movimientos = [];
          this.mensajeError = 'No se encontraron registros para los parámetros ingresados';
          alert(this.mensajeError);
        } else {
          this.movimientos = data;
          this.mensajeError = '';
        }
      },
      error: (err) => {
        this.movimientos = [];
        this.mensajeError = 'Error al consultar los movimientos. Intente de nuevo.';
        alert(this.mensajeError);
      }
  
});
}
}
validarFechas() {
  if (this.fechaInicio && this.fechaFin) {
    this.fechaInvalida = new Date(this.fechaFin) > new Date(this.fechaInicio);
    console.log(this.fechaInvalida);
  } else {
    this.fechaInvalida = false;
    this.mv = true;
  }
}
}

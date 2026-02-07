import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Producto } from '../../entidades/producto/producto';
import { ProductosService } from '../../servicios/productos/productos.service';
import { forkJoin } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { EntradassalidasService } from '../../servicios/entradassalidas/entradassalidas.service';

@Component({
  selector: 'app-registrar-salida',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './registrar-salida.component.html',
  styleUrl: './registrar-salida.component.css'
})
export class RegistrarSalidaComponent implements OnInit {
   productos: any[] = [];
   idProductoSeleccionado: number = 0;
   mostrarModalSalida: boolean = false;
   cantidadRetirar: number ;
   motivoSalida: string = '';
  
    constructor(private entradasalidas:EntradassalidasService, private ProductoServicio:ProductosService ) { }
  
    ngOnInit(): void {
      this.listacompleta();
    }
  
    listacompleta() {
      forkJoin([
        this.ProductoServicio.getProductos(),
        this.ProductoServicio.getCantidadEnCamino()
      ]).subscribe(([productos, cantidad]) => {
        this.productos = productos.map((producto: any) => ({
          ...producto,
          cantidadEnCamino: cantidad.find((item: any) => item.idProducto === producto.idProducto)?.cantidadEnCamino || 0
        }));
      });
    }

    selectProduct(producto: Producto) {
      this.idProductoSeleccionado = producto.idProducto;
      console.log('Producto seleccionado:', producto);
      this.mostrarModalSalida = true;
    }

    cerrarModalSalida() {
      this.mostrarModalSalida = false;
      this.cantidadRetirar = 0;
      this.motivoSalida = '';
    }

    registrarSalida() {

      const idUser=localStorage.getItem('userId');
      console.log('ID de usuario:', idUser);

      if (this.cantidadRetirar > 0 && this.motivoSalida.trim() !== '') {
        const producto = this.productos.find(p => p.idProducto === this.idProductoSeleccionado);
        if (producto) {
          const cantidadRestante = producto.stock - this.cantidadRetirar;
          if (cantidadRestante >= 0) {
            producto.cantidad = cantidadRestante;
            this.entradasalidas.registrarSalida(this.idProductoSeleccionado, this.cantidadRetirar, this.motivoSalida, idUser).subscribe((data) => {
              if(data){
              console.log('Salida registrada correctamente');
              alert('Salida registrada correctamente');
              this.listacompleta();
              this.cerrarModalSalida();}
              else{
                alert('Error al registrar la salida. Por favor, inténtelo de nuevo.');
              }
            });
          } else {
            alert('No hay suficiente cantidad para retirar.');
          }
        }
      } else {
        alert('Por favor, ingrese una cantidad válida y un motivo de salida.');
      }
    }
}

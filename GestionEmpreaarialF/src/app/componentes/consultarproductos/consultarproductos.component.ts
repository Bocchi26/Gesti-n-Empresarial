import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../entidades/producto/producto';
import { ProductosService } from '../../servicios/productos/productos.service';
import { Salidas } from '../../entidades/entradas/salidas';
import { EntradassalidasService } from '../../servicios/entradassalidas/entradassalidas.service';

@Component({
  selector: 'app-consultarproductos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consultarproductos.component.html',
  styleUrls: ['./consultarproductos.component.css']
})
export class ConsultarproductosComponent implements OnInit{

  movimientos: Salidas[] = [];
  pb = false
  
  productos: Producto[] = [];
  nombre: string = '';
  tipo: string = '';
  estado: string = '';

  producto: Producto ;

  mostrarModal: boolean = false;

  constructor(private productoService: ProductosService, private entradaSalidaService: EntradassalidasService) {}

  ngOnInit(): void {
  }

  // Método para obtener productos con los filtros
  obtenerProductos(): void {
    this.productoService.buscarProductos(this.nombre, this.tipo, this.estado)
      .subscribe((data: Producto[]) => {

        if(data !== null){
          this.pb=true
          this.productos = data;
          this.producto = data[0];
        }else{
          alert("Error al relazar la consulta, porfavor reintente de nuevo");
        }
         // Asignar el primer producto a la variable producto
      }, (error) => {
        console.error('Error al obtener los productos', error);
      });
  }

  // Método para aplicar filtros
  aplicarFiltros(): void {
    this.obtenerProductos();  // Vuelve a cargar los productos con los filtros aplicados
  }

  // Método para abrir el modal de edición
  abrirModal(producto: Producto) {

    this.entradaSalidaService.traermovproducto(producto).subscribe({
      next: (data) => {
        if(data.length === 0) {
          console.log("No hay movimientos para este producto.");
          this.movimientos = []; // Asignar un array vacío si no hay movimientos
        }
        else {
        this.movimientos = data;
        console.log('Movimientos del producto:', this.movimientos);}
        
        }});
        this.producto = producto;
        console.log(this.producto);
        this.mostrarModal = true;
        console.log("modal abierto",this.mostrarModal);
  }

  // Método para cerrar el modal de edición
  cerrarModal(): void {
    this.mostrarModal = false;
    this.movimientos = [] // Reiniciar el producto al cerrar el modal
  }

}



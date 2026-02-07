import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../servicios/productos/productos.service';
import { Producto } from '../../entidades/producto/producto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { catchError, forkJoin } from 'rxjs';
import { PedidosService } from '../../servicios/pedidos/pedidos.service';

@Component({
  selector: 'app-gestiondeinventario',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './gestiondeinventario.component.html',
  styleUrl: './gestiondeinventario.component.css'
})
export class GestiondeinventarioComponent implements OnInit {
  productos: any[] = [];
  carga =false

  constructor(private ProductoServicio:ProductosService) { }

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
      this.carga = true
    });
  }


}

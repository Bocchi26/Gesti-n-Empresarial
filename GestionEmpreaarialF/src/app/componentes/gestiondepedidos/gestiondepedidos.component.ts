import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PedidosService } from '../../servicios/pedidos/pedidos.service';
import { Producto } from '../../entidades/producto/producto';
import { Pedidos } from '../../entidades/pedidos/pedidos';
import { forkJoin } from 'rxjs';
import { map }      from 'rxjs/operators';
import { PedidoProducto } from '../../entidades/pedido-producto/pedido-producto';

interface NuevoItem {
  id: number|null;
  producto: string;
  cantidad: number | null;
  proveedor: string;
}

@Component({
  selector: 'app-gestiondepedidos',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './gestiondepedidos.component.html',
  styleUrl: './gestiondepedidos.component.css'
})
export class GestiondepedidosComponent implements OnInit {
  textoProducto: any;

  constructor(private pedidosService: PedidosService) { }

  showModal = false;
  mostrarModal = false;

  rolUsuario = localStorage.getItem('userRole');

  pedidoselect: any|null = null;
  pedidos: any[] = [];
  ProductoSeleccionado: Producto ;
  allProductNames: string[] = [];
  allProduct: Producto[] = [];
  allProveedores: string[] = [];
  allProveedoresNames: string[] = [];
  productSuggestions: string[] = [];

  ngOnInit(): void {
    // Simulación de fetch; más adelante lo traes de un servicio HTTP
    this.listaproductos();
    this.listaprovedores();
    this.union();
  }

    union() {
      forkJoin([
      this.pedidosService.getPedidos(),
      this.pedidosService.getProductosPedido()
      ]).pipe(
      map(([Pedidos, productos]) => {
        return Pedidos.map((pedido: Pedidos) => {
        return {
          ...pedido,
          productos: productos
          .filter((producto: PedidoProducto) => producto.pedido.idPedido === pedido.idPedido)
          .map((producto: PedidoProducto) => producto.producto) // Guardamos solo el nombre del producto
        };
        });
      })
      ).subscribe(data => {
      console.log('Datos combinados:', data);
      this.pedidos = data;
      });
    }



    listaprovedores() {
      this.pedidosService.getProveedores().subscribe((data: any[]) => {
        console.log(data);
        this.allProveedores = data;
        this.allProveedoresNames = data.map(producto => producto.nombre);
      });
    }

    listaproductos() {
      this.pedidosService.getProductos().subscribe((data: any[]) => {
        console.log(data);
        this.allProduct = data;
        this.allProductNames = data.map(producto => producto.nombre);
      });
    }

  /** Se dispara al cambiar el input “producto” */
  onProductoChange(texto: string) {
    if (texto && texto.length > 0) {
      const t = texto.toLowerCase();
      this.productSuggestions = this.allProductNames
      .filter(n => n.toLowerCase().includes(t))
      .slice(0, 6); // mostramos hasta 6 sugerencias
      if (this.productSuggestions.length === 0) {
      this.productSuggestions = ['No se encontró ningún producto'];
      }
    } else {
      this.productSuggestions = [];
    }
  }

  /** Cuando clican una sugerencia, la fijamos y ocultamos la lista */
  selectSuggestion(name: string) {
    const productoEncontrado = this.allProduct.find(producto => producto.nombre === name);
    if (productoEncontrado) {
      this.ProductoSeleccionado = productoEncontrado;
      this.nuevoItem.producto = name;
      this.productSuggestions = [];
      console.log('Producto seleccionado:', this.ProductoSeleccionado);
    }
    
  }

  // Campos del form de “Registrar Pedido”
  nuevoItem: NuevoItem = {
    id: null,
    producto: '',
    cantidad: null,
    proveedor: '',
  };
  items: NuevoItem[] = [];


  confirmarPedido(p: Pedidos) {
    this.pedidoselect = p;
    this.pedidoselect.productos.forEach((producto: any) => {
      producto.cantidadLlegada; // Valor por defecto
    });
    console.log('Pedido abierto:', p);
    this.mostrarModal = true;
  }
  confirmar(){
    const cantidades = this.pedidoselect.productos.map((producto: any) => ({
      idProducto: producto.idProducto,
      cantidadLlegada: producto.cantidadLlegada
      
    }));
    const idUser = localStorage.getItem('userId');
    console.log('ID de usuario:', idUser);
    console.log('Cantidades:', cantidades);
    this.pedidosService.confirmarPedido(this.pedidoselect.idPedido, cantidades, idUser).subscribe((response) => { 
      if(response) {
        alert('Pedido confirmado con éxito!');
        this.mostrarModal = false; // Cierra el modal
        this.ngOnInit();
      }else{
        alert('Error al confirmar el pedido. Por favor, inténtelo de nuevo más tarde.');
        this.mostrarModal = false; // Cierra el modal
      }
      // Refresca la página recargando los datos
    }
    );
  }
  cerrarModal() {
    this.mostrarModal = false;
  }

  openModal() {
    this.showModal = true;
    // reiniciamos form
    this.nuevoItem = { id: null, producto: '', cantidad: null, proveedor: ''};
    this.items = [];
  }

  /** Cierra el modal */
  closeModal() {
    this.showModal = false;
  }

  /** Agrega un item a la tabla */
  agregarItem() {
    if (this.nuevoItem.producto && this.nuevoItem.cantidad && this.nuevoItem.proveedor) {
      const productoEncontrado = this.allProduct.find(producto => producto.nombre === this.nuevoItem.producto);
      if (productoEncontrado) {
        this.items.push({ ...this.nuevoItem, id: productoEncontrado.idProducto });
      } else {
        alert('Producto no encontrado en la lista.');
      }
      console.log('Items:', this.items);
      // Reiniciamos el form
      this.nuevoItem = { id: null, producto: '', cantidad: null, proveedor: '' };
      this.productSuggestions = []; // Limpiamos sugerencias
    } else {
      alert('Por favor completa todos los campos.');
    }
 
  }

  realizarPedidoModal() {
    if (this.items.length === 0) {
      alert('No hay items en el pedido. Por favor agrega al menos un item antes de realizar el pedido.');
      return;
    }
    console.log('Enviando pedido con estos items:', this.items);
    this.pedidosService.registrarPedido(this.items).subscribe((response) => { 
      if(response){
        console.log('Pedido registrado:', response);
        alert('¡Pedido realizado!');
        this.closeModal();
        this.ngOnInit(); // Recarga la página recargando los datos

      }else{
        alert("No se pudo registrar la recepcion del producto.");
      }

    });
    
  }
}

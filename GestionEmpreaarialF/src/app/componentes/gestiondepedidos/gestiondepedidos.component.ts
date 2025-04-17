import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Pedido {
  id: number;
  productos: string[];
  estado: 'En Camino' | 'Entregado' | 'Cancelado';
  fechaEstimado: Date;
}

interface NuevoItem {
  nombreProducto: string;
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

  allProductNames: string[] = [
    'Leche', 'Pan', 'Huevos', 'Manzanas', 'Arroz', 'Azúcar',
    'Café', 'Queso', 'Yogur', 'Jugo de Naranja', /* … */
  ];

  productSuggestions: string[] = [];

  /** Se dispara al cambiar el input “producto” */
  onProductoChange(texto: string) {
    if (texto && texto.length > 0) {
      const t = texto.toLowerCase();
      this.productSuggestions = this.allProductNames
        .filter(n => n.toLowerCase().includes(t))
        .slice(0, 6);    // mostramos hasta 6 sugerencias
    } else {
      this.productSuggestions = [];
    }
  }

  /** Cuando clican una sugerencia, la fijamos y ocultamos la lista */
  selectSuggestion(name: string) {
    this.nuevoItem.producto = name;
    this.productSuggestions = [];
  }

  pedidos: Pedido[] = [];

  showModal = false;

  // Campos del form de “Registrar Pedido”
  nuevoItem: NuevoItem = {
    nombreProducto: '',
    producto: '',
    cantidad: null,
    proveedor: ''
  };
  items: NuevoItem[] = [];

  proveedores = [
    'Proveedor A',
    'Proveedor B',
    'Proveedor C'
  ];

  ngOnInit(): void {
    // Simulación de fetch; más adelante lo traes de un servicio HTTP
    this.pedidos = [
      { id: 1, productos: ['Manzanas', 'Leche'], estado: 'En Camino', fechaEstimado: new Date(2025, 3, 20) },
      { id: 2, productos: ['Pan', 'Huevos'], estado: 'En Camino', fechaEstimado: new Date(2025, 3, 22) },
      // …
    ];}

  realizarPedido() {
    // Redirige a tu formulario de pedido
    console.log('Navegar a /realizar-pedido');
  }

  confirmarPedido(p: Pedido) {
    // Lógica para confirmar (por ejemplo, llamada a tu API)
    p.estado = 'Entregado';
    console.log(`Pedido ${p.id} confirmado.`);
  }

  openModal() {
    this.showModal = true;
    // reiniciamos form
    this.nuevoItem = { nombreProducto: '', producto: '', cantidad: null, proveedor: '' };
    this.items = [];
  }

  /** Cierra el modal */
  closeModal() {
    this.showModal = false;
  }

  /** Agrega un item a la tabla */
  agregarItem() {
    if (
      this.nuevoItem.nombreProducto &&
      this.nuevoItem.producto &&
      this.nuevoItem.cantidad !== null && this.nuevoItem.cantidad > 0 &&
      this.nuevoItem.proveedor
    ) {
      this.items.push({ ...this.nuevoItem });
      this.nuevoItem = { nombreProducto: '', producto: '', cantidad: null, proveedor: '' };
    }
  }

  realizarPedidoModal() {
    console.log('Enviando pedido con estos items:', this.items);
    // aquí llamarías a tu API...
    this.closeModal();
  }
}

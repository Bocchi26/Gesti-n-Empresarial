import { Pedidos } from "../pedidos/pedidos";
import { Producto } from "../producto/producto";

export class PedidoProducto {
    id:number
    cantidad:number;
    pedido:Pedidos;
    producto:Producto;
}

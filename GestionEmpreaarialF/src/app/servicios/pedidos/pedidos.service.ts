import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedidos } from '../../entidades/pedidos/pedidos';
import { PedidoProducto } from '../../entidades/pedido-producto/pedido-producto';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private url = "http://localhost:8080/pedidos";

  constructor(private httpClient: HttpClient) { }

  getProductos() {
    return this.httpClient.get<any[]>(this.url+"/listaproductos");
  }
  getProveedores() {
    return this.httpClient.get<any[]>(this.url+"/listaproveedores");
  } 

  registrarPedido(pedido: any) {
    return this.httpClient.post<boolean>(this.url+"/agregarpedido", pedido);
  }

  getPedidos() {
    return this.httpClient.get<Pedidos[]>(this.url+"/listapedidos");
  }
  getProductosPedido() {
    return this.httpClient.get<PedidoProducto[]>(this.url+"/listaproductopedido");
  }

  confirmarPedido(id: number, cantidades: any[], idUser: String | null) {
    const body = { id, cantidades, idUser };
    return this.httpClient.post<boolean>(this.url + "/confirmarpedido", body);
  }
}

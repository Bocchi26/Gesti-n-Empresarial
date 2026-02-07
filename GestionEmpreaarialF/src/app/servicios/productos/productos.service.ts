import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../../entidades/producto/producto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {


  private url = "http://localhost:8080/productos";
  constructor(private httpClient: HttpClient) { }

  getProductos() {
    return this.httpClient.get<any[]>(this.url+"/listaproductos");
  }

  getCantidadEnCamino(){
    return this.httpClient.get<any[]>(this.url+"/cantidadencamino");
  }

  guardarProducto(producto: Producto, user: string | null): Observable<any> {
    const params = new HttpParams()
      .set('nombre', producto.nombre)
      .set('precioUnitario', producto.precioUnitario.toString())
      .set('stock', producto.stock.toString())
      .set('descripcion', producto.descripcion)
      .set('precioCompra', producto.precioCompra.toString())
      .set('tipo', producto.tipo)
      .set('fechaVencimiento', producto.fechaVencimiento.toISOString().split('T')[0]) // yyyy-MM-dd
      .set('idUsuario', user ? user : '0');
      
      console.log(user);// Cambia '0' por el valor que desees si user es null

    return this.httpClient.get(this.url+"/guardar", { params });
  }

  actualizarProducto(producto: Producto, idProducto: number): Observable<any> {
    const params = new HttpParams()
      .set('idProducto', idProducto.toString())
      .set('nombre', producto.nombre)
      .set('precioUnitario', producto.precioUnitario.toString())
      .set('estado', producto.estado.toString())
      .set('descripcion', producto.descripcion)
      .set('precioCompra', producto.precioCompra.toString())
      .set('tipo', producto.tipo)
      .set('fechaVencimiento', producto.fechaVencimiento.toISOString().split('T')[0]); // formato yyyy-MM-dd
  
    return this.httpClient.put(this.url+"/actualizar", null, { params, responseType: 'text' });
  }

  buscarProducto(nombre: string): Observable<Producto[]> {
    const params = new HttpParams().set('nombre', nombre);

    return this.httpClient.get<Producto[]>(this.url+"/buscar", { params});
  }

  buscarProductos(nombre?: string, tipo?: string, estado?: string): Observable<Producto[]> {
    let params = [];

    if (nombre) params.push(`nombre=${nombre}`);
    if (tipo) params.push(`tipo=${tipo}`);
    if (estado) params.push(`estado=${estado}`);

    const httpParams = new HttpParams({ fromString: params.join('&') });
    return this.httpClient.get<Producto[]>(this.url+"/buscarfiltro", { params: httpParams });
  }

  getProductoPorId(id: number): Observable<Producto> {
    return this.httpClient.get<Producto>(`${this.url}/${id}`);
  }
}


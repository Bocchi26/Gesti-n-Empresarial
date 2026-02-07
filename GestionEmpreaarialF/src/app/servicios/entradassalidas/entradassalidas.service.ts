import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Salidas } from '../../entidades/entradas/salidas';
import { Observable } from 'rxjs';
import { Producto } from '../../entidades/producto/producto';

@Injectable({
  providedIn: 'root'
})
export class EntradassalidasService {

  private url = "http://localhost:8080/entradasalidas";

  constructor(private httpClient: HttpClient) { }

  registrarSalida(idProducto: number, cantidadRetirar: number, motivoSalida: string, idUser: String|null) {
    const body = { idProducto, cantidadRetirar, motivoSalida, idUser };
    return this.httpClient.post<boolean>(this.url + "/salida", body);
  }


  // Obtener los últimos 10
  obtenerUltimos(): Observable<Salidas[]> {
    return this.httpClient.get<Salidas[]>(`${this.url}/ultimos`);
  }

  // Aplicar filtros
  filtrar(nombre: string, fechaInicio: string, fechaFin: string): Observable<Salidas[]> {
    let params = [];

    if (nombre) params.push(`nombreProducto=${nombre}`);
    if (fechaInicio) params.push(`fechaInicio=${fechaInicio}`);
    if (fechaFin) params.push(`fechaFin=${fechaFin}`);

    const query = params.length ? `?${params.join('&')}` : '';
    console.log(`Query: ${query}`); // Para depuración

    return this.httpClient.get<Salidas[]>(`${this.url}/filtrar${query}`);
  }

  crearpuntoventa(): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/crear`, null);
  }

  traermovproducto(producto: Producto): Observable<Salidas[]> {
    return this.httpClient.post<Salidas[]>(this.url + "/movimiento", producto);
  }

}

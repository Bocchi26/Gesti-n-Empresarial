import { Producto } from "../producto/producto";

export class Salidas {
    idEntradaSalida!: number;
    tipo!: string; // entrada, salida, pérdida, etc.
    fecha!: string; // usar formato 'yyyy-MM-dd'
    cantidad!: number;
    origen!: string; // manual, POS, pedido
  
    usuario!: {
      idUsuario: number;
      nombre: string;
      // agrega otros campos si los necesitas en el frontend
    };
  
    producto!: Producto
  
    puntoVenta?: {
      idPos: number;
      nombre: string;
      // opcional, por si viene null
    };

}

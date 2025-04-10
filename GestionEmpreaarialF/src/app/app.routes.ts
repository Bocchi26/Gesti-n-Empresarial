import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { NavegadorComponent } from './navegador/navegador.component';
import { ActualizarproductoComponent } from './componentes/actualizarproducto/actualizarproducto.component';
import { AgregarproductosComponent } from './componentes/agregarproductos/agregarproductos.component';
import { CerrarsesionComponent } from './componentes/cerrarsesion/cerrarsesion.component';
import { ConsultarproductosComponent } from './componentes/consultarproductos/consultarproductos.component';
import { EntradaysalidaComponent } from './componentes/entradaysalida/entradaysalida.component';
import { GestiondeinventarioComponent } from './componentes/gestiondeinventario/gestiondeinventario.component';
import { GestiondepedidosComponent } from './componentes/gestiondepedidos/gestiondepedidos.component';
import { RegistrarSalidaComponent } from './componentes/registrar-salida/registrar-salida.component';

export const routes: Routes = [
    {path: "login", component: LoginComponent},
    {path: "navegador", component: NavegadorComponent},
    {path: "actualizarProducto", component: ActualizarproductoComponent},
    {path: "agregarProductos", component: AgregarproductosComponent},
    {path: "cerrarSesion", component: CerrarsesionComponent},
    {path: "consultarProductos", component: ConsultarproductosComponent},
    {path: "entradaysalidas", component: EntradaysalidaComponent},
    {path:"gestionInventario", component: GestiondeinventarioComponent},
    {path: "gestionPedidos", component: GestiondepedidosComponent},
    {path: "registrarSalida", component: RegistrarSalidaComponent}
];

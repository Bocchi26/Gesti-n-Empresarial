package com.example.demo.controlador;

import java.util.Date;



import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.modelo.EntradasSalidas;
import com.example.demo.modelo.PedidoProducto;
import com.example.demo.modelo.PedidoProveedor;
import com.example.demo.modelo.Pedidos;
import com.example.demo.modelo.Producto;
import com.example.demo.modelo.Proveedor;
import com.example.demo.modelo.PuntoVenta;
import com.example.demo.modelo.Usuario;
import com.example.demo.repositorio.EntradasSalidasRepo;
import com.example.demo.repositorio.PedidoProductoRepo;
import com.example.demo.repositorio.PedidoProveedorRepo;
import com.example.demo.repositorio.PedidosRepo;
import com.example.demo.repositorio.ProductoRepo;
import com.example.demo.repositorio.ProveedorRepo;
import com.example.demo.repositorio.UsuarioRepo;


@RestController
@RequestMapping("/pedidos")
@CrossOrigin(origins = "http://localhost:4200/")
public class PedidosControlador {
	
	@Autowired
	private PedidosRepo repositorioPedido;
	
	@Autowired
	private PedidoProductoRepo repositorioPedidoProducto;
	
	@Autowired
	private PedidoProveedorRepo repositorioPedidoProveedor;
	
	@Autowired
	private ProductoRepo repositorioP;
	
	@Autowired
	private ProveedorRepo repositorioPr;
	
	@Autowired
	private EntradasSalidasRepo repositorioES;
	
	@Autowired
	private UsuarioRepo repositorioUser;
	
	
	@GetMapping("/listaproductos")
	public List<Producto> ListaProductos(){
		
		return repositorioP.findAll();
	}
	
	@GetMapping("/listaproveedores")
	public List<Proveedor> ListaProveedores(){
		
		return repositorioPr.findAll();
	}
	
	@GetMapping("/listapedidos")
	public List<Pedidos> listaPedidos(){
		return repositorioPedido.findByEstado("En camino");
	}
	
	@PostMapping("/confirmarpedido")
	public boolean confirmarpedido(@RequestBody Map<String,Object> items) {
		
		try {
			
		Long pedidoId = ((Number) items.get("id")).longValue();
		Pedidos p = repositorioPedido.findById(pedidoId).orElse(null);
		p.setEstado("Entregado");
		LocalDate hoy = LocalDate.now();
	    Date fecha = Date.from(hoy.atStartOfDay(ZoneId.systemDefault()).toInstant());
	    java.sql.Date sqlFecha = new java.sql.Date(fecha.getTime());
	    
	    
	    Long userId = Long.parseLong(items.get("idUser").toString());
	    Usuario user = repositorioUser.findById(userId).orElse(null);		
	    
		@SuppressWarnings("unchecked")
		List<Map<String,Object>> cantidades = (List<Map<String,Object>>) items.get("cantidades");
		 
		for (Map<String,Object> det : cantidades) {
			Long prodId = ((Number) det.get("idProducto")).longValue();
		    Producto producto = repositorioP.findById(prodId).orElse(null);
		    Long cantidadP = producto.getStock();
		    Long añadir =  ((Number) det.get("cantidadLlegada")).longValue();
		    int cnta = añadir.intValue();
		    Long cantidadN = cantidadP + añadir;
		    producto.setStock(cantidadN);
		    repositorioP.save(producto);
		    
		    EntradasSalidas registro = new EntradasSalidas("Entrada", sqlFecha, cnta, "Pedido", user, producto);
		    repositorioES.save(registro);
		 }
		 
		
		repositorioPedido.save(p);
		 
		return true;
		
		}catch(Exception e) {
			return false;
		}
	}
	
	@PostMapping("/agregarpedido")
	public boolean agregarpedido(@RequestBody List<Map<String, Object>> items) {
		
		try {
		
		if (items != null) {
			LocalDate hoy = LocalDate.now();
			Date fechapedido= Date.from(hoy.atStartOfDay(ZoneId.systemDefault()).toInstant());
			LocalDate fechaLlegada = hoy.plusDays(4);
			Date fechaEntrega=Date.from(fechaLlegada.atStartOfDay(ZoneId.systemDefault()).toInstant());
			String estado = "En camino";
			
			java.sql.Date sqlFechaPedido = new java.sql.Date(fechapedido.getTime());
			java.sql.Date sqlFechaEntrega = new java.sql.Date(fechaEntrega.getTime());

			
			Pedidos pedidoNuevo = new Pedidos(sqlFechaPedido, estado, sqlFechaEntrega );
			repositorioPedido.save(pedidoNuevo);
	         
			for (Map<String, Object> item : items) {
				Object idObj = item.get("id");
				Long id=  ((Number) idObj).longValue();
				String prov = (String) item.get("proveedor");
				int cantidad = (int) item.get("cantidad");
				Producto producto = repositorioP.findById(id).orElse(null);
				Proveedor proveedor = repositorioPr.findBynombre(prov);
				System.out.print(proveedor);
				PedidoProveedor pd = new PedidoProveedor(pedidoNuevo, proveedor);
				PedidoProducto pf = new PedidoProducto(pedidoNuevo, producto, cantidad);
				repositorioPedidoProducto.save(pf);
				repositorioPedidoProveedor.save(pd);
			}
			return true;
		}return false;
		}catch(Exception e) {
			return false;
		}
		
		
	}
	
	@GetMapping ("/listaproductopedido")
	public List<PedidoProducto> listapp(){
		return repositorioPedidoProducto.findAll();
	}
	

}

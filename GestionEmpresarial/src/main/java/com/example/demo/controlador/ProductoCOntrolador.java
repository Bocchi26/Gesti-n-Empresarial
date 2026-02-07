package com.example.demo.controlador;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.stream.Collectors;
import java.text.ParseException;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.modelo.EntradasSalidas;
import com.example.demo.modelo.PedidoProducto;
import com.example.demo.modelo.Producto;
import com.example.demo.modelo.Usuario;
import com.example.demo.repositorio.EntradasSalidasRepo;
import com.example.demo.repositorio.PedidoProductoRepo;
import com.example.demo.repositorio.ProductoRepo;
import com.example.demo.repositorio.UsuarioRepo;

@RestController
@RequestMapping("/productos")
@CrossOrigin(origins = "http://localhost:4200/")
public class ProductoCOntrolador {
	
	@Autowired
	private ProductoRepo repositorioProducto;
	
	@Autowired
	private PedidoProductoRepo repositorioPP;
	
	@Autowired
	private EntradasSalidasRepo repositorioES;
	
	@Autowired
	private UsuarioRepo repositorioU;
	
	@GetMapping("/listaproductos")
	public List<Producto> listaP(){
		return repositorioProducto.findAll();
	}
	
	@GetMapping("/cantidadencamino")
	public List<Map<String, Object>> listarCantidadPorProductoEnCamino() {
	    List<PedidoProducto> pedidosEnCamino = repositorioPP.findAll().stream()
	        .filter(pp -> "en camino".equalsIgnoreCase(pp.getPedido().getEstado()))
	        .collect(Collectors.toList());

	    Map<Object, Integer> cantidadesPorProducto = pedidosEnCamino.stream()
	        .collect(Collectors.groupingBy(
	            pp -> pp.getProducto().getIdProducto(),
	            Collectors.summingInt(PedidoProducto::getCantidad)
	        ));

	    List<Map<String, Object>> resultado = new ArrayList<>();

	    for (Entry<Object, Integer> entry : cantidadesPorProducto.entrySet()) {
	        Map<String, Object> item = new HashMap<>();
	        item.put("idProducto", entry.getKey());
	        item.put("cantidadEnCamino", entry.getValue());
	        resultado.add(item);
	    }

	    return resultado;
	}
	
	@Autowired
	private ProductoRepo repositorioP;
	
	
	@GetMapping("/guardar")
	public List<Producto> guardarProducto(
	        @RequestParam("nombre") String nombre,
	        @RequestParam("precioUnitario") Float precioUnitario,
	        @RequestParam("stock") Long stock,
	        @RequestParam("descripcion") String descripcion,
	        @RequestParam("precioCompra") Float precioCompra,
	        @RequestParam("tipo") String tipo,
	        @RequestParam("fechaVencimiento") String fechaVencimiento,
	        @RequestParam("idUsuario") Long iduser
	) throws ParseException {
		
		try {

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date fecha = sdf.parse(fechaVencimiento);

        Producto producto = new Producto(
        	    (Long) null, // Aquí está el cambio clave
        	    nombre,
        	    precioUnitario,
        	    stock,
        	    descripcion,
        	    precioCompra,
        	    tipo,
        	    fecha,
        	    "Activo"
        	);
        
        
        int cantidad = stock.intValue();

        repositorioP.save(producto);
       
        
        Usuario user = repositorioU.findById(iduser).orElse(null);
        
        LocalDate localDateHoy = LocalDate.now();
        java.sql.Date sqlhoy = java.sql.Date.valueOf(localDateHoy);
        EntradasSalidas registro = new EntradasSalidas("Entrada",sqlhoy, cantidad, "Manual",user, producto);
        repositorioES.save(registro);
        return repositorioP.findAll();
        
        }catch(Exception e) {
        	return null;
        }
        
    }
	
	@PutMapping("/actualizar")
	public ResponseEntity<String> actualizarProducto(
	        @RequestParam("idProducto") Long idProducto,
	        @RequestParam("nombre") String nombre,
	        @RequestParam("precioUnitario") Float precioUnitario,
	        @RequestParam("estado") String estado,
	        @RequestParam("descripcion") String descripcion,
	        @RequestParam("precioCompra") Float precioCompra,
	        @RequestParam("tipo") String tipo,
	        @RequestParam("fechaVencimiento") String fechaVencimiento
	) throws ParseException {
		try {
	    Optional<Producto> productoOpt = repositorioP.findById(idProducto);

	    if (!productoOpt.isPresent()) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND)
	            .body("Producto no encontrado con ID: " + idProducto);
	    }

	    Producto producto = productoOpt.get();
	    producto.setNombre(nombre);
	    producto.setPrecioUnitario(precioUnitario);
	    producto.setEstado(estado);
	    producto.setDescripcion(descripcion);
	    producto.setPrecioCompra(precioCompra);
	    producto.setTipo(tipo);

	    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
	    Date fecha = sdf.parse(fechaVencimiento);
	    producto.setFechaVencimiento(fecha);

	    repositorioP.save(producto);

	    return ResponseEntity.ok("Producto actualizado exitosamente");
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error conexion bd");
		}
	}
	
	@GetMapping("/buscar")
	public List<Producto> buscarProducto(@RequestParam("nombre") String nombre) {
		try {
	    return repositorioP.findByNombreContaining(nombre);
		}catch(Exception e) {
			return null;
		}
	}
	
	  @GetMapping("/buscarfiltro")
	  public List<Producto> buscarProductos(
	            @RequestParam(required = false) String nombre,
	            @RequestParam(required = false) String tipo,
	            @RequestParam(required = false) String estado)
	  {
		  try {
			  
			  return repositorioProducto.buscarConFiltros(nombre, tipo, estado);
			  
		  }catch(Exception e) {
			  return null;
		  }
		  
	  }

	    @GetMapping("/{id}")
	    public ResponseEntity<Producto> obtenerProductoPorId(@PathVariable Long id) {
	        Optional<Producto> producto = repositorioProducto.findById(id);
	        return producto.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	    }
}





	 
	



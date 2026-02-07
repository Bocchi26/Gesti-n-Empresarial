package com.example.demo.controlador;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.Date;
import java.text.SimpleDateFormat;
import java.time.LocalDate;

import com.example.demo.modelo.EntradasSalidas;
import com.example.demo.modelo.Producto;
import com.example.demo.modelo.PuntoVenta;
import com.example.demo.modelo.Usuario;
import com.example.demo.repositorio.EntradasSalidasRepo;
import com.example.demo.repositorio.ProductoRepo;
import com.example.demo.repositorio.PuntoVentaRepo;
import com.example.demo.repositorio.UsuarioRepo;

@RestController
@RequestMapping("/entradasalidas")
@CrossOrigin(origins = "http://localhost:4200/")
public class EntradasSalidasControlador {

	@Autowired
	private EntradasSalidasRepo repositorioES;
	@Autowired
	private ProductoRepo repositorioP;
	@Autowired
	private UsuarioRepo repositorioU;
	@Autowired
	private PuntoVentaRepo repositorioPV;
	
	
	@PostMapping("/salida")
    public boolean registrarSalida(@RequestBody Map<String, Object> datos) {
		
		try {

        Long idProducto = Long.valueOf(datos.get("idProducto").toString());
        Integer cantidadRetirar = Integer.valueOf(datos.get("cantidadRetirar").toString());
        String motivoSalida = datos.get("motivoSalida").toString();
        Long idUser = Long.valueOf(datos.get("idUser").toString());
        LocalDate localDateHoy = LocalDate.now();
        java.sql.Date sqlhoy = java.sql.Date.valueOf(localDateHoy);
        Producto p = repositorioP.findById(idProducto).orElse(null);
        Usuario u =  repositorioU.findById(idUser).orElse(null);
        
        
        EntradasSalidas es = new EntradasSalidas("salida",sqlhoy, cantidadRetirar, motivoSalida, u, p);
        
        
        repositorioES.save(es);
        
        
        
        Long cantidad = p.getStock();
        Long c = cantidad - cantidadRetirar;
        p.setStock(c);
        repositorioP.save(p);
        
        
        
        return true;}
		
		catch(Exception e) {
			return false;
		}
	}
	
	/**
     * Obtener los últimos 10 movimientos si no hay filtros
     */
    @GetMapping("/ultimos")
    public List<EntradasSalidas> obtenerUltimosMovimientos() {
        return repositorioES.findTop10ByOrderByIdEntradaSalidaDesc(); 
    }

    /**
     * Buscar entradas/salidas filtradas por fecha y/o nombre de producto
     */
    @GetMapping("/filtrar")
    public ResponseEntity<?> filtrarEntradasSalidas(
            @RequestParam(required = false) String fechaInicio,
            @RequestParam(required = false) String fechaFin,
            @RequestParam(required = false) String nombreProducto) {

        try {
        	System.out.println("estuvo aqui 1");
        	System.out.println(fechaInicio);
        	System.out.println(fechaFin);
        	System.out.println(nombreProducto);
            // Convertir fechas
            Date inicio = null;
            Date fin = null;

            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

         // Conversión y uso correcto de fechas
            
            if (fechaInicio != null && !fechaInicio.isEmpty()) {
            	System.out.print("estuvo al 1 if");
                inicio = formatter.parse(fechaInicio);
            }
            if (fechaFin != null && !fechaFin.isEmpty()) {
            	System.out.print("estuvo 2if");
                fin = formatter.parse(fechaFin);
            }

            // Convertir a java.sql.Date para pasar al repositorio
            java.sql.Date sqlInicio = (inicio != null) ? new java.sql.Date(inicio.getTime()) : null;
            java.sql.Date sqlFin = (fin != null) ? new java.sql.Date(fin.getTime()) : null;
            
            

            List<EntradasSalidas> resultados = repositorioES.buscarPorFiltros(sqlInicio, sqlFin, nombreProducto);
            
            System.out.print("hace la consulta");

            if (resultados.isEmpty()) {
                return ResponseEntity.status(200).body(resultados); // Enviamos lista vacía
            }

            System.out.print("envio resltados");
            return ResponseEntity.ok(resultados);
            

        } catch (Exception e) {
        	System.out.print("estuvo aqui");
            return ResponseEntity.status(500).body("Error al generar el reporte. Intente más tarde o contacte a soporte.");
        }
    }
    
    
    @PostMapping("/crear")
    public boolean crear() {
    	
    	List<PuntoVenta>items = repositorioPV.findAll();
    	
    	for(PuntoVenta item:  items){
    		
    		Long pid= item.getIdProducto();
    		System.out.println(pid);
    		Producto p = repositorioP.findById(pid).orElse(null);
    		
    		EntradasSalidas registro = new EntradasSalidas("salida", item.getFechaVenta(), item.getCantidadVendido(),"POS", p);
    		
    		repositorioES.save(registro);
    		repositorioPV.delete(item);
    		
    	}
    	
    	return true;
    }
    
    
    @PostMapping("/movimiento")
    public List<EntradasSalidas> listaproducto(@RequestBody Producto p){
    	
    	List<EntradasSalidas> registros = repositorioES.findTop5ByProductoOrderByFechaDesc(p);
    	
    	return registros;
    }
    
}

package com.example.demo.repositorio;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.modelo.EntradasSalidas;
import com.example.demo.modelo.Producto;

public interface EntradasSalidasRepo extends JpaRepository<EntradasSalidas,Long> {
	
	  List<EntradasSalidas> findTop10ByOrderByIdEntradaSalidaDesc();
	  
	  @Query("SELECT e FROM EntradasSalidas e " +
	           "WHERE (:fechaInicio IS NULL OR e.fecha >= :fechaInicio) " +
	           "AND (:fechaFin IS NULL OR e.fecha <= :fechaFin) " +
	           "AND (:nombreProducto IS NULL OR LOWER(e.producto.nombre) LIKE LOWER(CONCAT('%', :nombreProducto, '%'))) " +
	           "ORDER BY e.fecha DESC")
	    List<EntradasSalidas> buscarPorFiltros(@Param("fechaInicio") Date fechaInicio,
	                                           @Param("fechaFin") Date fechaFin,
	                                           @Param("nombreProducto") String nombreProducto);
	  
	  List<EntradasSalidas> findTop5ByProductoOrderByFechaDesc(Producto producto);



}

package com.example.demo.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.modelo.Producto;


public interface ProductoRepo extends JpaRepository<Producto,Long> {
	
	List<Producto> findByNombreContaining(String nombre);
	
    List<Producto> findByNombreContainingIgnoreCase(String nombre);

    List<Producto> findByTipo(String tipo);

    List<Producto> findByEstado(String estado);
    
    @Query("SELECT p FROM Producto p WHERE " +
    	       "(:nombre IS NULL OR LOWER(p.nombre) LIKE LOWER(CONCAT('%', :nombre, '%'))) AND " +
    	       "(:tipo IS NULL OR LOWER(p.tipo) = LOWER(:tipo)) AND " +
    	       "(:estado IS NULL OR LOWER(p.estado) = LOWER(:estado))")
    	List<Producto> buscarConFiltros(@Param("nombre") String nombre,
    	                                 @Param("tipo") String tipo,
    	                                 @Param("estado") String estado);



}

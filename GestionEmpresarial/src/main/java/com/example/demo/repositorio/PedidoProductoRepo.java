package com.example.demo.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.modelo.PedidoProducto;

public interface PedidoProductoRepo extends JpaRepository<PedidoProducto,Long> {
	
	

}

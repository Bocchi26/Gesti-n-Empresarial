package com.example.demo.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.modelo.Pedidos;

public interface PedidosRepo extends JpaRepository<Pedidos,Long>{

	List<Pedidos> findByEstado(String estado);

}

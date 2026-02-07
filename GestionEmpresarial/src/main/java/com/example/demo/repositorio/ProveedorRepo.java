package com.example.demo.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.modelo.Proveedor;

public interface ProveedorRepo extends JpaRepository<Proveedor,Long> {
	Proveedor findBynombre (String nombre);
}

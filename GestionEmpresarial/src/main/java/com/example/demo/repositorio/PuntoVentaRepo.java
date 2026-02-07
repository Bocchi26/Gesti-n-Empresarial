package com.example.demo.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.modelo.PuntoVenta;

public interface PuntoVentaRepo extends JpaRepository<PuntoVenta,Long>  {

}

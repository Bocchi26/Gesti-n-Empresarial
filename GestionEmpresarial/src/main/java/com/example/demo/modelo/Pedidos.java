package com.example.demo.modelo;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.*;

@Entity
@Table(name = "Pedidos")
public class Pedidos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idPedido")
    private Long idPedido;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name = "fechaPedido")
    private Date fechaPedido;

    @Column(name = "estado")
    private String estado;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name = "fechaEstimadaLlegada")
    private Date fechaEstimadaLlegada;

	public Pedidos() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Pedidos(Date fechaPedido, String estado, Date fechaEstimadaLlegada) {
		super();
		this.fechaPedido = fechaPedido;
		this.estado = estado;
		this.fechaEstimadaLlegada = fechaEstimadaLlegada;
	}

	public Long getIdPedido() {
		return idPedido;
	}


	public Date getFechaPedido() {
		return fechaPedido;
	}

	public void setFechaPedido(Date fechaPedido) {
		this.fechaPedido = fechaPedido;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public Date getFechaEstimadaLlegada() {
		return fechaEstimadaLlegada;
	}

	public void setFechaEstimadaLlegada(Date fechaEstimadaLlegada) {
		this.fechaEstimadaLlegada = fechaEstimadaLlegada;
	}

	
    
}

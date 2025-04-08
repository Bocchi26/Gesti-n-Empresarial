package com.example.demo.modelo;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "Producto")

public class Producto {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "idProducto")
	    private Long idProducto;
	 
	 @Column(name = "nombre")
		private String nombre;
	 
	 @Column(name = "precioUnitario")
		private Float precioUnitario;
	 
	 @Column(name = "stock")
		private Long stock;
	 
	 @Column(name = "descripcion")
		private String descripcion;
	 
	 @Column(name = "precioCompra")
		private Float precioCompra;
	 
	 @Column(name = "tipo")
		private String tipo;
	 
	 	@JsonFormat(pattern = "yyyy-MM-dd")
	    @Column(name = "fechaVencimiento", nullable = false)
	    private Date fechaVencimiento;
	 
	 @Column(name = "estado")
		private String estado;

	public Producto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Producto(Long idProducto, String nombre, Float precioUnitario, Long stock, String descripcion,
			Float precioCompra, String tipo, Date fechaVencimiento, String estado) {
		super();
		this.idProducto = idProducto;
		this.nombre = nombre;
		this.precioUnitario = precioUnitario;
		this.stock = stock;
		this.descripcion = descripcion;
		this.precioCompra = precioCompra;
		this.tipo = tipo;
		this.fechaVencimiento = fechaVencimiento;
		this.estado = estado;
	}

	public Long getIdProducto() {
		return idProducto;
	}

	public void setIdProducto(Long idProducto) {
		this.idProducto = idProducto;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public Float getPrecioUnitario() {
		return precioUnitario;
	}

	public void setPrecioUnitario(Float precioUnitario) {
		this.precioUnitario = precioUnitario;
	}

	public Long getStock() {
		return stock;
	}

	public void setStock(Long stock) {
		this.stock = stock;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public Float getPrecioCompra() {
		return precioCompra;
	}

	public void setPrecioCompra(Float precioCompra) {
		this.precioCompra = precioCompra;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public Date getFechaVencimiento() {
		return fechaVencimiento;
	}

	public void setFechaVencimiento(Date fechaVencimiento) {
		this.fechaVencimiento = fechaVencimiento;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}
	 
	 
	 
}
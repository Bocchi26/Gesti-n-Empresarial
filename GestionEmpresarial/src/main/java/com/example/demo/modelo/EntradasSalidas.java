package com.example.demo.modelo;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.*;

@Entity
@Table(name = "EntradasSalidas")
public class EntradasSalidas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idEntreadaSalida")
    private Long idEntradaSalida;

    @Column(name = "tipo")
    private String tipo; // (entrada, salida, pérdida, devolución, caducidad)

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name = "fecha")
    private Date fecha;

    @Column(name = "cantidad")
    private int cantidad;

    @Column(name = "origen")
    private String origen; // (manual, POS, pedido)

    @ManyToOne
    @JoinColumn(name = "idUsuario", referencedColumnName = "idUsuario")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "idProducto", referencedColumnName = "idProducto")
    private Producto producto;

    @ManyToOne
    @JoinColumn(name = "idPos", referencedColumnName = "idPos", nullable = true)
    private PuntoVenta puntoVenta;

	public EntradasSalidas() {
		super();
		// TODO Auto-generated constructor stub
	}

	public EntradasSalidas(String tipo, Date fecha, int cantidad, String origen, Usuario usuario, Producto producto,
			PuntoVenta puntoVenta) {
		super();
		this.tipo = tipo;
		this.fecha = fecha;
		this.cantidad = cantidad;
		this.origen = origen;
		this.usuario = usuario;
		this.producto = producto;
		this.puntoVenta = puntoVenta;
	}

	public Long getIdEntradaSalida() {
		return idEntradaSalida;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public java.sql.Date getFecha() {
		return fecha;
	}

	public void setFecha(java.sql.Date fecha) {
		this.fecha = fecha;
	}

	public int getCantidad() {
		return cantidad;
	}

	public void setCantidad(int cantidad) {
		this.cantidad = cantidad;
	}

	public String getOrigen() {
		return origen;
	}

	public void setOrigen(String origen) {
		this.origen = origen;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public Producto getProducto() {
		return producto;
	}

	public void setProducto(Producto producto) {
		this.producto = producto;
	}

	public PuntoVenta getPuntoVenta() {
		return puntoVenta;
	}

	public void setPuntoVenta(PuntoVenta puntoVenta) {
		this.puntoVenta = puntoVenta;
	}
    
    
}

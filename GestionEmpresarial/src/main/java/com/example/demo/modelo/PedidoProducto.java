package com.example.demo.modelo;

import jakarta.persistence.*;

@Entity
@Table(name = "PedidoProducto")
public class PedidoProducto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "idPedido", referencedColumnName = "idPedido")
    private Pedidos pedido;

    @ManyToOne
    @JoinColumn(name = "idProducto", referencedColumnName = "idProducto")
    private Producto producto;

    @Column(name = "cantidad")
    private int cantidad;

	public PedidoProducto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public PedidoProducto(Pedidos pedido, Producto producto, int cantidad) {
		super();
		this.pedido = pedido;
		this.producto = producto;
		this.cantidad = cantidad;
	}

	public Long getId() {
		return id;
	}



	public Pedidos getPedido() {
		return pedido;
	}

	public void setPedido(Pedidos pedido) {
		this.pedido = pedido;
	}

	public Producto getProducto() {
		return producto;
	}

	public void setProducto(Producto producto) {
		this.producto = producto;
	}

	public int getCantidad() {
		return cantidad;
	}

	public void setCantidad(int cantidad) {
		this.cantidad = cantidad;
	}
    
    
}

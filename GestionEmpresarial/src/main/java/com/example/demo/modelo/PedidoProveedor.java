package com.example.demo.modelo;

import jakarta.persistence.*;

@Entity
@Table(name = "PedidoProveedor")
public class PedidoProveedor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "idPedido", referencedColumnName = "idPedido")
    private Pedidos pedido;

    @ManyToOne
    @JoinColumn(name = "idProveedor", referencedColumnName = "idProveedor")
    private Proveedor proveedor;

	public PedidoProveedor() {
		super();
		// TODO Auto-generated constructor stub
	}

	public PedidoProveedor(Pedidos pedido, Proveedor proveedor) {
		super();
		this.pedido = pedido;
		this.proveedor = proveedor;
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

	public Proveedor getProveedor() {
		return proveedor;
	}

	public void setProveedor(Proveedor proveedor) {
		this.proveedor = proveedor;
	}
    
    
}


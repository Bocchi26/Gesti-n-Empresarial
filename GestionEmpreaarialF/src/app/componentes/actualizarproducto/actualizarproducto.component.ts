import { Component, OnInit } from '@angular/core';
import { Producto } from '../../entidades/producto/producto';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductosService } from '../../servicios/productos/productos.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actualizarproducto',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './actualizarproducto.component.html',
  styleUrl: './actualizarproducto.component.css'
})
export class ActualizarproductoComponent implements OnInit {
  onSubmitActualizar() {
    throw new Error('Method not implemented.');
    }
      nombreProducto: string = '';
      productosEncontrados: Producto[] = [];
      productoSeleccionado!: Producto;
      mostrarFormularioActualizar: boolean = false;
      formularioActualizar: FormGroup;
    
      constructor(
        private productoService: ProductosService,
        private fb: FormBuilder
      ) {
        this.formularioActualizar = this.fb.group({
          nombre: ['', Validators.required],
          tipo: ['', Validators.required],
          descripcion: ['', Validators.required],
          fechaVencimiento: ['', Validators.required],
          precioUnitario: ['', [Validators.required, Validators.min(0)]],
          precioCompra: ['', [Validators.required, Validators.min(0)]],
          estado: ['', [Validators.required]],
        });
      }
    
      ngOnInit(): void {}
    
      // Buscar productos por nombre
      buscarProducto(): void {
        if (!this.nombreProducto.trim()) {
          alert('Por favor ingresa un nombre válido.');
          return;
        }
    
        this.productoService.buscarProducto(this.nombreProducto).subscribe({
          next: (productos) => {
            if (productos !== null ) {
              this.productosEncontrados = productos;
              if (productos.length === 0) {
                alert('No se encontraron productos con ese nombre.');
              }
            }else{
              alert('Error al buscar productos.');
            }
   
          },
          error: (err) => {
            console.error('Error al buscar producto:', err);
            alert('Error al buscar producto.');
          }
        });
      }
    
      // Mostrar formulario con datos para actualizar
      actualizarProducto(Producto:Producto): void {
        if (this.productosEncontrados.length === 0) {
          alert('Primero realiza una búsqueda de productos.');
          return;
        }
    
        this.productoSeleccionado = Producto; // puedes cambiar esto si hay más de uno
        this.mostrarFormularioActualizar = true;
    
        this.formularioActualizar.patchValue({
          nombre: this.productoSeleccionado.nombre,
          tipo: this.productoSeleccionado.tipo,
          descripcion: this.productoSeleccionado.descripcion,
          fechaVencimiento: new Date(this.productoSeleccionado.fechaVencimiento).toISOString().split('T')[0],
          precioUnitario: this.productoSeleccionado.precioUnitario,
          precioCompra: this.productoSeleccionado.precioCompra,
          estado: this.productoSeleccionado.estado
        });
      }
    
      // Guardar cambios del producto
      onSubmit(): void {
        if (this.formularioActualizar.invalid) {
          this.formularioActualizar.markAllAsTouched();
          return;
        }
        if (this.formularioActualizar.valid && this.productoSeleccionado) {
          const productoActualizado: Producto = {
            ...this.formularioActualizar.value,
            fechaVencimiento: new Date(this.formularioActualizar.value.fechaVencimiento)
          };
    
          this.productoService.actualizarProducto(productoActualizado, this.productoSeleccionado.idProducto).subscribe({
            next: (res) => {
              console.log('Producto actualizado:', res);
              alert('✅ Producto actualizado con éxito');
              this.mostrarFormularioActualizar = false;
              this.formularioActualizar.reset();
              this.productosEncontrados = [];
              this.nombreProducto = '';
            },
            error: (err) => {
              console.error('Error al actualizar:', err);
              alert('❌ Error al actualizar el producto');
            }
          });
        } else {
          alert('Completa correctamente el formulario de actualización.');
        }
      }
    
    cerrarModal() {
      this.mostrarFormularioActualizar = false;
      this.formularioActualizar.reset();
      this.productosEncontrados = [];
      this.nombreProducto = '';
    }
}

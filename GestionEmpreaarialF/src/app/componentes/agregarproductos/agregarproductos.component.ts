import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductosService } from '../../servicios/productos/productos.service';
import { Producto } from '../../entidades/producto/producto';
import { Usuario } from '../../entidades/usuario/usuario';

@Component({
  selector: 'app-agregarproductos',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule],
  templateUrl: './agregarproductos.component.html',
  styleUrl: './agregarproductos.component.css'
})
export class AgregarproductosComponent implements OnInit {

  registroForm: FormGroup;

  constructor(private fb: FormBuilder, private productoService: ProductosService) {}

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaVencimiento: ['', Validators.required],
      precioUnitario: ['', [Validators.required, Validators.min(0)]],
      precioCompra: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      const producto: Producto = {
        ...this.registroForm.value,
        fechaVencimiento: new Date(this.registroForm.value.fechaVencimiento)
      };

      console.log('📦 Enviando producto:', producto);
      const user = localStorage.getItem("userId");

      this.productoService.guardarProducto(producto,user).subscribe({
        next: (res) => {
          if(res !== null){
            console.log('✅ Producto guardado con éxito:', res);
            alert('Producto guardado con éxito');
            this.registroForm.reset();
          }else{
            alert('Error al guardar producto, intenta nuevamente');
          }
          
        },
        error: (err) => {
          console.error('❌ Error al guardar producto:', err);
          alert('Error al guardar producto, intenta nuevamente.');
        }
      });
    } else {
      alert('Por favor completa todos los campos correctamente.');
    }
  }

}
